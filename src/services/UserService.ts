import { getCustomRepository } from "typeorm";
import { User } from "../entities/User";
import { UsersRepository } from "../repositories/UsersRepository"


interface IUser {
    id?:string
    name: string;
    email: string;
    telefono: string;
    provincia: string;
    ciudad: string;
    username: string;
    password: string;
    admin: boolean;
  }


class UserService {
  
  async create({ name, email, telefono, provincia, ciudad, username, password, admin }: IUser) {
    if (!name || !email || !telefono || !provincia || !ciudad || !username || !password) {
      throw new Error("Por favor rellene todos los campos.");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const usernameAlreadyExists = await usersRepository.findOne({ username });

    if (usernameAlreadyExists) {
      throw new Error("El nombre de usuario ingresado ya existe");
    }

    const emailAlreadyExists = await usersRepository.findOne({ email });

    if (emailAlreadyExists) {
      throw new Error("El mail de usuario ingresado ya existe");
    }
    
    if (admin) {
      admin = true;
    };
    
    const user = usersRepository.create({ name, email, telefono, provincia, ciudad, username, password, admin });
    console.log(user)

    await usersRepository.save(user);

    return user;

  }

  
  async getDataByUsername( username: string ) {
    const usersRepository = getCustomRepository(UsersRepository)
    const user = await usersRepository.find({where: {username:username}})
    return user
  }

  async delete(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();

    return user;

  }

  async getData(id: string) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(id);

    return user;
  }

  async list() {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = await usersRepository.find();

    return users;
  }

  async search(search: string) {
    if (!search) {
      throw new Error("Por favor rellene todos los campos");
    }

    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository
      .createQueryBuilder()
      .where("name like :search", { search: `%${search}%` })
      .orWhere("email like :search", { search: `%${search}%` })
      .orWhere("telefono like :search", { search: `%${search}%` })
      .orWhere("provincia like :search", { search: `%${search}%` })
      .orWhere("ciudad like :search", { search: `%${search}%` })
      .orWhere("username like :search", { search: `%${search}%` })
      

      .getMany();

    return user;

  }

  async update({ id, name, email, telefono, provincia, ciudad, username, password, admin }: IUser) {
    const usersRepository = getCustomRepository(UsersRepository);

    if (admin) {
      admin = true;
    } else {
      admin = false;
    };

    const user = await usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ name, email, telefono, provincia, ciudad, username, password, admin })
      .where("id = :id", { id })
      .execute();

    return user;

  }
}

export { UserService };
export const userService = new UserService()