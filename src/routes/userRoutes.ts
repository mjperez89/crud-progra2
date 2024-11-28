import { Router } from "express";
import { UserController } from "../controllers/UserController";
import auth from "../lib/auth";

const userRouter = Router()
const userController = new UserController()

userRouter.get("/user",  auth.isLoggedIn, userController.handleListUsers);

userRouter.get("/addUser", auth.isLoggedIn, (request, response) => {
    response.render("user/add");
  });
userRouter.post("/addUser",auth.isLoggedIn, userController.handleCreateUser);
userRouter.get("/searchUser", auth.isLoggedIn, userController.handleSearchUser);
userRouter.post("/editUser",auth.isLoggedIn, userController.handleUpdateUser);
userRouter.get("/editUser", auth.isLoggedIn, userController.handleGetUserData);
userRouter.post("/deleteUser",auth.isLoggedIn, userController.handleDeleteUser);

export { userRouter }
