import React, { useState } from 'react'
import { Footer } from '@/components/Footer'
import { Title } from '@/components/course/Title'
import { Quiz } from '@/components/course/Quiz'
import { Summary } from '@/components/course/Summary'
import { Banner } from '@/components/course/Banner'
import Head from 'next/head'
import { getLesson, initPocketBase } from '@/services/pocketbase'
import { trpc } from '@/utils/trpc'
import { Layout } from '@/components/dashboard/Layout'
import { safeStringify } from '@/utils/helper'

function Content({ course }) {
  const [showSummary, setShowSummay] = useState(false)
  return (
    <div className="bg-white">
      <Title course={course} />
      <Quiz
        questions={course.questions || []}
        onComplete={() => setShowSummay(true)}
      />
      {showSummary && <Summary summary={course.summary || ''} />}
      <Footer className="bg-white pt-24" />
    </div>
  )
}

function CoursePage({ course, currentUser }) {
  return (
    !!course && (
      <>
        <Head>
          <title>LessonBuilder - {course.title}</title>
          <meta name="description" content={course.summary} />
          <meta name="og:title" content={course.title} />
          <meta name="og:description" content={course.summary} />
          <meta name="og:image" content={course.image?.url} />
        </Head>
        {currentUser ? (
          <Layout currentUser={currentUser}>
            <Content course={course} />
          </Layout>
        ) : (
          <>
            <Banner />
            <Content course={course} />
          </>
        )}
      </>
    )
  )
}

export async function getServerSideProps({ query, req, res }) {
  const pb = await initPocketBase(req, res)
  const course = await getLesson(pb, query.id)

  if (!course) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      course: safeStringify(course),
      currentUser: pb.authStore.isValid
        ? safeStringify(pb.authStore.model)
        : null,
    },
  }
}

export default CoursePage
