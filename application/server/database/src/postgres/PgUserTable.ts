import { QueryConfig } from 'pg';
import { keyOf, MakePropertiesOptional } from '../utils';
import { UserEntity, UserRoleEntity } from '../entities';
import { UserTable, UserWithRoleEntity } from '../UserTable';
import { PgTableBase } from './base';

export class PgUserTable extends PgTableBase<UserEntity> implements UserTable {
  protected tableName = 'users';

  async byIdsAsync(ids: number[]): Promise<UserEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.tableName} 
        WHERE ${keyOf<UserEntity>('id')} in ($1);
      `,
      values: ids,
    };

    const queryResult = await this.query<UserEntity>(queryConfig);
    return queryResult?.rows ?? [];
  }

  async allWithRoleAsync(): Promise<UserWithRoleEntity[]> {
    const queryResult = await this.query<UserWithRoleEntity>(`
      SELECT _user.*, _ur.${keyOf<UserRoleEntity>('role_id')} 
      FROM ${this.tableName} _user 
      LEFT JOIN user_role _ur on _user.${keyOf<UserEntity>(
        'id'
      )} = _ur.${keyOf<UserRoleEntity>('user_id')};
    `);
    return queryResult?.rows ?? [];
  }

  async byIdWithRoleAsync(id: number): Promise<UserWithRoleEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT _user.*, _ur.${keyOf<UserRoleEntity>('role_id')} 
        FROM ${this.tableName} _user 
        LEFT JOIN user_role _ur on _user.${keyOf<UserEntity>(
          'id'
        )} = _ur.${keyOf<UserRoleEntity>('user_id')} 
        WHERE _user.${keyOf<UserEntity>('id')} = $1;
      `,
      values: [id],
    };

    const queryResult = await this.query<UserWithRoleEntity>(queryConfig);
    return queryResult?.rows[0];
  }

  async insertAsync(
    entity: Omit<UserEntity, 'id'>
  ): Promise<number | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.tableName} (
          ${keyOf<UserEntity>('name')}, 
          ${keyOf<UserEntity>('email')}, 
          ${keyOf<UserEntity>('password')}
        ) 
        VALUES($1, $2, $3) RETURNING ${keyOf<UserEntity>('id')};
      `,
      values: [entity.name, entity.email, entity.password],
    };

    const queryResult = await this.query<UserEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  }

  async updateAsync(
    entity: MakePropertiesOptional<UserEntity, 'name' | 'email' | 'password'>
  ): Promise<UserEntity | undefined> {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<UserEntity>(queryConfig);
    return this.byIdWithRoleAsync(entity.id);
  }

  async deleteAsync(id: number): Promise<boolean> {
    return this.deleteByIdAsync(id);
  }
}
