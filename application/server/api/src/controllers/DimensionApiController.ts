import type { Request, Response } from 'express';
import { api, delete_, get, post } from 'mvc-middleware';
import { DimensionEntity } from '@food-captain/database';
import { Logger } from '@food-captain/server-utils';
import { DimensionService } from '../services/DimensionService';
import BaseApiController from './BaseApiController';

@api
export default class DimensionApiController extends BaseApiController {
  constructor(
    private readonly dimensionService: DimensionService,
    logger: Logger,
    request: Request,
    response: Response
  ) {
    super(logger, request, response);
  }

  @get('dimensions')
  async getAllAsync() {
    const dimensions = await this.dimensionService.getAllAsync();
    return this.ok(dimensions);
  }

  @post('dimensions-by-ids')
  async getManyAsync(dimensionIds: DimensionDto['id'][]) {
    const dimensions = await this.dimensionService.getManyAsync(dimensionIds);
    return this.ok(dimensions);
  }

  @get('dimension/:dimensionId')
  async getByIdAsync(dimensionId: string) {
    const id = parseInt(dimensionId, 10);

    if (isNaN(id)) {
      return this.badRequest('Dimension id is invalid');
    }

    const dimension = await this.dimensionService.getByIdAsync(id);
    if (!dimension) {
      return this.notFound('Dimension not found');
    }

    return this.ok(dimension);
  }

  @post('dimension')
  async addAsync(newDimension: NewDimensionDto) {
    const createdDimension = await this.dimensionService.addAsync(newDimension);
    return this.ok(createdDimension);
  }

  @delete_('dimension/:dimensionId')
  async deleteAsync(dimensionId: string) {
    const id = parseInt(dimensionId, 10);

    if (isNaN(id)) {
      return this.badRequest('Dimension id is invalid');
    }

    const removed = await this.dimensionService.deleteByIdAsync(id);
    return this.ok({ removed });
  }
}

export interface DimensionDto extends DimensionEntity {}
export interface NewDimensionDto extends Omit<DimensionDto, 'id'> {}
