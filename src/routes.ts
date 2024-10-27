import { request, response, Router } from "express";
import auth from "./lib/auth";
import { helpers } from "./lib/helpers";


const productRouter = Router();


productRouter.get("/",auth.isLoggedIn, (request, response) => {
  response.render("./login/signin");
});

productRouter.get("/home", auth.isLoggedIn,(request, response) => {
  response.render("home")

})


export { productRouter };

