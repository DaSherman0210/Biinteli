// I import the model of flights to use it and also the axios library

import axios from "axios";
import flight from "../models/Flight.js";

// Get method of the basic API 

const findBasic = async (req, res) => {
    try {
        const response = await axios.get("https://bitecingcom.ipage.com/testapi/basico.js");

        const data = response.data;

        const info = data.replace(/0,/g, "0");

        let x = JSON.parse(info);

        res.json(x);
    } catch (error) {
        console.log(error.message);
    }
}

// Get method of the intermedium API

const findIntermedium = async (req, res) => {
    try {
        const response = await axios.get("https://bitecingcom.ipage.com/testapi/intermedio.js");

        const data = response.data;

        const info = data.replace(/0,/g, "0");

        const sliced = info.slice(0, -4) + info.slice(-1);

        const x = JSON.parse(sliced);

        res.json(x);
    } catch (error) {
        console.log(error.message);
    }
}

// Get method of the advanced API

const findAdvanced = async (req, res) => {
    try {

        const response = await axios.get("https://bitecingcom.ipage.com/testapi/avanzado.js");

        const data = response.data;

        const info = data.replace(/0,/g, "0");

        const hola = info.slice(0, -4) + info.slice(-1);

        const x = JSON.parse(hola);

        res.json(x)

    } catch (error) {
        console.log(error.message);
    }
}

// Get all basic method

const getFlight = async (req, res) => {
    try {
        const {origin, destination} = req.body;
        const data = await flight.find({origin: origin, destination: destination});
        res.json(data);
    } catch (error) {
        console.log(error.message);
    }
}

// Basic post method

const createFlight = async (req,res) => {
    try {

        const { origin, destination, price } = req.body;

        const findDB = await flight.find({ "origin": origin, "destination": destination });

        if (findDB.length == 0) {
            
            const newFlight = new flight({ origin, destination, price});

            const flightSaved = await newFlight.save();

            res.json(flightSaved)
        }
        else{
            res.send("The flight is already in the database")
        }

    } catch (error) {
        console.log(error);
    }
}

// Basic get one method

const getOneFlight = async (req, res) => {
    try {
        const data = await flight.findOne({ _id: req.params.id })
        res.json(data)
    } catch (error) {
        console.log(error.message);
    }
}


// Basic delete method

const deleteFlight = async (req, res) => {
    try {
        await flight.deleteOne({ _id: req.params.id });
        res.status(204).send({
            msg: "The flight was deleted succesfully"
        })
    } catch (error) {
        console.log(error.message);
    }
}

//Basic update method

const updateFlight = async (req, res) => {
    try {
        const { origin, destination, price, transport } = req.body;
        await flight.findByIdAndUpdate({ _id: req.params.id }, { origin, destination, price, transport }, { new: true })
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

// Export of all the functions

export { getFlight, getOneFlight, createFlight, deleteFlight, updateFlight, findBasic, findIntermedium , findAdvanced };