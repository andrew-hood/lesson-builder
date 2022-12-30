import * as trpcNext from '@trpc/server/adapters/next'
import { appRouter } from '../../../server/routers/_app'
import { initPocketBase } from '@/services/pocketbase'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: async (opts?: trpcNext.CreateNextContextOptions) => {
    const req = opts?.req
    const res = opts?.res

    const pb = await initPocketBase(req, res)
    return {
      pb,
    }
  },
})
