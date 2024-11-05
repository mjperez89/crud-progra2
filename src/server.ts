import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { productRouter } from "./routes";
import { userRoutes } from "./routes/userRoutes";
import { categoryRoutes } from "./routes/CategoryRoutes";
import { routerAuth } from "./routes/LoginRoutes";
import { patientRouter } from "./routes/PatientsRoutes";
import { graphicsRouter } from "./routes/GraphicsRoutes";
import { graphicsService } from './services/GraphicsService';
import "./database";
import session from "express-session";
import flash from "connect-flash"
import passport from "passport";
import morgan from "morgan";

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(passport.initialize());
app.use(passport.session());
require('./lib/passport');
app.use(flash())

//Variables Globales
app.use((request, response, next) => {
  app.locals.succes = request.flash("succes");
  app.locals.error = request.flash("error");
  app.locals.user = request.user
  next()
});

//Routes
app.use(productRouter);
app.use(userRoutes);
app.use(categoryRoutes);
app.use(routerAuth);
app.use(patientRouter);
app.use(graphicsRouter);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.listen(3000, () => {
  console.log("Server is running at port 3000 in http://localhost:3000/ ");
});
