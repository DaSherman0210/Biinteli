// The import of the mongoose and creation of the model for the collections

import mongoose, { Schema } from "mongoose";

const FlightSchema = mongoose.Schema(
    {

        origin: {
            type: String,
            required: [true, "The origin is required"],
            trim: true
        },
        destination: {
            type: String,
            required: [true, "The destination is required"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "The price is required"],
            trim: true
        },
        transport: {
            type: Schema.Types.ObjectId,
            ref: 'transport'
        }

    }
)

const flight = mongoose.model('flight', FlightSchema, 'flight')

export default flight;