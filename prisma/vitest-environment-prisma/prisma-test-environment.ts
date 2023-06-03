import 'dotenv/config'
import { Environment } from 'vitest'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide DATABASE_URL environment variable')
  }
  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  setup() {
    const databaseSchema = randomUUID()
    process.env.DATABASE_URL = generateDatabaseUrl(databaseSchema)
    execSync('yarn prisma migrate deploy')

    return {
      async teardown() {
        prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${databaseSchema}" CASCADE`
        )
        await prisma.$disconnect()
      }
    }
  }
}
