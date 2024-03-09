// Import all from the controllers, the router, the check from express-validator and also the limiter

import Router from "express";
import { check } from "express-validator";
import { getFlight, getOneFlight , deleteFlight , updateFlight, findBasic, findIntermedium, findAdvanced, createFlight } from "../controllers/flight.controllers.js";
import limiter from "../middlewares/rateLimit.js";

const router = Router();

router.get("/", limiter , getFlight);
router.get("/basic", limiter, findBasic);
router.get("/intermedium", limiter , findIntermedium);
router.get("/advanced", limiter , findAdvanced);
router.get("/:id", limiter , getOneFlight);
router.post("/", [
    check("origin", "The origin is required"),
    check("destination" , "The destination is required"),
    check("price", "The price is required"),
    limiter
] , createFlight);
router.delete("/:id", limiter , deleteFlight);
router.patch("/:id", limiter , updateFlight);

export default router;