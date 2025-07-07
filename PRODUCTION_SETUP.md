# Production Configuration for FitGear Application

## Environment Setup

### Required Environment Variables

```bash
# Database Configuration
MONGO_URL=mongodb://localhost:27017/fitgear_production

# JWT Configuration
SECRET_KEY=your-super-secure-jwt-secret-key-change-this-in-production-2024

# Stripe Configuration (for payment processing)
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here

# SendGrid Configuration (for email notifications)
SENDGRID_API_KEY=your_sendgrid_api_key_here

# Application Configuration
ENVIRONMENT=production
DEBUG=false
LOGGING_LEVEL=INFO

# CORS Configuration
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com

# Rate Limiting
MAX_REQUESTS_PER_MINUTE=60

# Frontend Configuration
REACT_APP_BACKEND_URL=https://api.your-domain.com
REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key_here
REACT_APP_ENVIRONMENT=production
REACT_APP_API_TIMEOUT=10000
REACT_APP_APP_NAME=FitGear
REACT_APP_APP_VERSION=1.0.0
```

## Database Configuration

### MongoDB Production Setup

1. **Create Production Database**
   ```bash
   mongosh
   use fitgear_production
   ```

2. **Create Indexes for Performance**
   ```javascript
   db.products.createIndex({ "category": 1, "is_active": 1 })
   db.products.createIndex({ "name": "text", "description": "text", "brand": "text" })
   db.products.createIndex({ "price": 1 })
   db.users.createIndex({ "email": 1 }, { unique: true })
   db.reviews.createIndex({ "product_id": 1, "user_id": 1 })
   db.orders.createIndex({ "user_id": 1, "created_at": -1 })
   db.carts.createIndex({ "user_id": 1 })
   db.wishlists.createIndex({ "user_id": 1 })
   db.blog_posts.createIndex({ "category": 1, "is_published": 1 })
   ```

3. **Setup Database Authentication**
   ```javascript
   use admin
   db.createUser({
     user: "fitgear_admin",
     pwd: "secure_password_here",
     roles: [ { role: "readWrite", db: "fitgear_production" } ]
   })
   ```

## Security Configuration

### SSL/TLS Setup

1. **Obtain SSL Certificate**
   - Use Let's Encrypt for free SSL certificates
   - Or purchase from a certificate authority

