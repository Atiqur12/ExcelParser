# ExcelParser

This project consists of a frontend built with Angular and a backend built with NestJS and MongoDB.
The application allows users to upload Excel files, parse the data, and save it to a MongoDB database.

## Project Overview

The project is divided into two main parts:

    Frontend (Angular):

        A user interface for uploading Excel files.

        Displays success/error messages after file upload.

        Communicates with the backend via REST API.

    Backend (NestJS):

        A REST API for handling file uploads.

        Saves the data to MongoDB.

        Provides endpoints for sending product data.

## Frontend (Angular) Setup

Prerequisites

    Node.js (v16 or higher)

Installation

    Navigate to the frontend directory: cd frontend-angular
    
    Install dependencies: npm install

Running the Frontend

    Start the development server: npm start
    Open your browser and navigate to: http://localhost:4200

Running tests for Frontend

    Navigate to the frontend directory: cd frontend-angular
    Install dependencies: npm test

## Backend (NestJS) Setup

Prerequisites

    Node.js (v16 or higher)

Installation

    Navigate to the backend directory: cd backend-nestjs
    Install dependencies: npm i

Environment Configuration

    Create a .env file in the backend directory: touch .env
    Add the following environment variables: 
             MONGODB_URI=mongodb://root:example@localhost:27017
             PORT=3000

Running the Backend

    Start the NestJS server: npm run start
    The backend will be available at: http://localhost:3000

Running tests for Backend

    Navigate to the frontend directory: cd backend-nestjs
    Install dependencies: npm test:e2e

## Running the DB

Start the MongoDB server (if not already running):

    Pull the official MongoDB image: docker pull mongo
    Run a container exposing port 27017: docker run -d \
                                            --name my-mongo \
                                            -p 27017:27017 \
                                            -e MONGO_INITDB_ROOT_USERNAME=root \
                                            -e MONGO_INITDB_ROOT_PASSWORD=example \
                                            mongo
    Verify the container is running: docker ps
        You should see something like:
            CONTAINER ID   IMAGE   COMMAND  CREATED        STATUS        PORTS                      NAMES
            123abc456def   mongo   "docker-entrypoint..."  2 minutes ago  Up 2 minutes 0.0.0.0:27017->27017/tcp   my-mongo
    Copy creation script : docker cp ./db/initDB.js my-mongo:/initDB.js
    run the script : docker exec -it my-mongo mongosh --host localhost --port 27017 --username root --password example ./initDB.js
    check db is running : docker exec -it my-mongo mongosh --host localhost --port 27017 --username root --password example
    in the prompt run the command : show dbs
    the database productsDB should be present
    you can disconnect from the db now
            
    




