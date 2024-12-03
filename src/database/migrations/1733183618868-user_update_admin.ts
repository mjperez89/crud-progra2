import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class userUpdateAdmin1733183618868 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "admin",
            type: "boolean",
            default: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "admin");
    }

}
