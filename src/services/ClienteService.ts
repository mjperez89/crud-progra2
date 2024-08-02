import { getCustomRepository } from "typeorm";
import { Cliente } from "../entities/Cliente";
import { ClientesRepository } from "../repositories/ClienteRepository"

interface ICliente {
    id?:string
    name: string;
    email: string;
    telefono: string;
    dni: string;
    direccion: string;
  }

  class ClienteService {

    async create({ name, email, telefono, dni, direccion,  }: ICliente) {
      if (!name || !email || !telefono || !dni || !direccion ) {
        throw new Error("Por favor rellene todos los campos.");
      }
  
      const clientesRepository = getCustomRepository(ClientesRepository);
  
      const dniAlreadyExists = await clientesRepository.findOne({ dni });
  
      if (dniAlreadyExists) {
        throw new Error("El dni de usuario ingresado ya existe");
      }
  
      const emailAlreadyExists = await clientesRepository.findOne({ email });
  
      if (emailAlreadyExists) {
        throw new Error("El mail de usuario ingresado ya existe");
      }
  
      const cliente = clientesRepository.create({ name, email, telefono, dni, direccion, });
  
      await clientesRepository.save(cliente);
  
      return cliente;
  
    }
  
    async delete(id: string) {
      const clienteRepository = getCustomRepository(ClientesRepository);
  
      const cliente = await clienteRepository
        .createQueryBuilder()
        .delete()
        .from(Cliente)
        .where("id = :id", { id })
        .execute();
  
      return cliente;
  
    }
  
    async getData(id: string) {
      const clienteRepository = getCustomRepository(ClientesRepository);
  
      const cliente = await clienteRepository.findOne(id);
  
      return cliente;
    }
  
    async list() {
      const clienteRepository = getCustomRepository(ClientesRepository);
  
      const clientes = await clienteRepository.find();
  
      return clientes;
    }
  
    async search(search: string) {
      if (!search) {
        throw new Error("Por favor rellene todos los campos");
      }
  
      const clienteRepository = getCustomRepository(ClientesRepository);
  
      const cliente = await clienteRepository
        .createQueryBuilder()
        .where("name like :search", { search: `%${search}%` })
        .orWhere("email like :search", { search: `%${search}%` })
        .orWhere("telefono like :search", { search: `%${search}%` })
        .orWhere("dni like :search", { search: `%${search}%` })
        .orWhere("direccion like :search", { search: `%${search}%` })
        .getMany();
  
      return cliente;
  
    }
  
    async update({ id, name, email, telefono, dni, direccion }: ICliente) {
      const clientesRepository = getCustomRepository(ClientesRepository);
  
      const cliente = await clientesRepository
        .createQueryBuilder()
        .update(Cliente)
        .set({ name, email, telefono, dni, direccion })
        .where("id = :id", { id })
        .execute();
  
      return cliente;
  // hola
    }
  }
  
  export { ClienteService };
  export const clienteService = new ClienteService()