import { AppError } from './AppError'

export class MaxNumberOfCheckInsError extends AppError {
  constructor() {
    super({
      message: 'Max number of check-ins reached',
      statusCode: 403
    })
  }
}
