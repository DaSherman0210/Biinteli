// The import of the mongoose and creation of the model for the collections

import mongoose  from "mongoose";

const transportSchema = mongoose.Schema({

    flightCarrier:{
        type: String,
        required: [true, "The flightCarrier is required"],
        trim: true
    },
    flightNumber:{
        type: String,
        required: [true, "The flightNumber is required"],
        trim: true
    }

})

const transport = mongoose.model('transport', transportSchema, 'transport')

export default transport;