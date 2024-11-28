import { Router } from "express";
import { CategoryController } from "../controllers/CategoryController";
import auth from "../lib/auth";

const categoryRouter = Router()
const categoryController = new CategoryController()

categoryRouter.get("/category", auth.isLoggedIn, categoryController.handleListCategories)
categoryRouter.get("/addCategory", auth.isLoggedIn, (request, response) => {
    response.render("category/addcategory");
  });
categoryRouter.post("/addCategory", auth.isLoggedIn,categoryController.handleCreateCategory);
categoryRouter.get("/searchCategory", auth.isLoggedIn, categoryController.handleSearchCategory);
categoryRouter.post("/editCategory",auth.isLoggedIn, categoryController.handleUpdateCategory);
categoryRouter.get("/editCategory", auth.isLoggedIn, categoryController.handleGetCategoryData);
categoryRouter.post("/deleteCategory",auth.isLoggedIn, categoryController.handleDeleteCategory);

export { categoryRouter }
