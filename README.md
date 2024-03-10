# 📑 Bintelli Backend 📑 

## ✏️ Description

The project involves developing a Task Management System using **Node.js** as the primary framework for the backend. 

## ⚙️ Installation

1. Clone this repository to your local machine.
2. Make shure that you have  ```npm```
3. Run `npm install` to install all dependencies.

## 🛠 Dependecies used

- **"axios"**: "^1.6.7"
- **"cors"**: "^2.8.5",
- **"dotenv"**: "^16.4.5"
- **"express"**: "^4.18.3"
- **"express-rate-limit"**: "^7.2.0"
- **"express-validator"**: "^7.0.1"
- **"mongoose"**: "^8.2.1"
- **"nodemon"**: "^3.1.0"

##  🚦Usage

### Running the Application

1. Run `npm start` to start the server.
2. The application will be available at `http://localhost:7878` by default.

## ✮ Available Endpoints

### 🟡 Flights CRUD

1. **GET /flight/**
   * Returns a list of all flights.
2. **GET BY ID /flight/:id**
   * Returns a specific flight based on their ID.
3. **POST /flight/**
   * Creates a new flight. Flight data should be provided in the request body.
4. **DELETE /flight/:id**
   * Deletes an existing flight based on their ID.
5. **PATCH /flight/:id**
   * Updates the data of an existing flight based on their ID. Updated data should be provided in the request body.

### 🟡 Journeys CRUD

1. **GET /journey/**
   * Returns a list of all journey.
2. **GET BY ID /journey/:id**
   * Returns a specific journey based on their ID.
3. **POST /journey/**
   * Creates a new journey. Journey data should be provided in the request body.
4. **DELETE /journey/:id**
   * Deletes an existing journey based on their ID.
5. **PATCH /journey/:id**
   * Updates the data of an existing journey based on their ID. Updated data should be provided in the request body.

### 🟡 Transport CRUD

1. **GET /transport/**
   * Returns a list of all transport.
2. **GET BY ID /transport/:id**
   * Returns a specific transport based on their ID.
3. **POST /transport/**
   * Creates a new transport. Transport data should be provided in the request body.
4. **DELETE /transport/:id**
   * Deletes an existing transport based on their ID.
5. **PATCH /transport/:id**
   * Updates the data of an existing transport based on their ID. Updated data should be provided in the request body.

## ✮ Others endpoints

1. **GET /flight/basic**

   * Consume the basic API 

2. **GET /flight/intermedium**

   * Consume the intermedium API

3. **GET /flight/advanced**

   * Consume the advanced API

4. **🔴GET/journey/search**

   * This is the main endpoint where is consumed the data from the API and done the validations, you have to send from the body a json like this:

   

   ### 📙 Request:

   

   {

   ​	"origin": "BGA",

   ​	"destination": "MED",

   ​	"maxFlights":  3

   }

   

   ### 📘 Response:

   

    "Journey": {

   ​        "_id": "65ee0eb7ab4a29cd6a4fe3d8",

   ​        "origin": "BGA",

   ​        "destination": "MED",

   ​        "price": 2000,

   ​        "maxFlights": 3,

   ​        "flights": [

   ​            {

   ​                "DepartureStation": "BGA",

   ​                "ArrivalStation": "BTA",

   ​                "FlightCarrier": "AV",

   ​                "FlightNumber": "8020",

   ​                "Price": 1000

   ​            },

   ​            {

   ​                "DepartureStation": "BTA",

   ​                "ArrivalStation": "MED",

   ​                "FlightCarrier": "AV",

   ​                "FlightNumber": "8020",

   ​                "Price": 1000

   ​            }

   ​        ],

   ​        "__v": 0

   ​    }

   

   ## ✍️ Author

   

   **Name:** German Andres Torres Cely

   **Email:**  tgerman181@gmail.com

   **Github:** DaSherman0210

   

   **Text about the test:**

   *  I opted for the intermediary API, which requires defining multiple routes. Additionally, I incorporated functionality to handle a maximum number of flights and established a connection to the database for creating journeys using unique identifiers (IDs).

   