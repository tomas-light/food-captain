import { QueryConfig } from 'pg';
import { keyOf, MakePropertiesOptional } from '../../utils';
import { UserEntity, UserRoleEntity } from '../../entities';
import { UserTable, UserWithRoleEntity } from '../../tables/UserTable';
import { PgTableBase } from '../base';
import { PgUserRole } from './PgUserRole';

export class PgUser extends PgTableBase<UserEntity> implements UserTable {
  protected tableName = 'user';
  static get table() {
    return `${this.schema}.user`;
  }

  byIdsAsync = async (ids: number[]): Promise<UserEntity[]> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.table} 
        WHERE ${keyOf<UserEntity>('id')} in ($1);
      `,
      values: ids,
    };

    const queryResult = await this.query<UserEntity>(queryConfig);
    return queryResult?.rows ?? [];
  };

  allWithRoleAsync = async (): Promise<UserWithRoleEntity[]> => {
    const queryResult = await this.query<UserWithRoleEntity>(`
      SELECT _user.*, _user_role.${keyOf<UserRoleEntity>('role_id')} 
      FROM ${this.table} _user 
      LEFT JOIN ${PgUserRole.table} _user_role on _user.${keyOf<UserEntity>(
      'id'
    )} = _user_role.${keyOf<UserRoleEntity>('user_id')};
    `);
    return queryResult?.rows ?? [];
  };

  byIdWithRoleAsync = async (
    id: number
  ): Promise<UserWithRoleEntity | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        SELECT _user.*, _user_role.${keyOf<UserRoleEntity>('role_id')} 
        FROM ${this.table} _user 
        LEFT JOIN ${PgUserRole.table} _user_role on _user.${keyOf<UserEntity>(
        'id'
      )} = _user_role.${keyOf<UserRoleEntity>('user_id')} 
        WHERE _user.${keyOf<UserEntity>('id')} = $1;
      `,
      values: [id],
    };

    const queryResult = await this.query<UserWithRoleEntity>(queryConfig);
    return queryResult?.rows[0];
  };

  insertAsync = async (
    entity: Omit<UserEntity, 'id'>
  ): Promise<number | undefined> => {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.table} (
          ${keyOf<UserEntity>('name')}, 
          ${keyOf<UserEntity>('email')}, 
          ${keyOf<UserEntity>('login')}
        ) 
        VALUES($1, $2, $3) RETURNING ${keyOf<UserEntity>('id')};
      `,
      values: [entity.name, entity.email, entity.login],
    };

    const queryResult = await this.query<UserEntity>(queryConfig);
    return queryResult?.rows[0]?.id;
  };

  updateAsync = async (
    entity: MakePropertiesOptional<UserEntity, 'name' | 'email' | 'login'>
  ): Promise<UserEntity | undefined> => {
    const queryConfig = this.makeUpdateQueryConfig(entity);
    if (!queryConfig) {
      return undefined;
    }

    await this.query<UserEntity>(queryConfig);
    return this.byIdWithRoleAsync(entity.id);
  };
}
