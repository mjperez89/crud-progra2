import { MigrationInterface, QueryRunner } from "typeorm";
import * as fs from "fs";
import * as readline from "readline";
import * as path from "path";

export class SeedPatients1659000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Define file path
    const filePath = path.resolve(__dirname, "../paciente.jsonl");

    // Read the file line by line
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    for await (const line of rl) {
      // Parse each line as a JSON object
      const patient = JSON.parse(line);

      // Insert into the database
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
    // Rollback: Delete all inserted rows
    await queryRunner.query(`DELETE FROM paciente`);
  }
}
