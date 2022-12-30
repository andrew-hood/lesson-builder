import React, { useState } from 'react'
import { Button } from '../Button'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'

export function Generator({ currentUser }) {
  const { push } = useRouter()
  const [topic, setTopic] = useState('')
  const mutation = trpc.createLesson.useMutation()

  const handleCreateLesson = async () => {
    if (topic === '') return

    const course = await mutation.mutateAsync({ topic })
    push(`/courses/${course?.id}`)
  }

  return (
    <>
      <div className="items-center sm:mx-auto sm:flex">
        <div className="min-w-0 flex-1">
          <label htmlFor="input-topic" className="sr-only">
            Topic
          </label>
          <input
            id="input-topic"
            type="text"
            className={clsx(
              currentUser.available_lessons === 0 ? 'opacity-50' : '',
              'block w-full rounded-4xl border px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600'
            )}
            placeholder="What do you want to learn?"
            onChange={(e) => setTopic(e.target.value as string)}
            disabled={mutation.isLoading || currentUser.available_lessons === 0}
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-3">
          <Button
            className="py-4 px-6"
            onClick={handleCreateLesson}
            disabled={mutation.isLoading || currentUser.available_lessons === 0}
            loading={mutation.isLoading}
          >
            Generate lesson
          </Button>
        </div>
      </div>
      <p className="mt-1 text-sm text-gray-600">
        You have <b>{currentUser.available_lessons || 0}</b> lessons
        remaining.&nbsp;
        <Link
          href="/dashboard/account"
          className="border-b text-blue-600 hover:text-blue-700"
        >
          Upgrade account to increase the limit
        </Link>
      </p>
    </>
  )
}
