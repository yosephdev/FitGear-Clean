#!/bin/bash

# MongoDB Docker Management Script for FitGear

case "$1" in
    start)
        echo "Starting MongoDB container..."
        sudo docker start mongodb-fitgear 2>/dev/null || \
        sudo docker run -d --name mongodb-fitgear -p 27017:27017 -v mongodb_data:/data/db mongo:6.0
        echo "MongoDB is running on port 27017"
        ;;
    stop)
        echo "Stopping MongoDB container..."
        sudo docker stop mongodb-fitgear
        echo "MongoDB stopped"
        ;;
    restart)
        echo "Restarting MongoDB container..."
        sudo docker restart mongodb-fitgear
        echo "MongoDB restarted"
        ;;
    status)
        echo "MongoDB container status:"
        sudo docker ps --filter name=mongodb-fitgear
        ;;
    logs)
        echo "MongoDB logs:"
        sudo docker logs mongodb-fitgear
        ;;
    shell)
        echo "Opening MongoDB shell..."
        sudo docker exec -it mongodb-fitgear mongosh
        ;;
    *)
        echo "Usage: $0 {start|stop|restart|status|logs|shell}"
        echo ""
        echo "Commands:"
        echo "  start   - Start MongoDB container"
        echo "  stop    - Stop MongoDB container"
        echo "  restart - Restart MongoDB container"
        echo "  status  - Show container status"
        echo "  logs    - Show MongoDB logs"
        echo "  shell   - Open MongoDB shell"
        exit 1
        ;;
esac
