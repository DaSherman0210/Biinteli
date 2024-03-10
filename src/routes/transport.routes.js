// Import all from the controllers, the router and also the limiter

import Router from "express";
import { getTransport , getOneTransport , postTransport , deleteTransport , updateTransport} from "../controllers/transport.controllers.js";
import limiter from "../middlewares/rateLimit.js";

const router = Router();

router.get("/", limiter , getTransport)
router.get("/:id", limiter , getOneTransport)
router.post("/", limiter , postTransport)
router.delete("/:id", limiter , deleteTransport)
router.patch("/:id", limiter , updateTransport)

// The router is exported 

export default router;