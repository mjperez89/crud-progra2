import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, JoinColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Categorias } from "./Category";

@Entity("paciente")
class Patient {

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;
  
  @Column()
  email: string;
  
  @Column()
  telefono: string;
  
  @Column()
  dni: string;
  
  @Column()
  direccion: string;

  @Column()
  provincia: string;

  @Column()
  ciudad: string;

  @Column()
  id_category: string

  @ManyToOne(() => Categorias, categoria => categoria.patient)
  @JoinColumn({ name: 'id_category' })
  category: Categorias

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Patient };