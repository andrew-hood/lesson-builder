import { Course } from '@/utils/types'
import PocketBase from 'pocketbase'

const POCKETBASE_URL = 'https://go1-store.fly.dev'

// you can place this helper in a separate file so that it can be reused
export async function initPocketBase(req, res) {
  const pb = new PocketBase(POCKETBASE_URL)

  // load the store data from the request cookie string
  pb.authStore.loadFromCookie(req?.headers?.cookie || '')

  // send back the default 'pb_auth' cookie to the client with the latest store state
  pb.authStore.onChange(() => {
    res?.setHeader('set-cookie', pb.authStore.exportToCookie())
  })

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection('users').authRefresh())
  } catch (_) {
    // clear the auth store on failed refresh
    pb.authStore.clear()
  }
  return pb
}

export const getLesson = async (pb: PocketBase, id: string) => {
  try {
    return pb.collection('lessons').getOne<Course>(id, { expand: 'user' })
  } catch (err) {
    console.error(err)
  }
  return null
}

export const getLessons = async (
  pb: PocketBase,
  page: number = 1,
  pageSize = 10,
  filter = ''
) => {
  try {
    return pb.collection('lessons').getList<Course>(page, pageSize, {
      filter,
    })
  } catch (err) {
    console.error(err)
  }
  return null
}

export const createLesson = async (pb: PocketBase, course: Course) => {
  try {
    const user = await pb
      .collection('users')
      .update(pb.authStore.model?.id as string, {
        available_lessons: pb.authStore.model?.available_lessons - 1,
      })
    pb.authStore.save(pb.authStore.token, user)

    return pb.collection('lessons').create<Course>({
      id: course.id,
      topic: course.topic,
      title: course.title,
      image: JSON.stringify(course.image),
      introduction: course.introduction,
      questions: JSON.stringify(course.questions),
      summary: course.summary,
      user: pb.authStore.model?.id,
    })
  } catch (err) {
    console.error(err.data)
  }
  return null
}
