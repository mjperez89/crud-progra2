import { Router } from "express";
import { UserController } from "../controllers/UserController";
import auth from "../lib/auth";

const userRouter = Router()
const userController = new UserController()

userRouter.get("/user", auth.isLoggedIn, auth.isAdmin, userController.handleListUsers);

userRouter.get("/addUser", auth.isLoggedIn, auth.isAdmin, (request, response) => {
  response.render("user/add");
});
userRouter.post("/addUser", auth.isLoggedIn, auth.isAdmin, userController.handleCreateUser);
userRouter.get("/searchUser", auth.isLoggedIn, auth.isAdmin, userController.handleSearchUser);
userRouter.post("/editUser", auth.isLoggedIn, auth.isAdmin, userController.handleUpdateUser);
userRouter.get("/editUser", auth.isLoggedIn, auth.isAdmin, userController.handleGetUserData);
userRouter.post("/deleteUser", auth.isLoggedIn, auth.isAdmin, userController.handleDeleteUser);

export { userRouter }
