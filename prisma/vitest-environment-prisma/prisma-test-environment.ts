import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  setup(global, options) {
    console.log('teste inicio')
    return {
      teardown() {
        console.log('teste fim')
      }
    }
  }
}
