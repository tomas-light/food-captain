import { QueryConfig } from 'pg';
import { UserRoleEntity } from '../../entities';
import { UserRoleTable } from '../../tables/UserRoleTable';
import { keyOf } from '../../utils';
import { PgTableBase } from '../base';

export class PgUserRoleTable
  extends PgTableBase<UserRoleEntity>
  implements UserRoleTable
{
  protected tableName = 'user_role';

  // todo: possible redundant
  async getAsync(
    user_id: number,
    role_id: number
  ): Promise<UserRoleEntity | undefined> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<UserRoleEntity>('user_id')} = $1 
        AND ${keyOf<UserRoleEntity>('role_id')} = $2;
      `,
      values: [user_id, role_id],
    };

    const queryResult = await this.query<UserRoleEntity>(queryConfig);
    return queryResult?.rows[0];
  }

  async getByUserIdAsync(user_id: number): Promise<UserRoleEntity[]> {
    const queryConfig: QueryConfig = {
      text: `
        SELECT * 
        FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<UserRoleEntity>('user_id')} = $1;
      `,
      values: [user_id],
    };

    const queryResult = await this.query<UserRoleEntity>(queryConfig);
    return queryResult?.rows ?? [];
  }

  async insertAsync(entity: UserRoleEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        INSERT INTO ${this.schema}.${this.tableName} (
          ${keyOf<UserRoleEntity>('user_id')}, 
          ${keyOf<UserRoleEntity>('role_id')} 
        ) 
        VALUES($1, $2);
      `,
      values: [entity.user_id, entity.role_id],
    };

    const queryResult = await this.query<UserRoleEntity>(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }

  async deleteAsync(entity: UserRoleEntity): Promise<boolean> {
    const queryConfig: QueryConfig = {
      text: `
        DELETE FROM ${this.schema}.${this.tableName} 
        WHERE ${keyOf<UserRoleEntity>('user_id')} = $1 
        AND ${keyOf<UserRoleEntity>('role_id')} = $2;
      `,
      values: [entity.user_id, entity.role_id],
    };

    const queryResult = await this.query(queryConfig);
    return (queryResult?.rowCount ?? 0) > 0;
  }
}