2. **Configure Nginx as Reverse Proxy**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com www.your-domain.com;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name your-domain.com www.your-domain.com;

       ssl_certificate /path/to/your/certificate.crt;
       ssl_certificate_key /path/to/your/private.key;
       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_ciphers HIGH:!aNULL:!MD5;

       # Frontend
       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }

       # Backend API
       location /api/ {
           proxy_pass http://localhost:8001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

### Firewall Configuration

```bash
# Allow only necessary ports
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 80/tcp
ufw allow 443/tcp
ufw enable
```

## Performance Optimizations

### Redis Cache Setup

1. **Install Redis**
   ```bash
   sudo apt-get install redis-server
   sudo systemctl enable redis-server
   sudo systemctl start redis-server
   ```

2. **Configure Redis for Caching**
   ```python
   # Add to backend requirements.txt
   redis==4.5.4
   
   # Add to backend/cache.py
   import redis
   
   redis_client = redis.Redis(
       host='localhost',
       port=6379,
       db=0,
       decode_responses=True
   )
   ```

### CDN Configuration

1. **Setup CloudFlare or AWS CloudFront**
   - Cache static assets (images, CSS, JS)
   - Enable Gzip compression
   - Configure cache headers

2. **Image Optimization**
   ```python
   # Add image optimization middleware
   from PIL import Image
   import io
   
   def optimize_image(image_data, quality=85, max_width=1200):
       image = Image.open(io.BytesIO(image_data))
       if image.width > max_width:
           ratio = max_width / image.width
           new_height = int(image.height * ratio)
           image = image.resize((max_width, new_height), Image.LANCZOS)
       
       output = io.BytesIO()
       image.save(output, format='JPEG', quality=quality, optimize=True)
       return output.getvalue()
   ```

## Monitoring and Logging

### Production Logging Configuration

```python
# Update backend/server.py logging configuration
import logging
from logging.handlers import RotatingFileHandler

# Setup rotating log files
handler = RotatingFileHandler('/var/log/fitgear_api.log', maxBytes=10000000, backupCount=5)
handler.setFormatter(logging.Formatter(
    '%(asctime)s %(levelname)s %(name)s %(message)s'
))

logger = logging.getLogger('fitgear')
logger.addHandler(handler)
logger.setLevel(logging.INFO)
```

### Health Monitoring Setup

1. **Setup Application Monitoring**
   - Use tools like New Relic, DataDog, or Prometheus
   - Monitor API response times, error rates, and resource usage

2. **Database Monitoring**
   - Monitor MongoDB performance and query times
   - Setup alerts for high resource usage

3. **Uptime Monitoring**
   - Use services like UptimeRobot or Pingdom
   - Monitor critical endpoints every minute

## Backup and Recovery

### Database Backup

```bash
#!/bin/bash
# backup-database.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mongodb"
DB_NAME="fitgear_production"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create backup
mongodump --db $DB_NAME --out $BACKUP_DIR/backup_$DATE

# Compress backup
tar -czf $BACKUP_DIR/backup_$DATE.tar.gz -C $BACKUP_DIR backup_$DATE

# Remove uncompressed backup
rm -rf $BACKUP_DIR/backup_$DATE

# Keep only last 30 days of backups
find $BACKUP_DIR -name "backup_*.tar.gz" -mtime +30 -delete

echo "Backup completed: $BACKUP_DIR/backup_$DATE.tar.gz"
```

### Automated Backup Schedule

```bash
# Add to crontab (run daily at 2 AM)
0 2 * * * /path/to/backup-database.sh >> /var/log/backup.log 2>&1
```

## Deployment

### Docker Production Setup

```dockerfile
# Dockerfile.backend
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001", "--workers", "4"]
```

```dockerfile
# Dockerfile.frontend
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose Production

```yaml
version: '3.8'

services:
  mongodb:
    image: mongo:6.0
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
    volumes:
      - mongodb_data:/data/db
    ports:
      - "27017:27017"

  redis:
    image: redis:7-alpine
    restart: always
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile.backend
    restart: always
    environment:
      - MONGO_URL=mongodb://root:${MONGO_ROOT_PASSWORD}@mongodb:27017/fitgear_production?authSource=admin
      - SECRET_KEY=${SECRET_KEY}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
    depends_on:
      - mongodb
      - redis
    ports:
      - "8001:8001"

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.frontend
    restart: always
    ports:
      - "3000:80"
    depends_on:
      - backend

volumes:
  mongodb_data:
  redis_data:
```

## Security Checklist

- [ ] Change all default passwords and secrets
- [ ] Enable SSL/TLS encryption
- [ ] Configure firewall rules
- [ ] Setup rate limiting
- [ ] Enable CORS with specific origins
- [ ] Implement proper input validation
- [ ] Setup security headers
- [ ] Configure database authentication
- [ ] Enable audit logging
- [ ] Setup backup and recovery procedures
- [ ] Configure monitoring and alerting
- [ ] Test disaster recovery procedures

## Performance Checklist

- [ ] Setup Redis caching
- [ ] Configure CDN for static assets
- [ ] Optimize database queries and indexes
- [ ] Enable Gzip compression
- [ ] Setup image optimization
- [ ] Configure connection pooling
- [ ] Setup load balancing (if needed)
- [ ] Monitor and optimize API response times
- [ ] Setup database sharding (if needed)
- [ ] Configure auto-scaling (if using cloud)

## Post-Deployment Verification

1. **Health Checks**
   ```bash
   curl https://api.your-domain.com/api/health
   ```

2. **Performance Testing**
   ```bash
   # Use tools like Apache Bench or Artillery
   ab -n 1000 -c 10 https://api.your-domain.com/api/products
   ```

3. **Security Testing**
   ```bash
   # Use tools like OWASP ZAP or Burp Suite
   # Test for common vulnerabilities
   ```

4. **Backup Verification**
   ```bash
   # Test backup restoration procedure
   mongorestore --drop --db fitgear_test /path/to/backup
   ```

## Maintenance Procedures

### Regular Tasks

1. **Daily**
   - Check application logs for errors
   - Verify backup completion
   - Monitor resource usage

2. **Weekly**
   - Review performance metrics
   - Update security patches
   - Check disk space usage

3. **Monthly**
   - Review and optimize database queries
   - Update dependencies
   - Review security logs
   - Test backup restoration

### Emergency Procedures

1. **High CPU/Memory Usage**
   - Check process usage: `top` or `htop`
   - Restart application if needed
   - Scale resources if persistent

2. **Database Connection Issues**
   - Check MongoDB status: `systemctl status mongodb`
   - Review connection pool settings
   - Check network connectivity

3. **Application Downtime**
   - Check service status: `systemctl status supervisor`
   - Review application logs
   - Verify database connectivity
   - Check disk space and memory

This configuration ensures your FitGear application is production-ready with proper security, performance optimizations, monitoring, and maintenance procedures.