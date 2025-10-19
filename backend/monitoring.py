import json
import logging
import os
import time
from datetime import datetime
from functools import wraps
from typing import Any, Dict

# Configure logging levels
LOGGING_LEVEL = os.getenv("LOGGING_LEVEL", "INFO").upper()

# Setup logging configuration
logging.basicConfig(
    level=getattr(logging, LOGGING_LEVEL),
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("/var/log/fitgear_api.log"), logging.StreamHandler()],
)

# Create logger
logger = logging.getLogger("FitGear")


class PerformanceMonitor:
    """Performance monitoring and metrics collection"""

    def __init__(self):
        self.metrics = {
            "request_count": 0,
            "average_response_time": 0,
            "error_count": 0,
            "endpoint_stats": {},
        }

    def log_request(
        self, endpoint: str, method: str, duration: float, status_code: int
    ):
        """Log request metrics"""
        self.metrics["request_count"] += 1

        # Update average response time
        current_avg = self.metrics["average_response_time"]
        count = self.metrics["request_count"]
        self.metrics["average_response_time"] = (
            (current_avg * (count - 1)) + duration
        ) / count

        # Track errors
        if status_code >= 400:
            self.metrics["error_count"] += 1

        # Track endpoint-specific stats
        endpoint_key = f"{method}_{endpoint}"
        if endpoint_key not in self.metrics["endpoint_stats"]:
            self.metrics["endpoint_stats"][endpoint_key] = {
                "count": 0,
                "total_time": 0,
                "errors": 0,
            }

        stats = self.metrics["endpoint_stats"][endpoint_key]
        stats["count"] += 1
        stats["total_time"] += duration
        if status_code >= 400:
            stats["errors"] += 1

    def get_metrics(self) -> Dict[str, Any]:
        """Get current metrics"""
        error_rate = (
            self.metrics["error_count"] / max(self.metrics["request_count"], 1)
        ) * 100
        return {
            **self.metrics,
            "timestamp": datetime.utcnow().isoformat(),
            "error_rate": error_rate,
        }


# Global performance monitor instance
performance_monitor = PerformanceMonitor()


def monitor_performance(endpoint_name: str = None):
    """Decorator to monitor endpoint performance"""

    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            start_time = time.time()
            status_code = 200
            endpoint = endpoint_name or func.__name__

            try:
                result = await func(*args, **kwargs)
                return result
            except Exception as e:
                status_code = getattr(e, "status_code", 500)
                logger.error(f"Error in {endpoint}: {str(e)}")
                raise
            finally:
                duration = time.time() - start_time
                performance_monitor.log_request(endpoint, "HTTP", duration, status_code)

                # Log slow requests
                if duration > 2.0:  # Log requests taking more than 2 seconds
                    logger.warning(
                        f"Slow request detected: {endpoint} took {duration:.2f}s"
                    )

        return wrapper

    return decorator


class SecurityMonitor:
    """Security monitoring and threat detection"""

    def __init__(self):
        self.failed_attempts = {}
        self.suspicious_ips = set()
        self.blocked_ips = set()

    def log_failed_login(self, ip_address: str, email: str):
        """Log failed login attempts"""
        key = f"{ip_address}_{email}"
        if key not in self.failed_attempts:
            self.failed_attempts[key] = []

        self.failed_attempts[key].append(datetime.utcnow())

        # Remove old attempts (older than 1 hour)
        hour_ago = datetime.utcnow().timestamp() - 3600
        self.failed_attempts[key] = [
            attempt
            for attempt in self.failed_attempts[key]
            if attempt.timestamp() > hour_ago
        ]

        # Check if IP should be flagged as suspicious
        if len(self.failed_attempts[key]) >= 5:
            self.suspicious_ips.add(ip_address)
            logger.warning(
                "Suspicious activity detected from IP %s: %d failed login attempts",
                ip_address,
                len(self.failed_attempts[key]),
            )

        # Block IP after 10 failed attempts
        if len(self.failed_attempts[key]) >= 10:
            self.blocked_ips.add(ip_address)
            logger.critical(
                "IP %s has been blocked due to excessive failed login attempts",
                ip_address,
            )

    def is_ip_blocked(self, ip_address: str) -> bool:
        """Check if IP is blocked"""
        return ip_address in self.blocked_ips

    def is_ip_suspicious(self, ip_address: str) -> bool:
        """Check if IP is suspicious"""
        return ip_address in self.suspicious_ips


# Global security monitor instance
security_monitor = SecurityMonitor()


