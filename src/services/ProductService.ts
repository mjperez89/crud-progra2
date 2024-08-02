import { getCustomRepository } from "typeorm";
import { Products } from "../entities/Product";
import { ProductsRepository } from "../repositories/ProductsRepository"


interface IProduct {
    id?:string
    nombre:string;
    marca:string;
    precio:number;
    id_category: string;
  }


class ProductService {

  async create({ nombre, marca, precio, id_category }: IProduct) {
    if (!nombre || !marca || !precio || !id_category ) {
      throw new Error("Por favor rellene todos los campos.");
    }

    const productsRepository = getCustomRepository(ProductsRepository);

    const productnameAlreadyExists = await productsRepository.findOne({ nombre });

    if (productnameAlreadyExists) {
      throw new Error("El producto ya ha sido creado");
    }

    const product = productsRepository.create({ nombre, marca, precio, id_category });
    console.log(product)

    await productsRepository.save(product);

    return product;

  }

  async delete(id: string) {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository
      .createQueryBuilder()
      .delete()
      .from(Products)
      .where("id = :id", { id })
      .execute();

    return product;

  }

  async getData(id: string) {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne(id);

    return product;
  }

  async list() {
    const productsRepository = getCustomRepository(ProductsRepository);

    const products = await productsRepository.find({relations: ["category"]});

    return products;
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor rellene todos los campos");
    }

    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository
      .createQueryBuilder()
      .where("nombre like :search", { search: `%${search}%` })
      .orWhere("marca like :search", { search: `%${search}%` })
      .orWhere("precio like :search", { search: `%${search}%` })
      .orWhere("id_category like :search", { search: `%${search}%` })
      .getMany();

    return product;

  }

  async update({ id,nombre, marca, precio, id_category }: IProduct) {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository
      .createQueryBuilder()
      .update(Products)
      .set({ nombre, marca, precio, id_category })
      .where("id = :id", { id })
      .execute();

    return product;

  }
}

export { ProductService };
export const productService = new ProductService()