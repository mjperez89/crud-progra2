import { Repository, EntityRepository } from "typeorm";
import { Patient } from "../entities/Patient";

@EntityRepository(Patient)
class PatientRepository extends Repository<Patient>{ }

export { PatientRepository };