import { Router } from "express";
import { UserController } from "../controllers/UserController";
import auth from "../lib/auth";

const userRoutes = Router()
const userController = new UserController()

userRoutes.get("/users",  auth.isLoggedIn, userController.handleListUsers);

userRoutes.get("/addUser", auth.isLoggedIn, (request, response) => {
    response.render("user/add");
  });
userRoutes.post("/add-user",auth.isLoggedIn, userController.handleCreateUser);
userRoutes.get("/search", auth.isLoggedIn, userController.handleSearchUser);
userRoutes.post("/edit-user",auth.isLoggedIn, userController.handleUpdateUser);
userRoutes.get("/editUser", auth.isLoggedIn, userController.handleGetUserData);
userRoutes.post("/delete-user",auth.isLoggedIn, userController.handleDeleteUser);

export { userRoutes }
