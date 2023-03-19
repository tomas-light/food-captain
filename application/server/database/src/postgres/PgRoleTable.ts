import { QueryConfig } from 'pg';
import { RoleEntity } from '../entities';
import { RoleTable } from '../RoleTable';
import { keyOf } from '../utils';
import { PgTableBase } from './base';

export class PgRoleTable extends PgTableBase<RoleEntity> implements RoleTable {
  protected tableName = 'role';

  async insertAsync(
    entity: Omit<RoleEntity, 'id'>
  ): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${keyOf<RoleEntity>('name')} 
        ) 
        VALUES($1) RETURNING ${keyOf<RoleEntity>('id')};
      `,
      values: [entity.name],
    };

    const queryResult = await this.query<RoleEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  }

  async updateAsync(entity: RoleEntity): Promise<RoleEntity | undefined> {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<RoleEntity>(queryConfig);
    return this.byIdAsync(entity.id);
  }
}
