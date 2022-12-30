import Head from 'next/head'
import { Faqs } from '@/components/landing/Faqs'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/landing/Hero'
import { Pricing } from '@/components/landing/Pricing'
import { PrimaryFeatures } from '@/components/landing/PrimaryFeatures'

export default function Home() {
  return (
    <>
      <Head>
        <title>LessonBuilder - Generate lessons with AI</title>
        <meta name="description" content="" />
      </Head>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
