#!/bin/bash

# List of ports to kill
PORTS=(3000 3001 3005 5001 5002 5003 5004)

echo "Killing processes running on ports: ${PORTS[*]}"

for PORT in "${PORTS[@]}"; do
    # Find the process using the port
    PID=$(lsof -t -i :"$PORT")
    
    if [ -n "$PID" ]; then
        echo "Killing process $PID on port $PORT..."
        kill -9 "$PID" && echo "Successfully killed process $PID on port $PORT."
    else
        echo "No process found on port $PORT."
    fi
done

echo "All specified ports have been processed."
