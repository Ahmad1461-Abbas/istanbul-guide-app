#!/bin/bash
if [ "$1" = "api" ]; then
    echo "Starting FastAPI server..."
    uvicorn api.app:app --host 0.0.0.0 --port 8000 --reload
elif [ "$1" = "web" ]; then
    echo "Starting Flask web server..."
    python web/app.py
else
    echo "Starting console application..."
    python main.py
fi