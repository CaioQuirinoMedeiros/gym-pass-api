import { AppError } from './AppError'

export class InvalidCredentialsError extends AppError {
  constructor() {
    super({
      message: 'Invalid credentials',
      statusCode: 401
    })
  }
}
