import express from "express";
import cors from "cors";
import flightRouter from "../routes/flight.routes.js";
import journeyRouter from "../routes/journey.routes.js";
import transportRouter from "../routes/transport.routes.js";

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        this.flightPath = "/flight"
        this.journeyPath = "/journey"
        this.transportPath = "/transport"

        this.middleware();

        this.routes();

    }

    middleware() {

        this.app.use(cors());

        this.app.use(express.json());

    }

    routes() {

        this.app.use(this.flightPath, flightRouter)
        this.app.use(this.journeyPath, journeyRouter)
        this.app.use(this.transportPath, transportRouter)

    }

    listener(){

        this.app.listen(this.port, ()=>{
            console.log(`Server is running on port ${this.port}`);
        })

    }

}

export default Server;