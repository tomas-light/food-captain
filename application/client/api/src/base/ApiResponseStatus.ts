export const enum ApiResponseStatus {
  Unknown = 0,

  Ok = 200,
  Created = 201,
  NoContent = 204,

  BadRequest = 400,
  UnAuthorized = 401,
  NotFound = 404,
  RequestTimeout = 408,

  InternalServerError = 500,
}
