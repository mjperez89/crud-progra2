import { getCustomRepository } from "typeorm";
import { Patient } from "../entities/Patient";
import { PatientRepository } from "../repositories/PatientRepository"

interface IPatient {
    id?:string
    name: string;
    email: string;
    telefono: string;
    dni: string;
    direccion: string;
  }

  class PatientService {

    async create({ name, email, telefono, dni, direccion,  }: IPatient) {
      if (!name || !email || !telefono || !dni || !direccion ) {
        throw new Error("Por favor rellene todos los campos.");
      }
  
      const parientsRepository = getCustomRepository(PatientRepository);
  
      const dniAlreadyExists = await parientsRepository.findOne({ dni });
  
      if (dniAlreadyExists) {
        throw new Error("El dni de usuario ingresado ya existe");
      }
  
      const emailAlreadyExists = await parientsRepository.findOne({ email });
  
      if (emailAlreadyExists) {
        throw new Error("El mail de usuario ingresado ya existe");
      }
  
      const paciente = parientsRepository.create({ name, email, telefono, dni, direccion, });
  
      await parientsRepository.save(paciente);
  
      return paciente;
  
    }
  
    async delete(id: string) {
      const parientsRepository = getCustomRepository(PatientRepository);
  
      const paciente = await parientsRepository
        .createQueryBuilder()
        .delete()
        .from(Patient)
        .where("id = :id", { id })
        .execute();
  
      return paciente;
  
    }
  
    async getData(id: string) {
      const parientsRepository = getCustomRepository(PatientRepository);
  
      const paciente = await parientsRepository.findOne(id);
  
      return paciente;
    }
  
    async list() {
      const parientsRepository = getCustomRepository(PatientRepository);
  
      const pacientes = await parientsRepository.find();
  
      return pacientes;
    }
  
    async search(search: string) {
      if (!search) {
        throw new Error("Por favor rellene todos los campos");
      }
  
      const parientsRepository = getCustomRepository(PatientRepository);
  
      const paciente = await parientsRepository
        .createQueryBuilder()
        .where("name like :search", { search: `%${search}%` })
        .orWhere("email like :search", { search: `%${search}%` })
        .orWhere("telefono like :search", { search: `%${search}%` })
        .orWhere("dni like :search", { search: `%${search}%` })
        .orWhere("direccion like :search", { search: `%${search}%` })
        .getMany();
  
      return paciente;
  
    }
  
    async update({ id, name, email, telefono, dni, direccion }: IPatient) {
      const parientsRepository = getCustomRepository(PatientRepository);
  
      const paciente = await parientsRepository
        .createQueryBuilder()
        .update(Patient)
        .set({ name, email, telefono, dni, direccion })
        .where("id = :id", { id })
        .execute();
  
      return paciente;
  // hola
    }
  }
  
  export { PatientService };
  export const patientService = new PatientService()