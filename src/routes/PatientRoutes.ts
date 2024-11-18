import { Router } from "express";
import { PatientController } from "../controllers/PatientController";
import auth from "../lib/auth";


const patientRouter = Router()
const patientController = new PatientController()

patientRouter.get("/patient",auth.isLoggedIn, patientController.handleListPatient);

patientRouter.get("/addPatient", auth.isLoggedIn, patientController.handleAddPatient);
patientRouter.post("/addPatient",auth.isLoggedIn, patientController.handleCreatePatient);
patientRouter.get("/editPatient",auth.isLoggedIn, patientController.handleGetPatientData);
patientRouter.post("/editPatient",auth.isLoggedIn, patientController.handleUpdatePatient);
patientRouter.post("/deletePatient",auth.isLoggedIn, patientController.handleDeletePatient);
patientRouter.get("/searchPatient",auth.isLoggedIn, patientController.handleSearchPatient);

export { patientRouter}