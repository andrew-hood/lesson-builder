import { Course } from '@/utils/types'
import PocketBase from 'pocketbase'

export const getLesson = async (id: string) => {
  const pb = new PocketBase('https://go1-store.fly.dev')

  try {
    const record = await pb.collection('lessons').getOne<Course>(id)
    return record
  } catch (err) {
    console.error(err)
    return null
  }
}

export const createLesson = async (course: Course) => {
  const pb = new PocketBase('https://go1-store.fly.dev')

  try {
    const authData = await pb.admins.authWithPassword(
      process.env.POCKETBASE_USERNAME || '',
      process.env.POCKETBASE_PASSWORD || ''
    )

    await pb.collection('lessons').create({
      id: course.id,
      topic: course.topic,
      title: course.title,
      image: JSON.stringify(course.image),
      author: JSON.stringify(course.author),
      introduction: course.introduction,
      questions: JSON.stringify(course.questions),
      summary: course.summary,
    })
  } catch (err) {
    console.error(err.data)
  }
}
