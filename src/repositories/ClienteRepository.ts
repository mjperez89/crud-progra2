import { Repository, EntityRepository } from "typeorm";
import { Cliente } from "../entities/Cliente";

@EntityRepository(Cliente)
class ClientesRepository extends Repository<Cliente>{ }

export { ClientesRepository };