import { Request, Response } from "express";
import { helpers } from "../lib/helpers";
import { ClienteService } from "../services/ClienteService";

class ClienteController{
  async handleCreateCliente(request: Request, response: Response) {
      const { name, email, telefono, dni, direccion } = request.body;
  
      const createClienteService = new ClienteService();
  
      try {
        await createClienteService.create({
          name,
          email,
          telefono,
          dni,
          direccion,

        }).then(() => {
          request.flash("succes", "cliente creado exitosamente")
          response.redirect("/clientes")
          });
        
      } catch (err) {
        request.flash("error", "Error al crear el cliente", err.toString());
        console.log(request.body)
        response.redirect("/clientes");
        
      }
  
  }
  async handleDeleteCliente(request: Request, response: Response) {
      const { id } = request.body;
  
      const deleteClienteService = new ClienteService();
  
      try {
        await deleteClienteService.delete(id).then(() => {
          request.flash("succes", "Cliente eliminado exitosamente")
          response.redirect("/clientes")
          });
        
      } catch (err) {
        request.flash("error", "Error al eliminar el Cliente", err.toString());
        response.redirect("/clientes");
        
      }
  }
  async handleGetClienteData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const getClienteDataService = new ClienteService();

    const cliente = await getClienteDataService.getData(id);

    return response.render("cliente/edit", {
      cliente: cliente
    });
  }
  async handleListClientes(request: Request, response: Response) {
    const listClientesService = new ClienteService();

    const clientes = await listClientesService.list();

    return response.render("cliente/index", {
      clientes: clientes
    });
  }
  async handleSearchCliente(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const searchClienteService = new ClienteService();

    try {
      const clientes = await searchClienteService.search(search);
      response.render("cliente/search", {
        clientes: clientes,
        search: search
      });
    } catch (err) {
      request.flash("error", "Error al crear el cliente", err.toString());
        response.redirect("/clientes");
      
    }
  }
  async handleUpdateCliente(request: Request, response: Response) {
    const { id, name, email, telefono, dni, direccion } = request.body;

    const updateClienteService = new ClienteService();

    try {
      await updateClienteService.update({ 
        id, 
        name, 
        email, 
        telefono, 
        dni,
        direccion,
      }).then(() => {
        request.flash("succes", "Cliente actualizado exitosamente")
          response.redirect("/clientes")
        
      });
    } catch (err) {
      request.flash("error", "Error al crear el cliente", err.toString());
        response.redirect("/clientes");
    }

  }  
}
export {ClienteController};