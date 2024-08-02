import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import auth from "../lib/auth";

const categoryRoutes = Router()
const categoryController = new CategoryController()

categoryRoutes.get("/category", auth.isLoggedIn, categoryController.handleListCategory)
categoryRoutes.get("/addCategory", auth.isLoggedIn, (request, response) => {
    response.render("category/addcategory");
  });
categoryRoutes.post("/add-category", auth.isLoggedIn,categoryController.handleCreateCategory);
categoryRoutes.get("/searchCategory", auth.isLoggedIn, categoryController.handleSearchCategory);
categoryRoutes.post("/edit-category",auth.isLoggedIn, categoryController.handleUpdateCategory);
categoryRoutes.get("/editCategory", auth.isLoggedIn, categoryController.handleGetCategoryData);
categoryRoutes.post("/delete-category",auth.isLoggedIn, categoryController.handleDeleteCategory);

export { categoryRoutes }
