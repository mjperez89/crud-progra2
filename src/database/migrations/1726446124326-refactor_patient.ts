import {MigrationInterface, QueryRunner} from "typeorm";

export class refactorPatient1726446124326 implements MigrationInterface {
    name = 'refactorPatient1726446124326'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "paciente" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "dni" varchar NOT NULL, "direccion" varchar NOT NULL, "provincia" varchar NOT NULL, "ciudad" varchar NOT NULL, "id_category" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "provincia" varchar NOT NULL, "ciudad" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_paciente" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "dni" varchar NOT NULL, "direccion" varchar NOT NULL, "provincia" varchar NOT NULL, "ciudad" varchar NOT NULL, "id_category" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_9c6704e3a72516c69223f2d770b" FOREIGN KEY ("id_category") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_paciente"("id", "name", "email", "telefono", "dni", "direccion", "provincia", "ciudad", "id_category", "created_at", "updated_at") SELECT "id", "name", "email", "telefono", "dni", "direccion", "provincia", "ciudad", "id_category", "created_at", "updated_at" FROM "paciente"`);
        await queryRunner.query(`DROP TABLE "paciente"`);
        await queryRunner.query(`ALTER TABLE "temporary_paciente" RENAME TO "paciente"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "paciente" RENAME TO "temporary_paciente"`);
        await queryRunner.query(`CREATE TABLE "paciente" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "dni" varchar NOT NULL, "direccion" varchar NOT NULL, "provincia" varchar NOT NULL, "ciudad" varchar NOT NULL, "id_category" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "paciente"("id", "name", "email", "telefono", "dni", "direccion", "provincia", "ciudad", "id_category", "created_at", "updated_at") SELECT "id", "name", "email", "telefono", "dni", "direccion", "provincia", "ciudad", "id_category", "created_at", "updated_at" FROM "temporary_paciente"`);
        await queryRunner.query(`DROP TABLE "temporary_paciente"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "paciente"`);
    }

}
