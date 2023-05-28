import { AppError } from './AppError'

export class ResourceNotFoundError extends AppError {
  constructor() {
    super({
      message: 'Resource not found',
      statusCode: 404
    })
  }
}
