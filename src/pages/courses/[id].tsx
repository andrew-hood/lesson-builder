import React, { useState } from 'react'
import { Footer } from '@/components/Footer'
import { Title } from '@/components/course/Title'
import { LoadingScreen } from '@/components/course/LoadingScreen'
import { Quiz } from '@/components/course/Quiz'
import { Summary } from '@/components/course/Summary'
import { Banner } from '@/components/course/Banner'
import { trpc } from '@/utils/trpc'
import { useRouter } from 'next/router'

function CoursePage() {
  const { query } = useRouter()
  const [showSummary, setShowSummay] = useState(false)
  const { data: course } = trpc.generate.useQuery({
    id: (query.id as string) || '',
    topic: (query.topic as string) || '',
  })

  return !query?.id || !course ? (
    <LoadingScreen />
  ) : (
    <>
      <Banner />
      <Title course={course} />
      <Quiz
        questions={course.questions || []}
        onComplete={() => setShowSummay(true)}
      />
      {showSummary && <Summary summary={course.summary || ''} />}
      <Footer className="bg-white pt-24" />
    </>
  )
}

export default CoursePage
