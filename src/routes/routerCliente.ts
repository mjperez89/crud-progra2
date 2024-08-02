import { Router } from "express";
import { ClienteController } from "../controllers/ClienteController";
import auth from "../lib/auth";


const clienteRouter = Router()
const clienteController = new ClienteController()

clienteRouter.get("/clientes",auth.isLoggedIn, clienteController.handleListClientes);

clienteRouter.get("/addCliente",auth.isLoggedIn, (request, response) => {
  response.render("cliente/add")
});

clienteRouter.post("/add-cliente",auth.isLoggedIn, clienteController.handleCreateCliente);
clienteRouter.get("/editCliente",auth.isLoggedIn, clienteController.handleGetClienteData);
clienteRouter.post("/edit-cliente",auth.isLoggedIn, clienteController.handleUpdateCliente);
clienteRouter.post("/delete-cliente",auth.isLoggedIn, clienteController.handleDeleteCliente);
clienteRouter.get("/searchCliente",auth.isLoggedIn, clienteController.handleSearchCliente);

export { clienteRouter }