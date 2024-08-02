import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Products } from "./Product";

@Entity("category")
class Categorias {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @OneToMany(() => Products, (producto) => producto.category)
  productos: Products[]
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Categorias };