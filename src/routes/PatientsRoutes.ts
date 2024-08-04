import { Router } from "express";
import { PatientController } from "../controllers/PatientController";
import auth from "../lib/auth";


const patientRouter = Router()
const partientController = new PatientController()

patientRouter.get("/pacientes",auth.isLoggedIn, partientController.handleListPatient);

patientRouter.get("/addPatient",auth.isLoggedIn, (request, response) => {
  response.render("paciente/add")
});

patientRouter.post("/add-paciente",auth.isLoggedIn, partientController.handleCreatePatient);
patientRouter.get("/editPaciente",auth.isLoggedIn, partientController.handleGetPatientData);
patientRouter.post("/edit-paciente",auth.isLoggedIn, partientController.handleUpdatePatient);
patientRouter.post("/delete-paciente",auth.isLoggedIn, partientController.handleDeletePatient);
patientRouter.get("/searchPaciente",auth.isLoggedIn, partientController.handleSearchPatient);

export { patientRouter}