import { Request, Response } from "express";
import { helpers } from "../lib/helpers";
import { PatientService } from "../services/PatientService";
import { CategoryService } from "../services/CategoryService";


class PatientController{
  async handleCreatePatient(request: Request, response: Response) {
      const { name, email, telefono, dni, ciudad, provincia, direccion, id_category } = request.body;
  
      const createPatientService = new PatientService();
  
      try {
        await createPatientService.create({
          name,
          email,
          telefono,
          dni,
          ciudad,
          provincia,
          direccion,
          id_category

        }).then(() => {
          request.flash("succes", "paciente creado exitosamente")
          response.redirect("/patient")
          });
        
      } catch (err) {
        request.flash("error", "Error al crear el paciente", err.toString());
        console.log(request.body)
        response.redirect("/patient");
        
      }
  
  }

  async handleAddPatient(request: Request, response: Response) {
    const categoryService = new CategoryService();
    try {
      const categories = await categoryService.list();
      response.render("patient/add", { category: categories });
    } catch (err) {
      request.flash("error", "Error al obtener las categorías", err.toString());
      response.redirect("/patients");
    }
  }

  async handleDeletePatient(request: Request, response: Response) {
      const { id } = request.body;
  
      const deletePatientService = new PatientService();
  
      try {
        await deletePatientService.delete(id).then(() => {
          request.flash("succes", "Paciente eliminado exitosamente")
          response.redirect("/patient")
          });
        
      } catch (err) {
        request.flash("error", "Error al eliminar el Paciente", err.toString());
        response.redirect("/patient");
        
      }
  }

  async handleGetPatientData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const categoryService = new CategoryService();

    const getPatientDataService = new PatientService();

    const paciente = await getPatientDataService.getData(id);
    const category = await categoryService.list()

    return response.render("patient/edit", {
      paciente: paciente,
      category: category
    });
  }

  async handleListPatient(request: Request, response: Response) {
    const listPatientsService = new PatientService();

    const pacientes = await listPatientsService.list();

    return response.render("patient/index", {
      pacientes: pacientes
    });
  }

  async handleSearchPatient(request: Request, response: Response) {
    let { search } = request.query;
    search = search.toString();

    const categoryService = new CategoryService();

    const searchPatientService = new PatientService();

    try {
      const pacientes = await searchPatientService.search(search);
      const category = await categoryService.list()
      response.render("patient/search", {
        pacientes: pacientes,
        category: category,
        search: search
      });
    } catch (err) {
      request.flash("error", "Error al crear el paciente", err.toString());
        response.redirect("/patient");
      
    }
  }
  
  async handleUpdatePatient(request: Request, response: Response) {
    const { id, name, email, telefono, dni, ciudad, provincia, direccion, id_category } = request.body;

    const updatePatientService = new PatientService();

    try {
      await updatePatientService.update({ 
        id, 
        name, 
        email, 
        telefono, 
        dni,
        ciudad,
        provincia,
        direccion,
        id_category
      }).then(() => {
        request.flash("succes", "Paciente actualizado exitosamente")
          response.redirect("/patient")
        
      });
    } catch (err) {
      request.flash("error", "Error al crear el paciente", err.toString());
        response.redirect("/patient");
    }

  }  
}
export {PatientController};