import React from 'react'
import { Container } from '../Container'

export function LoadingScreen() {
  return (
    <Container className="pt-20 pb-16 lg:pt-32">
      <div className="mt-24 mb-6 h-6 w-24 bg-slate-300"></div>
      <div className="mb-12 h-16 w-full bg-slate-300"></div>
      <div className="my-10 h-96 w-full bg-slate-200"></div>
      <div className="grid grid-cols-1 gap-2">
        <div className="h-6 w-full bg-slate-300"></div>
        <div className="h-6 w-full bg-slate-300"></div>
        <div className="h-6 w-[50%] bg-slate-300"></div>
      </div>
    </Container>
  )
}
