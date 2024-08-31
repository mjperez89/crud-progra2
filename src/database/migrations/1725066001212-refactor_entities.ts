import {MigrationInterface, QueryRunner} from "typeorm";

export class refactorEntities1725066001212 implements MigrationInterface {
    name = 'refactorEntities1725066001212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "username" varchar NOT NULL, "password" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "provincia" varchar NOT NULL, "ciudad" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "marca" varchar NOT NULL, "precio" integer NOT NULL, "id_category" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "paciente" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "telefono" varchar NOT NULL, "dni" varchar NOT NULL, "direccion" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "temporary_products" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "marca" varchar NOT NULL, "precio" integer NOT NULL, "id_category" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_0633fb8c8bf00bb25890f4b2ae2" FOREIGN KEY ("id_category") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_products"("id", "nombre", "marca", "precio", "id_category", "created_at", "updated_at") SELECT "id", "nombre", "marca", "precio", "id_category", "created_at", "updated_at" FROM "products"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "temporary_products" RENAME TO "products"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" RENAME TO "temporary_products"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" varchar PRIMARY KEY NOT NULL, "nombre" varchar NOT NULL, "marca" varchar NOT NULL, "precio" integer NOT NULL, "id_category" varchar NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "updated_at" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "products"("id", "nombre", "marca", "precio", "id_category", "created_at", "updated_at") SELECT "id", "nombre", "marca", "precio", "id_category", "created_at", "updated_at" FROM "temporary_products"`);
        await queryRunner.query(`DROP TABLE "temporary_products"`);
        await queryRunner.query(`DROP TABLE "paciente"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
