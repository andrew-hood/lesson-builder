import React from 'react'
import PocketBase from 'pocketbase'
import { Header } from '@/components/Header'
import { Container } from '@/components/Container'
import Link from 'next/link'
import { Footer } from '@/components/Footer'
import { getLessons, initPocketBase } from '@/services/pocketbase'

interface Props {
  items: {
    id: string
    title: string
    image: string
  }[]
}

function CoursesPage({ items = [] }: Props) {
  return (
    <>
      <Header />
      <section
        id="testimonials"
        aria-label="What our customers are saying"
        className="bg-slate-50 py-20 sm:py-28"
      >
        <Container>
          <div className="mx-auto max-w-2xl md:text-center">
            <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
              Take a look at what&apos;s been generated with AI
            </h2>
            <p className="mt-4 text-lg tracking-tight text-slate-700">
              Get inspired by the hundreds of existing lessons
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
          >
            {items.map((item, index) => (
              <li key={index}>
                <Link href={`/courses/${item.id}`}>
                  <div className="relative overflow-hidden rounded-2xl bg-white shadow-md shadow-slate-900/10 transition-shadow hover:shadow-2xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-48 w-full bg-slate-200 object-cover"
                    />
                    <h4 className="relative z-10 p-4 font-medium tracking-tight text-slate-900">
                      {item.title}
                    </h4>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=120'
  )

  const pb = await initPocketBase(req, res)
  const results = await getLessons(pb, 1, 50, `published = true`)

  return {
    props: {
      items: results?.items.map((item) => ({
        id: item.id,
        image: item.image?.url,
        title: item.title,
      })),
    },
  }
}

export default CoursesPage
