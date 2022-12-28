import { z } from 'zod'
import { procedure, router } from '../trpc'
import { getRandomImage } from '@/services/unsplash'
import { getContentFromAI } from '@/services/openai'
import { Course } from '@/utils/types'
import { createLesson, getLesson } from '@/services/pocketbase'

export const appRouter = router({
  getLesson: procedure
    .input(
      z.object({
        id: z.string().length(15),
      })
    )
    .query(async ({ input }) => {
      if (input.id === '') {
        return null
      }

      return getLesson(input.id)
    }),
  createLesson: procedure
    .input(
      z.object({
        topic: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const [content, image] = await Promise.all([
        getContentFromAI(input.topic),
        getRandomImage(input.topic),
      ])

      const course = {
        topic: input.topic,
        title: `${input.topic}`, // not sure if this should change
        author: {
          name: 'Anonymous',
          avatar: '',
        },
        image,
        ...content,
      } as Course

      return createLesson(course)
    }),
})

export type AppRouter = typeof appRouter
