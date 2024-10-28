import { Router } from "express";
import { GraphicsController } from "../controllers/GraphicsController";
import auth from "../lib/auth";

const graphicsRoutes = Router()
const graphicsController = new GraphicsController()


graphicsRoutes.get("/graphics", auth.isLoggedIn, graphicsController.handleListGraphics);
graphicsRoutes.get("/graphics/data", auth.isLoggedIn, graphicsController.getChartData);

export { graphicsRoutes }
