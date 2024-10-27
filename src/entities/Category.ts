import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Patient } from "./Patient";

@Entity("category")
class Categorias {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @OneToMany(() => Patient, (patient) => patient.category)
  patient: Patient[]
  
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