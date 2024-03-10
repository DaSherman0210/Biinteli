//Here is the consumption of the API with its necessary modifications to make it work. Similarly, 
//I carried out the activity directly with the database, 
//performing the necessary validations and functions for its proper use.

// I import the necessary module to do the querys and axios to consume the API

import Journey from "../models/Journey.js";
import axios from "axios";

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
        const { origin, destination, maxFlights } = req.body;

        const cachedJourney = await cachedJourneyExists(origin, destination);

        if (cachedJourney) {
            res.json({ Journey: cachedJourney });
        } else {
            const flights = await findFlightsFromAPI(); // Función para obtener los vuelos de la API

            const journeys = await findJourneys(origin, destination, [], maxFlights, flights);

            if (journeys.length > 0) {
                const journeysWithPrices = journeys.map(journey => ({
                    Origin: origin,
                    Destination: destination,
                    Price: calculateTotalPrice(journey),
                    Flights: journey
                }));

                await saveJourney(origin, destination, maxFlights, journeysWithPrices[0]);

                res.json({ Journeys: journeysWithPrices[0] });
            } else {
                console.log("No flights found for", origin, destination);
                res.status(404).send("No flights found");
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
};

const findJourneys = async (currentAirport, destination, visitedAirports, maxFlights, flights) => {
    if (maxFlights === 0) {
        return [];
    }

    const relevantFlights = flights.filter(flight => flight.DepartureStation === currentAirport);

    const journeys = [];

    for (const flight of relevantFlights) {
        if (!visitedAirports.includes(flight.ArrivalStation)) {
            const newVisitedAirports = [...visitedAirports, currentAirport];
            if (flight.ArrivalStation === destination) {
                journeys.push([flight]);
            } else {
                const subJourneys = await findJourneys(flight.ArrivalStation, destination, newVisitedAirports, maxFlights - 1, flights);
                for (const subJourney of subJourneys) {
                    journeys.push([flight, ...subJourney]);
                }
            }
        }
    }

    return journeys;
};

const findFlightsFromAPI = async () => {
    try {
        const response = await axios.get("https://bitecingcom.ipage.com/testapi/intermedio.js");
        const data = response.data;

        const info = data.replace(/0,/g, "0");
        const arrayFixed = info.slice(0, -4) + info.slice(-1);
        const flights = JSON.parse(arrayFixed);

        return flights;
    } catch (error) {
        console.error("Error while fetching flights from API:", error);
        return [];
    }
};


// Verify if the Journey exist

const cachedJourneyExists = async (origin, destination) => {
    try {
        const journey = await Journey.findOne({ origin, destination });
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
            flights: journeyData.Flights.map(flight => ({
                DepartureStation: flight.DepartureStation,
                ArrivalStation: flight.ArrivalStation,
                FlightCarrier: flight.FlightCarrier,
                FlightNumber: flight.FlightNumber,
                Price: flight.Price
            }))
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
        totalPrice += flight.Price;
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