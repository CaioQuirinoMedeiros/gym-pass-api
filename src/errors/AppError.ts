export class AppError extends Error {
  statusCode: number

  constructor({
    statusCode = 500,
    message
  }: {
    name?: string
    statusCode?: number
    message: string
  }) {
    super()
    this.message = message
    this.statusCode = statusCode
  }
}
