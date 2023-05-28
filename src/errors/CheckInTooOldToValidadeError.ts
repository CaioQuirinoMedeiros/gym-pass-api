import { AppError } from './AppError'

export class CheckInTooOldToValidadeError extends AppError {
  constructor() {
    super({
      message: 'Check-in is to old to be validated',
      statusCode: 403
    })
  }
}
