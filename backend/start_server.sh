#!/bin/bash

# FitGear Backend Server Start Script
echo "Starting FitGear Backend Server..."

# Check if virtual environment exists
if [ ! -d "/home/yoseph/fit-gear/.venv" ]; then
    echo "Error: Virtual environment not found. Please run the Python environment setup first."
    exit 1
fi

# Start MongoDB if not running
#echo "Checking MongoDB status..."
#if ! sudo docker ps --filter name=mongodb-fitgear | grep -q mongodb-fitgear; then
#    echo "Starting MongoDB container..."
#    sudo docker start mongodb-fitgear 2>/dev/null || \
#    sudo docker run -d --name mongodb-fitgear -p 27017:27017 -v mongodb_data:/data/db mongo:6.0
#    echo "MongoDB started successfully!"
#    sleep 2  # Give MongoDB a moment to fully start
#else
#    echo "MongoDB is already running"
#fi

# Navigate to backend directory
cd /home/yoseph/fit-gear/backend

# Activate virtual environment and start server
echo ""
echo "Starting server on http://localhost:8001"
echo "API Documentation: http://localhost:8001/api/docs"
echo "Health Check: http://localhost:8001/api/health"
echo "Press Ctrl+C to stop the server"
echo ""

/home/yoseph/fit-gear/.venv/bin/python server.py
