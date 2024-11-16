import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import auth from "../lib/auth";

const categoryRouter = Router()
const categoryController = new CategoryController()

categoryRouter.get("/category", auth.isLoggedIn, categoryController.handleListCategories)
categoryRouter.get("/addCategory", auth.isLoggedIn, (request, response) => {
    response.render("category/addcategory");
  });
categoryRouter.post("/add-category", auth.isLoggedIn,categoryController.handleCreateCategory);
categoryRouter.get("/searchCategory", auth.isLoggedIn, categoryController.handleSearchCategory);
categoryRouter.post("/edit-category",auth.isLoggedIn, categoryController.handleUpdateCategory);
categoryRouter.get("/editCategory", auth.isLoggedIn, categoryController.handleGetCategoryData);
categoryRouter.post("/delete-category",auth.isLoggedIn, categoryController.handleDeleteCategory);

export { categoryRouter }
