import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Factura } from "./Factura";

@Entity("cliente")
class Cliente {

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

  @OneToMany(() => Factura, factura => factura.cliente)
  facturas: Factura[];

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

export { Cliente };