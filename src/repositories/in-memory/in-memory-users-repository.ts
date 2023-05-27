import { UsersRepository } from '../users-repository'

type User = {
  id: string
  name: string
  email: string
  password_hash: string
  created_at: Date
}

type UserCreateInput = {
  name: string
  email: string
  password_hash: string
}

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => {
      return user.email === email
    })

    return user || null
  }

  async create(data: UserCreateInput): Promise<User> {
    const user: User = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.users.push(user)
    return user
  }
}
