#!/bin/bash

# MongoDB Installation Script for Ubuntu/Debian
echo "Installing MongoDB..."

# Update package list
sudo apt update

# Install MongoDB
sudo apt install -y mongodb

# Start MongoDB service
sudo systemctl start mongodb

# Enable MongoDB to start on boot
sudo systemctl enable mongodb

# Check MongoDB status
sudo systemctl status mongodb

echo ""
echo "MongoDB installation complete!"
echo "MongoDB is running on: mongodb://localhost:27017"
echo ""
echo "To start MongoDB: sudo systemctl start mongodb"
echo "To stop MongoDB: sudo systemctl stop mongodb"
echo "To restart MongoDB: sudo systemctl restart mongodb"
