import { Request, Response } from "express";
import { categoryService } from "../services/CategoryService";
import { ProductService } from "../services/ProductService"

class ProductController{
    async handleCreateProduct(request: Request, response: Response) {
        const { nombre, marca, precio, id_category } = request.body;
    
        const createProductService = new ProductService();
    
        try {
          await createProductService.create({
            nombre,
            marca,
            precio,
            id_category
          }).then(() => {
            request.flash("succes", "producto creado exitosamente")
            response.redirect("/products")
          });
        } catch (err) {
          request.flash("error", "Error al crear la categoria", err.toString());
          response.redirect("/products");
        }
    
    }

    async handleAddProduct(request: Request, response:Response) {
      const category = await categoryService.list();
      return response.render("products/addproduct", { category })
    }

    async handleDeleteProduct(request: Request, response: Response) {
        const { id } = request.body;
    
        const deleteProductService = new ProductService();
    
        try {
          await deleteProductService.delete(id).then(() => {
            request.flash("succes", "Producto eliminado exitosamente")
            response.redirect("/products")
          });
        } catch (err) {
          request.flash("error", "Error al crear el producto", err.toString());
          response.redirect("/products");
          
        }
    }
    async handleGetProductData(request: Request, response: Response) {
      let { id } = request.query;
      id = id.toString();
  
      const getProductDataService = new ProductService();
  
      const product = await getProductDataService.getData(id);
      const category = await categoryService.list()
  
      return response.render("products/editproduct", {
        product: product,
        category: category
      });
    }
    async handleListProducts(request: Request, response: Response) {
      const listProductsService = new ProductService();
  
      const products = await listProductsService.list();
  
      return response.render("products/index", {
        products: products
      });
    }
    async handleSearchProduct(request: Request, response: Response) {
      let { search } = request.query;
      search = search.toString();

      console.log(search)
  
      const searchProductService = new ProductService();
  
      try {
        const products = await searchProductService.search(search);
        const category = await categoryService.list()
        response.render("products/searchproduct", {
          products: products,
          category: category,
          search: search
        });
      } catch (err) {
        request.flash("error", "Error al buscar el producto", err.toString());
          response.redirect("/products");
        
      }
    }
    async handleUpdateProduct(request: Request, response: Response) {
      const { id, nombre, marca, precio, id_category } = request.body;
  
      const updateProductService = new ProductService();
  
      try {
        await updateProductService.update({ id, nombre, marca, precio, id_category }).then(() => {
          request.flash("succes", "Producto modificado exitosamente")
            response.redirect("/products")
          });
        } catch (err) {
          request.flash("error", "Error al actualiza el producto", err.toString());
          response.redirect("/products");
          
        }
  
    }  
}
export {ProductController};
