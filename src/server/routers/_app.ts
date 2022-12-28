import { z } from 'zod'
import { procedure, router } from '../trpc'
import { getRandomImage } from '@/services/unsplash'
import { getContentFromAI } from '@/services/openai'
import { Course } from '@/utils/types'
import { createLesson, getLesson } from '@/services/pocketbase'

export const appRouter = router({
  generate: procedure
    .input(
      z.object({
        id: z.string(),
        topic: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (input.id === '') {
        return null
      }

      let course = await getLesson(input.id)
      if (course) return course

      course = {
        ...input,
        title: `A quick lesson on ${input.topic}`,
        author: {
          name: 'Anonymous',
          avatar: '',
        },
      } as Course

      const content = await getContentFromAI(input.topic)
      course.introduction = content.introduction
      course.questions = content.questions
      course.summary = content.summary

      const {
        urls: { regular: imageUrl },
      } = await getRandomImage(input.topic)
      course.image = { url: imageUrl, credit: '' }

      // save to db
      await createLesson(course)
      return course
    }),
})

export type AppRouter = typeof appRouter
