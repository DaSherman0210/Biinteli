// The import of the mongoose and creation of the model for the collections

import mongoose  from "mongoose";

const JourneySchema = mongoose.Schema({

    origin:{
        type: String,
        required: [true, "The origin is required"],
        trim: true
    },
    destination:{
        type: String,
        required: [true, "The destination is required"],
        trim: true
    },
    price:{
        type: Number,
        required: [true, "The price is required"],
        trim: true
    },
    flights:{
        type: Array,
        ref: 'flight'
    }

})

const Journey = mongoose.model('journey', JourneySchema, 'journey')

export default Journey;