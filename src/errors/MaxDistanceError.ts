import { AppError } from './AppError'

export class MaxDistanceError extends AppError {
  constructor() {
    super({
      message: 'You are too far from the gym',
      statusCode: 403
    })
  }
}
