import type { Role } from '@prisma/client'
import { prisma } from '../prisma/client.js'
import type { CreateUserData, UserRepository, UserWithPassword } from './user.repository.js'
import type { PublicUser } from '../types/auth.js'

function toPublicUser(user: {
  id: string
  name: string
  firstName: string
  lastName: string
  email: string
  username: string
  birthDate: Date
  receiveNews: boolean
  role: Role
}): PublicUser {
  return user
}

export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserData): Promise<PublicUser> {
    const user = await prisma.user.create({ data })

    return toPublicUser(user)
  }

  async findByEmail(email: string): Promise<UserWithPassword | null> {
    return prisma.user.findUnique({ where: { email } })
  }

  async findByUsername(username: string): Promise<UserWithPassword | null> {
    return prisma.user.findUnique({ where: { username } })
  }

  async findById(id: string): Promise<PublicUser | null> {
    const user = await prisma.user.findUnique({ where: { id } })

    return user ? toPublicUser(user) : null
  }
}
