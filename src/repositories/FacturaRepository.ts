import { Repository, EntityRepository } from "typeorm";
import { Factura } from "../entities/Factura";

@EntityRepository(Factura)
class FacturasRepository extends Repository<Factura>{ }

export { FacturasRepository };