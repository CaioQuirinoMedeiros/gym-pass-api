import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  PORT: z.coerce.number().default(3333)
})

const envParseReturn = envSchema.safeParse(process.env)

if (envParseReturn.success === false) {
  console.error('Invalid environment variables!', envParseReturn.error.format())
  throw new Error('Invalid environment variables!')
}

export const env = envParseReturn.data
