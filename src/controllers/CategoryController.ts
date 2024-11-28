import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService"

class CategoryController{
  //instanciamos CategoryService global para todos los métodos
  private categoryService: CategoryService;
  constructor() {
    this.categoryService = new CategoryService();
    this.handleCreateCategory = this.handleCreateCategory.bind(this);
    this.handleDeleteCategory = this.handleDeleteCategory.bind(this);
    this.handleGetCategoryData = this.handleGetCategoryData.bind(this);
    this.handleListCategories = this.handleListCategories.bind(this);
    this.handleSearchCategory = this.handleSearchCategory.bind(this);
    this.handleUpdateCategory = this.handleUpdateCategory.bind(this);
  }

    async handleCreateCategory(request: Request, response: Response) {
        const { nombre } = request.body;
    
        try {
          await this.categoryService.create({  
            nombre
          }).then(() => {
            request.flash("success", "Categoría creada con éxito")
            response.redirect("/category")
          });
        } catch (err) {
          request.flash("error", "Error al crear la categoría", err.toString());
          response.redirect("/category");
        }
    
    }

    async handleDeleteCategory(request: Request, response: Response) {
        const { id } = request.body;
    
        try {
          await this.categoryService.delete(id).then(() => {
            request.flash("success", "Categoría eliminada con éxito")
            response.redirect("/category")
          });
        } catch (err) {
          request.flash("error", "Error al eliminar la categoría", err.toString());
          response.redirect("/category");
        };
    }

    async handleGetCategoryData(request: Request, response: Response) {
      let { id } = request.query;
      id = id.toString();
  
      const category = await this.categoryService.getData(id);
  
      return response.render("category/editcategory", {
        category: category
      });
    }

    async handleListCategories(request: Request, response: Response) {
  
      const categories = await this.categoryService.list();
  
      return response.render("category/index", {
        categories: categories
      });
    }
    
    async handleSearchCategory(request: Request, response: Response) {
      let { search } = request.query;
      search = search.toString();
  
      try {
        const categories = await this.categoryService.search(search);
        response.render("category/searchcategory", {
          categories: categories,
          search: search
        });
      } catch (err) {
        request.flash("error", "Error al buscar la categoría", err.toString());
          response.redirect("/category");
      };
    }

    async handleUpdateCategory(request: Request, response: Response) {
      const { id, nombre } = request.body;
  
      // const updateCategoryService = new CategoryService();
  
      try {
        await this.categoryService.update({ id, nombre }).then(() => {
          request.flash("success", "Categoría modificada con éxito")
            response.redirect("/category")
          });
        } catch (err) {
          request.flash("error", "Error al actualizar la categoría", err.toString());
          response.redirect("/category");
        };
  
    }  
}
export {CategoryController};
