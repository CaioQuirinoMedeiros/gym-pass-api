type UserCreateData = {
  name: string
  email: string
  password_hash: string
}

type User = {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date
}

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  create(data: UserCreateData): Promise<User>
}
