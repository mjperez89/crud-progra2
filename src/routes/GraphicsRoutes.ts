import { Router } from "express";
import { GraphicsController } from "../controllers/GraphicsController";
import auth from "../lib/auth";

const graphicsRouter = Router()
const graphicsController = new GraphicsController()


graphicsRouter.get("/graphics/index", auth.isLoggedIn, graphicsController.handleListGraphics);
graphicsRouter.get("/graphics/data", auth.isLoggedIn, graphicsController.getChartData);

export { graphicsRouter as graphicsRouter }
