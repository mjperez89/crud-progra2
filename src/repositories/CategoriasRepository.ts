import { Repository, EntityRepository } from "typeorm";
import { Categorias } from "../entities/Category";

@EntityRepository(Categorias)
class CategoriasRepository extends Repository<Categorias>{ }

export { CategoriasRepository };