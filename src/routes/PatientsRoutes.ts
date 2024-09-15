import { Router } from "express";
import { PatientController } from "../controllers/PatientController";
import auth from "../lib/auth";


const patientRouter = Router()
const partientController = new PatientController()

patientRouter.get("/patient",auth.isLoggedIn, partientController.handleListPatient);

patientRouter.get("/addPatient",auth.isLoggedIn, (request, response) => {
  response.render("patient/add")
});

patientRouter.post("/add-patient",auth.isLoggedIn, partientController.handleCreatePatient);
patientRouter.get("/editPatient",auth.isLoggedIn, partientController.handleGetPatientData);
patientRouter.post("/edit-patient",auth.isLoggedIn, partientController.handleUpdatePatient);
patientRouter.post("/delete-patient",auth.isLoggedIn, partientController.handleDeletePatient);
patientRouter.get("/searchPatient",auth.isLoggedIn, partientController.handleSearchPatient);

export { patientRouter}