import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sync1743413554088 implements MigrationInterface {
  name = 'Sync1743413554088';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "username"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "username" character varying(20) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "email"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "email" character varying(255) NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "email"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "email" character varying NOT NULL
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP COLUMN "username"
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD "username" character varying NOT NULL
        `);
  }
}
