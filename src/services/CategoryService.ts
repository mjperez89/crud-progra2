import { getCustomRepository } from "typeorm";
import { Category } from "../entities/Category";
import { CategoryRepository } from "../repositories/CategoryRepository"


interface ICategory {
  id?: string
  nombre: string;

  }
class CategoryService {
  async create({ nombre, }: ICategory) {
    if (!nombre) {
      throw new Error("Por favor rellene todos los campos ");
    }
    const categoryRepository = getCustomRepository(CategoryRepository);
    const categoryNameAlreadyExists = await categoryRepository.findOne({ nombre });

    if (categoryNameAlreadyExists) {
      throw new Error("La categoría ya ha sido creada");
    }

    const category = categoryRepository.create({ nombre });
    console.log(category)

    await categoryRepository.save(category);

    return category;
  }

  async delete(id: string) {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const category = await categoryRepository
      .createQueryBuilder()
      .delete()
      .from(Category)
      .where("id = :id", { id })
      .execute();

    return category;

  }

  async getData(id: string) {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const category = await categoryRepository.findOne(id);

    return category;
  }

  async list() {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const categorias = await categoryRepository.find();

    return categorias;
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor rellene todos los campos");
    }

    const categoryRepository = getCustomRepository(CategoryRepository);

    const category = await categoryRepository
      .createQueryBuilder()
      .where("nombre like :search", { search: `%${search}%` })      
      .getMany();

    return category;

  }

  async update({ id, nombre }: ICategory) {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const category = await categoryRepository
      .createQueryBuilder()
      .update(Category)
      .set({ nombre })
      .where("id = :id", { id })
      .execute();

    return category;

  }
}

export const categoryService = new CategoryService()
export { CategoryService };