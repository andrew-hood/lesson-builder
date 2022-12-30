import React from 'react'
import { Container } from '../Container'
import { Course } from '@/utils/types'
import { Avatar } from './Avatar'

interface Props {
  course: Course
}

export function Title({ course }: Props) {
  return (
    <Container className="pt-20 pb-16 lg:pt-28">
      <div className="row flex justify-between text-slate-600">
        <div>{new Date(course?.updated || '').toDateString()}</div>
      </div>
      <h1 className="mx-auto mb-10 pt-3 pb-2 font-display text-4xl font-medium tracking-tight text-slate-800 sm:text-7xl">
        {course.title}
      </h1>
      <Avatar {...course.expand?.user} />
      {!!course.image?.url && (
        <img
          src={course.image?.url}
          className="mt-10 h-96 w-full bg-slate-200 object-cover"
          alt={course.title}
        />
      )}
      <p className="mx-auto whitespace-pre-line text-lg tracking-tight text-slate-700">
        {course.introduction}
      </p>
    </Container>
  )
}
