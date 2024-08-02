import { Repository, EntityRepository } from "typeorm";
import { Products } from "../entities/Product";

@EntityRepository(Products)
class ProductsRepository extends Repository<Products>{ }

export { ProductsRepository };