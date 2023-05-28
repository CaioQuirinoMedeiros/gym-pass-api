import { randomUUID } from 'node:crypto'
import { User, UserCreateData, UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findById(userId: string) {
    const user = this.users.find((user) => {
      return user.id === userId
    })

    return user || null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => {
      return user.email === email
    })

    return user || null
  }

  async create(data: UserCreateData): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date()
    }

    this.users.push(user)
    return user
  }
}
