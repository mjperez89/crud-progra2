import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService"

class CategoryController{
    async handleCreateCategory(request: Request, response: Response) {
        const { nombre } = request.body;
    
        const createCategoryService = new CategoryService();

        try {
          await createCategoryService.create({
            nombre
          }).then(() => {
            request.flash("succes", "Categoria creada exitosamente")
            response.redirect("/category")
          });
        } catch (err) {
          request.flash("error", "Error al crear la categoria", err.toString());
          response.redirect("/category");
        }
    
    }
    async handleDeleteCategory(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteCategoryService = new CategoryService();
    
        try {
          await deleteCategoryService.delete(id).then(() => {
            request.flash("succes", "Categoria eliminada exitosamente")
            response.redirect("/category")
          });
        } catch (err) {
          request.flash("error", "Error al eliminar la categoria", err.toString());
          response.redirect("/category");
        };
    }
    async handleGetCategoryData(request: Request, response: Response) {
      let { id } = request.query;
      id = id.toString();
  
      const getCategoryDataService = new CategoryService();
  
      const category = await getCategoryDataService.getData(id);
  
      return response.render("category/editcategory", {
        category: category
      });
    }
    async handleListCategory(request: Request, response: Response) {
      const listCategoriasService = new CategoryService();
  
      const categorias = await listCategoriasService.list();
  
      return response.render("category/index", {
        categorias: categorias
      });
    }
    async handleSearchCategory(request: Request, response: Response) {
      let { search } = request.query;
      search = search.toString();
  
      const searchCategoryService = new CategoryService();
  
      try {
        const categorias = await searchCategoryService.search(search);
        response.render("category/searchcategory", {
          categorias: categorias,
          search: search
        });
      } catch (err) {
        request.flash("error", "Error al buscar la categoria", err.toString());
          response.redirect("/category");
      };
    }
    async handleUpdateCategory(request: Request, response: Response) {
      const { id, nombre } = request.body;
  
      const updateCategoryService = new CategoryService();
  
      try {
        await updateCategoryService.update({ id, nombre }).then(() => {
          request.flash("succes", "Categoria modificada exitosamente")
            response.redirect("/category")
          });
        } catch (err) {
          request.flash("error", "Error al actualizar la categoria", err.toString());
          response.redirect("/category");
        };
  
    }  
}
export {CategoryController};
