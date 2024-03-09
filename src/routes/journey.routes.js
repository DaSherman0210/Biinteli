// Import all from the controllers, the router and also the limiter

import Router from "express";
import { getJourney, getOneJourney , postJourney , deleteJourney, updateJourney, searchJourney } from "../controllers/journey.controllers.js";
import limiter from "../middlewares/rateLimit.js";

const router = Router();

router.get("/" , limiter , getJourney)
router.get("/search" , limiter , searchJourney)
router.get("/:id" , limiter , getOneJourney)
router.post("/" , limiter , postJourney)
router.delete("/:id" , limiter , deleteJourney)
router.patch("/:id" , limiter , updateJourney)

export default router;