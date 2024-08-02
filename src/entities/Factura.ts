import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { v4 as uuid } from "uuid";
import { Cliente } from "./Cliente";
import { Products } from "./Product";

@Entity("factura")
class Factura {

  @PrimaryColumn()
  id:string;

  @Column()
  num_factura: number;

  @Column()
  tipo_factura: string;

  @Column()
  fecha: Date;

  @Column()
  total: number;
  
  @Column()
  cliente_id: string;

  @ManyToOne(() => Cliente, cliente => cliente.facturas)
  @JoinColumn({ name: 'cliente_id'})
  cliente: Cliente;

  @ManyToMany(() => Products,{
    cascade: true
  })
  @JoinTable()
  productos: Products[]; 

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

export { Factura };