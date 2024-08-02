import { Router } from "express";
import { FacturaController } from "../controllers/FacturaController";
import auth from "../lib/auth";

const facturaRouter = Router();
const facturaController = new FacturaController();

facturaRouter.get("/facturas",auth.isLoggedIn,  facturaController.list);
facturaRouter.get("/addFactura",auth.isLoggedIn, facturaController.add)
facturaRouter.post("/add-factura",auth.isLoggedIn, facturaController.create);
facturaRouter.get("/editfactura",auth.isLoggedIn, facturaController.get);

facturaRouter.post("/delete-factura",auth.isLoggedIn, facturaController.delete);

export { facturaRouter };