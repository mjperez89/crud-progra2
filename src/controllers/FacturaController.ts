import { Request, Response } from "express";
import { clienteService } from "../services/ClienteService";
import { facturaServices } from "../services/FacturaService";
import { productService, ProductService } from "../services/ProductService";

class FacturaController {
    
    
    async get(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

        const factura = await facturaServices.getData(id);
        const productos = await productService.list()

        const productosOrder = factura.productos.map(product=>product.id)
        

        return response.render("Factura/edit", {
            factura: factura,
            productos: productos,
            
        });
    }

    async add(request: Request, response: Response) {
        const clientes = await clienteService.list();
        const productos = await productService.list();
        return response.render("factura/addFactura", { clientes, productos })
    }

    async create(request:Request, response: Response) {
        const { num_factura, tipo_factura, total, fecha, cliente_id } = request.body;
        let {productos} = request.body
        
        
        
        try {
            if(typeof productos === "string") {
                const producto = await productService.getData(productos.toString())
                productos = [];
                productos.push(producto)
            } else {
                productos.map(async (product: string) => {
                    const producto = await productService.getData(product.toString())
                    productos.shift()
                    productos.push(producto)
                })
            }

            await facturaServices.create({
                num_factura,
                tipo_factura, 
                fecha, 
                total, 
                cliente_id, 
                productos
            }).then(() => {
                request.flash("success", "Factura creada con exito")
                response.redirect("/facturas")
            });
        } catch(err) {
            request.flash("error", "Error al crear factura", err.toString());
            response.redirect("/facturas")
        }
    }

    async list(request: Request, response: Response) {
        
        const facturas = await facturaServices.list();
        const productos = await productService.list();
        const clientes = await clienteService.list();
        
        return response.render("factura/index", {
            facturas: facturas,
            productos:productos,
            clientes:clientes,
        });
    };
    
    async delete (request:Request, response:Response){
        const { id }= request.body;
        try {
            await facturaServices.delete(id).then(()=>{
                request.flash("success", "factura eliminada exitosamente" );
                response.redirect("/facturas");
            })
        } catch (error) {
                request.flash("error", "error al eliminar factura");
                response.redirect("/facturas");
        }
    }
    // async update(request:Request, response:Response) {
    //     const{num_factura, tipo_factura, fecha, total, cliente_id, productos} = request.body;
    //     let{productosOrder} = request.body
    //     try {
    //         if(typeof productos === "string"  ){
    //             const producto = await productService.getData(productos)
    //             productos = []
    //             productos.push(producto)
    //         }else{
    //             productos.map(async (product:string) => {
    //                 const producto = await productService.getData(product)
    //                 productos.shift()
    //                 productos.push(producto)
    //             })
    //         }

    //         await facturaServices.update({ num_factura, tipo_factura, fecha, total, cliente_id, productos }).then(() => {
    //             request.flash("success_msg", "orden actualizada correctamente")
    //             response.redirect("./orders")
    //         });
            
    //     } catch (err) {
    //         request.flash("error_msg", "fallo al actualizar la orden");
    //         response.redirect("./orders")
    //     }
        
    // }
}

export {FacturaController}

