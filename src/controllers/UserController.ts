import { Request, Response } from "express";
import { helpers } from "../lib/helpers";
import { UserService } from "../services/UserService"

class UserController{
    async handleCreateUser(request: Request, response: Response) {
        const { name, email, telefono, provincia, ciudad, username, password } = request.body;
    
        const createUserService = new UserService();
    
        try {
          await createUserService.create({
            name,
            email,
            telefono,
            provincia,
            ciudad,
            username,
            password: await helpers.encryptPassword(password)
          }).then(() => {
            request.flash("succes", "Usuario creado exitosamente")
            response.redirect("/users")
            });
          
        } catch (err) {
          request.flash("error", "Error al crear el usuario", err.toString());
          console.log(request.body)
          response.redirect("/users");
          
        }
    
    }
    async handleDeleteUser(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteUserService = new UserService();
    
        try {
          await deleteUserService.delete(id).then(() => {
            request.flash("succes", "Usuario eliminado exitosamente")
            response.redirect("/users")
            });
          
        } catch (err) {
          request.flash("error", "Error al eliminar el usuario", err.toString());
          response.redirect("/users");
          
        }
    }
    async handleGetUserData(request: Request, response: Response) {
      let { id } = request.query;
      id = id.toString();
  
      const getUserDataService = new UserService();
  
      const user = await getUserDataService.getData(id);
  
      return response.render("user/edit", {
        user: user
      });
    }
    async handleListUsers(request: Request, response: Response) {
      const listUsersService = new UserService();
  
      const users = await listUsersService.list();
  
      return response.render("user/index", {
        users: users
      });
    }
    async handleSearchUser(request: Request, response: Response) {
      let { search } = request.query;
      search = search.toString();
  
      const searchUserService = new UserService();
  
      try {
        const users = await searchUserService.search(search);
        response.render("user/search", {
          users: users,
          search: search
        });
      } catch (err) {
        request.flash("error", "Error al crear el usuario", err.toString());
          response.redirect("/users");
        
      }
    }
    async handleUpdateUser(request: Request, response: Response) {
      const { id, name, email, telefono, provincia, ciudad, username, password } = request.body;
  
      const updateUserService = new UserService();
  
      try {
        await updateUserService.update({ 
          id, 
          name, 
          email, 
          telefono, 
          provincia, 
          ciudad, 
          username, 
          password:  await helpers.encryptPassword(password) 
        }).then(() => {
          request.flash("succes", "Usuario actualizado exitosamente")
            response.redirect("/users")
          
        });
      } catch (err) {
        request.flash("error", "Error al crear el usuario", err.toString());
          response.redirect("/users");
      }
  
    }  
}
export {UserController};