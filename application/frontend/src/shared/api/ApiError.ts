export class ApiError extends Error {
  status?: number;
  errors?: { [key: string]: string };

  constructor(error: {
    message?: string;
    status?: number;
    errors?: { [key: string]: string };
  }) {
    super(error.message);
    this.status = error.status;
    this.errors = error.errors;
  }
}
