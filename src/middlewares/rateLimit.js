// Imported the collection of express-rate-limit

import rateLimit from "express-rate-limit";

// It limits the number of request for the API

const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 100,
    message: "Has excedido el límite de solicitudes por hora."
})

export default limiter;