import React, { useState } from 'react'
import { Button } from './Button'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'

export default function Generator() {
  const { push } = useRouter()
  const [topic, setTopic] = useState('')
  const mutation = trpc.createLesson.useMutation()

  const handleCreateLesson = async () => {
    if (topic === '') return

    const course = await mutation.mutateAsync({ topic })
    push(`/courses/${course?.id}`)
  }

  return (
    <div className="mt-10 items-center sm:mx-auto sm:flex sm:max-w-lg">
      <div className="min-w-0 flex-1">
        <label htmlFor="input-topic" className="sr-only">
          Topic
        </label>
        <input
          id="input-topic"
          type="text"
          className="block w-full rounded-4xl border px-5 py-3 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
          placeholder="What do you want to learn?"
          onChange={(e) => setTopic(e.target.value as string)}
          disabled={mutation.isLoading}
        />
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-3">
        <Button
          className="py-4 px-6"
          onClick={handleCreateLesson}
          disabled={mutation.isLoading}
          loading={mutation.isLoading}
        >
          Try it for free now
        </Button>
      </div>
    </div>
  )
}