class DatabaseMonitor:
    """Database monitoring and health checks"""

    def __init__(self):
        self.connection_stats = {
            "successful_connections": 0,
            "failed_connections": 0,
            "query_count": 0,
            "average_query_time": 0,
        }

    def log_connection_success(self):
        """Log successful database connection"""
        self.connection_stats["successful_connections"] += 1

    def log_connection_failure(self):
        """Log failed database connection"""
        self.connection_stats["failed_connections"] += 1
        logger.error("Database connection failed")

    def log_query(self, operation: str, duration: float):
        """Log database query performance"""
        self.connection_stats["query_count"] += 1

        # Update average query time
        current_avg = self.connection_stats["average_query_time"]
        count = self.connection_stats["query_count"]
        self.connection_stats["average_query_time"] = (
            (current_avg * (count - 1)) + duration
        ) / count

        # Log slow queries
        if duration > 1.0:  # Log queries taking more than 1 second
            logger.warning(
                f"Slow database query detected: {operation} took {duration:.2f}s"
            )

    def get_stats(self) -> Dict[str, Any]:
        """Get database statistics"""
        total_connections = (
            self.connection_stats["successful_connections"]
            + self.connection_stats["failed_connections"]
        )
        success_rate = (
            self.connection_stats["successful_connections"] / max(total_connections, 1)
        ) * 100

        return {
            **self.connection_stats,
            "connection_success_rate": success_rate,
            "timestamp": datetime.utcnow().isoformat(),
        }


# Global database monitor instance
database_monitor = DatabaseMonitor()


def log_system_info():
    """Log system information"""
    import psutil

    # Get system metrics
    cpu_percent = psutil.cpu_percent(interval=1)
    memory = psutil.virtual_memory()
    disk = psutil.disk_usage("/")

    system_info = {
        "cpu_usage_percent": cpu_percent,
        "memory_usage_percent": memory.percent,
        "memory_available_gb": memory.available / (1024**3),
        "disk_usage_percent": disk.percent,
        "disk_free_gb": disk.free / (1024**3),
        "timestamp": datetime.utcnow().isoformat(),
    }

    logger.info(f"System metrics: {json.dumps(system_info)}")

    # Alert on high resource usage
    if cpu_percent > 80:
        logger.warning(f"High CPU usage detected: {cpu_percent}%")

    if memory.percent > 85:
        logger.warning(f"High memory usage detected: {memory.percent}%")

    if disk.percent > 90:
        logger.critical(f"High disk usage detected: {disk.percent}%")

    return system_info


def setup_monitoring():
    """Setup monitoring and logging for the application"""
    logger.info("Setting up FitGear monitoring system...")

    # Log initial system info
    log_system_info()

    # Setup periodic monitoring (would be called by a scheduler in production)
    logger.info("Monitoring system initialized successfully")


# Error tracking and alerting
class ErrorTracker:
    """Track and categorize application errors"""

    def __init__(self):
        self.error_counts = {}
        self.critical_errors = []

    def log_error(self, error_type: str, error_message: str, severity: str = "error"):
        """Log and track errors"""
        if error_type not in self.error_counts:
            self.error_counts[error_type] = 0

        self.error_counts[error_type] += 1

        error_info = {
            "type": error_type,
            "message": error_message,
            "severity": severity,
            "timestamp": datetime.utcnow().isoformat(),
            "count": self.error_counts[error_type],
        }

        if severity == "critical":
            self.critical_errors.append(error_info)
            logger.critical(f"Critical error: {error_type} - {error_message}")
        else:
            logger.error(f"Error: {error_type} - {error_message}")

        # Alert if error occurs frequently
        if self.error_counts[error_type] > 10:
            logger.warning(
                "Frequent error detected: %s has occurred %d times",
                error_type,
                self.error_counts[error_type],
            )

    def get_error_summary(self) -> Dict[str, Any]:
        """Get error summary"""
        return {
            "error_counts": self.error_counts,
            "total_errors": sum(self.error_counts.values()),
            "critical_errors_count": len(self.critical_errors),
            "timestamp": datetime.utcnow().isoformat(),
        }


# Global error tracker instance
error_tracker = ErrorTracker()


# Health check functions
def check_api_health() -> Dict[str, Any]:
    """Comprehensive API health check"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0",
        "performance_metrics": performance_monitor.get_metrics(),
        "database_stats": database_monitor.get_stats(),
        "error_summary": error_tracker.get_error_summary(),
        "system_info": log_system_info(),
    }
