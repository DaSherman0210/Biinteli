// Imported the module of transport 

import transport from "../models/Transport.js";

// Basic get method

const getTransport = async (req, res) => {
    try {
        const data = await transport.find();
        res.json(data);
    } catch (error) {
        console.log(error.message);
    }
}

// Basic get one method

const getOneTransport = async (req, res) => {
    try {
        const data = await transport.findOne({ _id: req.params.id });
        res.json(data);
    } catch (error) {
        console.log(error.message);
    }
}

// Basic post method

const postTransport = async (req, res) => {
    try {
        const { flightCarrier, flightNumber } = req.body;
        const data = new transport({ flightCarrier, flightNumber });

        const newData = await data.save();
        res.json(newData);

    } catch (error) {
        console.log(error.message);
    }
}

// Basic delete method

const deleteTransport = async (req, res) => {
    try {
        await transport.deleteOne({ _id: req.params.id });
        res.status(204).send({
            msg: "The transport was deleted succesfully"
        });
    } catch (error) {
        console.log(error.message);
    }
}

// Basic update method

const updateTransport = async (req, res) => {
    try {
        const { flightCarrier, flightNumber } = req.body;
        const updatedTransport = await transport.findByIdAndUpdate(req.params.id, { flightCarrier, flightNumber }, { new: true });
        if (!updatedTransport) {
            console.log('The ID was not found');
            return res.status(404).send('Transport not found');
        }
        console.log('It was succesfully updated:', updatedTransport);
        res.json(updatedTransport);
    } catch (error) {
        console.log(error.message);
    }
}

// Export of all the functions

export { getTransport, getOneTransport, postTransport, deleteTransport, updateTransport };