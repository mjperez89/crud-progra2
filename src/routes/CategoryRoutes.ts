import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import auth from "../lib/auth";

const categoryRouter = Router()
const categoryController = new CategoryController()

categoryRouter.get("/category", auth.isLoggedIn, auth.isAdmin, categoryController.handleListCategories)
categoryRouter.get("/addCategory", auth.isLoggedIn, auth.isAdmin, (request, response) => {
  response.render("category/addcategory");
});
categoryRouter.post("/addCategory", auth.isLoggedIn, auth.isAdmin, categoryController.handleCreateCategory);
categoryRouter.get("/searchCategory", auth.isLoggedIn, auth.isAdmin, categoryController.handleSearchCategory);
categoryRouter.post("/editCategory", auth.isLoggedIn, auth.isAdmin, categoryController.handleUpdateCategory);
categoryRouter.get("/editCategory", auth.isLoggedIn, auth.isAdmin, categoryController.handleGetCategoryData);
categoryRouter.post("/deleteCategory", auth.isLoggedIn, auth.isAdmin, categoryController.handleDeleteCategory);

export { categoryRouter }
