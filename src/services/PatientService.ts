import { getCustomRepository } from "typeorm";
import { Patient } from "../entities/Patient";
import { PatientRepository } from "../repositories/PatientRepository"

interface IPatient {
  id?: string
  name: string;
  email: string;
  telefono: string;
  ciudad: string;
  provincia: string;
  dni: string;
  direccion: string;
  id_category: string;
}

class PatientService {
  private get patientRepository() {
    return getCustomRepository(PatientRepository);
  }

  async create({ name, email, telefono, dni, ciudad, provincia, direccion, id_category }: IPatient) {
    if (!name || !email || !telefono || !dni || !ciudad || !provincia || !direccion || !id_category) {
      throw new Error("Por favor rellene todos los campos.");
    }

    const dniAlreadyExists = await this.patientRepository.findOne({ dni });
    if (dniAlreadyExists) {
      throw new Error("El dni de usuario ingresado ya existe");
    }

    const emailAlreadyExists = await this.patientRepository.findOne({ email });
    if (emailAlreadyExists) {
      throw new Error("El mail de usuario ingresado ya existe");
    }

    const paciente = this.patientRepository.create({ name, email, telefono, dni, ciudad, provincia, direccion, id_category });

    await this.patientRepository.save(paciente);

    return paciente;

  }

  async delete(id: string) {
    const paciente = await this.patientRepository
      .createQueryBuilder()
      .delete()
      .from(Patient)
      .where("id = :id", { id })
      .execute();

    return paciente;

  }

  async getData(id: string) {
    const paciente = await this.patientRepository.findOne(id);

    return paciente;
  }

  async list() {
    const pacientes = await this.patientRepository.find({ relations: ["category"] });

    return pacientes;
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor rellene todos los campos");
    }

    const paciente = await this.patientRepository
      .createQueryBuilder()
      .where("name like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("telefono like :search", { search: `%${search}%` })
      .orWhere("dni like :search", { search: `%${search}%` })
      .orWhere("ciudad like :search", { search: `%${search}%` })
      .orWhere("provincia like :search", { search: `%${search}%` })
      .orWhere("direccion like :search", { search: `%${search}%` })
      .orWhere("id_category like :search", { search: `%${search}%` })
      .getMany();

    return paciente;

  }

  async update({ id, name, email, telefono, dni, ciudad, provincia, direccion, id_category }: IPatient) {
    const paciente = await this.patientRepository
      .createQueryBuilder()
      .update(Patient)
      .set({ name, email, telefono, dni, ciudad, provincia, direccion, id_category })
      .where("id = :id", { id })
      .execute();

    return paciente;
  }
}

export { PatientService };
export const patientService = new PatientService()