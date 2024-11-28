import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";

export class SeedPatients1659000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Definimos ruta al archivo de base
    const filePath = path.resolve(__dirname, "../paciente.jsonl");

    // Leemos archivo linea por linea
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      // Parseamos cada linea como Json e insertamos
      const patient = JSON.parse(line);

      await queryRunner.query(
        `INSERT INTO paciente (id, name, email, telefono, dni, direccion, provincia, ciudad, id_category, created_at, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          patient.id,
          patient.name,
          patient.email,
          patient.telefono,
          patient.dni,
          patient.direccion,
          patient.provincia,
          patient.ciudad,
          patient.id_category,
          patient.created_at,
          patient.updated_at,
        ]
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    
    await queryRunner.query(`DELETE FROM paciente`);
  }
}
