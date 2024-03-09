//Here is the consumption of the API with its necessary modifications to make it work. Similarly, 
//I carried out the activity directly with the database, 
//performing the necessary validations and functions for its proper use.


/*import axios from "axios";*/
/* const { origin, destination, maxFlights = Infinity } = req.body;

const response = await axios.get("https://bitecingcom.ipage.com/testapi/avanzado.js");
const data = response.data;

const info = data.replace(/0,/g, "0");
const arrayFixed = info.slice(0, -4) + info.slice(-1);
const arrayJSON = JSON.parse(arrayFixed); */


// I import the necessary modules to do the querys 

import Journey from "../models/Journey.js";
import flight from "../models/Flight.js";

// Basic get of all the journeys

const getJourney = async (req, res) => {
    try {
        const data = await Journey.find();
        res.json(data)
    } catch (error) {
        console.log(error.message);
    }
}

//The main function to do the search proccess

const searchJourney = async (req, res) => {
    try {
        // Extracting origin, destination, and maxFlights from request body
        const { origin, destination, maxFlights } = req.body;

        // Checking if a cached journey exists for the provided origin and destination
        const cachedJourney = await cachedJourneyExists(origin, destination);

        // If a cached journey exists, send it in the response
        if (cachedJourney) {
            res.json({ Journey: cachedJourney });
        } else {
            // If no cached journey exists, find new journeys
            const journeys = await findJourneys(origin, destination, [], maxFlights);

            // If new journeys are found
            if (journeys.length > 0) {
                // Map each journey to include origin, destination, price, and flights
                const journeysWithPrices = journeys.map(journey => ({
                    Origin: origin,
                    Destination: destination,
                    Price: calculateTotalPrice(journey),
                    Flights: journey
                }));

                // Save the first journey with its price
                await saveJourney(origin, destination, maxFlights, journeysWithPrices[0]);

                // Send the first journey with its price in the response
                res.json({ Journeys: journeysWithPrices[0] });
            } else {
                // If no journeys are found, log a message and send a "Not Found" status code
                console.log("No flights found for", origin, destination);
                res.status(404).send("No flights found");
            }
        }
    } catch (error) {
        // If an error occurs, log the error message and send an "Internal Server Error" status code
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};


const findJourneys = async (currentAirport, destination, visitedAirports, maxFlights) => {
    // If maxFlights is 0, return an empty array
    if (maxFlights === 0) {
        return [];
    }

    // Find flights departing from the current airport
    const flights = await flight.find({ origin: currentAirport });

    // Initialize an array to store journeys
    const journeys = [];

    // Iterate over each flight departing from the current airport
    for (const flight of flights) {
        // Check if the destination airport has not been visited yet
        if (!visitedAirports.includes(flight.destination)) {
            // Create a new array of visited airports including the current airport
            const newVisitedAirports = [...visitedAirports, currentAirport];
            
            // If the flight's destination is the final destination
            if (flight.destination === destination) {
                // Add the flight to journeys array
                journeys.push([flight]);
            } else {
                // Recursively find sub-journeys to the destination
                const subJourneys = await findJourneys(flight.destination, destination, newVisitedAirports, maxFlights - 1);
                
                // For each sub-journey found, prepend the current flight and add to journeys
                for (const subJourney of subJourneys) {
                    journeys.push([flight, ...subJourney]);
                }
            }
        }
    }

    // Return all found journeys
    return journeys;
};


// Verify if the Journey exist

const cachedJourneyExists = async (origin, destination) => {
    try {
        const journey = await Journey.findOne({ origin, destination }).populate('flights');
        return journey;
    } catch (error) {
        console.error("Error while checking cached journey:", error);
        return null;
    }
};

// A Post option to save the Journey searched

const saveJourney = async (origin, destination, maxFlights, journeyData) => {
    try {
        const journey = new Journey({
            origin,
            destination,
            price: journeyData.Price,
            flights: journeyData.Flights.map(flight => flight._id) // Guardar solo los IDs de los vuelos
        });
        await journey.save();
        console.log("Journey saved successfully");
    } catch (error) {
        console.error("Error while saving journey:", error);
    }
};

// This is to calculate the proce of all the journey

const calculateTotalPrice = (journey) => {
    let totalPrice = 0;
    for (const flight of journey) {
        totalPrice += flight.price;
    }
    return totalPrice;
};

// Is a basic get by id function

const getOneJourney = async (req, res) => {
    try {
        const data = await Journey.findOne({ _id: req.params.id })
        res.json(data)
    } catch (error) {
        console.log(error.message);
    }
}

// A basic post method

const postJourney = async (req, res) => {
    try {
        const { origin, destination, price, flight } = req.body;
        const data = new Journey({ origin, destination, price, flight });

        const newData = await data.save();
        res.json(newData)

    } catch (error) {
        console.log(error.message);
    }
}

// A basic delete method

const deleteJourney = async (req, res) => {
    try {
        await Journey.deleteOne({ _id: req.params.id });
        res.status(204).send({
            msg: "The journey was deleted succesfully"
        })
    } catch (error) {
        console.log(error.message);
    }
}

// A basic update method

const updateJourney = async (req, res) => {
    try {
        const { origin, destination, price, flight } = req.body;
        await Journey.findByIdAndUpdate({ _id: req.params.id }, { origin, destination, price, flight }, { new: true })
            .then(usuarioActualizado => {
                if (!usuarioActualizado) {
                    console.log('The ID was not found');
                }
                else {
                    console.log('It was succesfully updated:', usuarioActualizado);
                }
            })
    } catch (error) {
        console.log(error.message);
    }
}

// Export all of the fuctions

export { getJourney, getOneJourney, postJourney, deleteJourney, updateJourney, searchJourney }