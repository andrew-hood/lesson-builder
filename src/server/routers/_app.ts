import { z } from 'zod'
import { procedure, router } from '../trpc'
import { getRandomImage } from '@/services/unsplash'
import { getContentFromAI } from '@/services/openai'
import { Course } from '@/utils/types'
import PocketBase from 'pocketbase'
import { createLesson, getLesson, getLessons } from '@/services/pocketbase'

export const appRouter = router({
  currentUser: procedure.query(async ({ ctx }) => {
    const pb: PocketBase = (ctx as any).pb
    return pb.authStore.model
  }),
  getLesson: procedure
    .input(
      z.object({
        id: z.string().length(15),
      })
    )
    .query(async ({ input, ctx }) => {
      if (input.id === '') {
        return null
      }
      const pb: PocketBase = (ctx as any).pb
      return getLesson(pb, input.id)
    }),
  getLessons: procedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const pb: PocketBase = (ctx as any).pb
      const items = await getLessons(
        pb,
        input.cursor || 1,
        input.limit,
        `user.id = '${pb.authStore.model?.id}'`
      )
      return {
        items,
        nextCursor: input.cursor ? input.cursor + 1 : 2,
      }
    }),
  createLesson: procedure
    .input(
      z.object({
        topic: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const [content, image] = await Promise.all([
        getContentFromAI(input.topic),
        getRandomImage(input.topic),
      ])

      const course = {
        topic: input.topic,
        title: `${input.topic}`, // not sure if this should change
        image,
        ...content,
      } as Course

      const pb: PocketBase = (ctx as any).pb
      return createLesson(pb, course)
    }),
})

export type AppRouter = typeof appRouter
