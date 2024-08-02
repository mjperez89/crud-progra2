import { getCustomRepository } from "typeorm";
import { Categorias } from "../entities/Category";
import { CategoriasRepository } from "../repositories/CategoriasRepository"


interface ICategory {
  id?: string
  nombre: string;

  }
class CategoryService {
  async create({ nombre, }: ICategory) {
    if (!nombre) {
      throw new Error("Por favor rellene todos los campos.");
    }
    const categoriasRepository = getCustomRepository(CategoriasRepository);
    const categorynameAlreadyExists = await categoriasRepository.findOne({ nombre });

    if (categorynameAlreadyExists) {
      throw new Error("La Categoria ya ha sido creado");
    }

    const category = categoriasRepository.create({ nombre });
    console.log(category)

    await categoriasRepository.save(category);

    return category;
  }

  async delete(id: string) {
    const categoriasRepository = getCustomRepository(CategoriasRepository);

    const category = await categoriasRepository
      .createQueryBuilder()
      .delete()
      .from(Categorias)
      .where("id = :id", { id })
      .execute();

    return category;

  }
// hasta aqui llegue//
  async getData(id: string) {
    const categoriasRepository = getCustomRepository(CategoriasRepository);

    const category = await categoriasRepository.findOne(id);

    return category;
  }

  async list() {
    const categoriasRepository = getCustomRepository(CategoriasRepository);

    const categorias = await categoriasRepository.find();

    return categorias;
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor rellene todos los campos");
    }

    const categoriasRepository = getCustomRepository(CategoriasRepository);

    const category = await categoriasRepository
      .createQueryBuilder()
      .where("nombre like :search", { search: `%${search}%` })      
      .getMany();

    return category;

  }

  async update({ id, nombre }: ICategory) {
    const categoriasRepository = getCustomRepository(CategoriasRepository);

    const category = await categoriasRepository
      .createQueryBuilder()
      .update(Categorias)
      .set({ nombre })
      .where("id = :id", { id })
      .execute();

    return category;

  }
}

export const categoryService = new CategoryService()
export { CategoryService };