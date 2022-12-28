import React from 'react'
import { Container } from '../Container'

interface Props {
  summary: string
}

export function Summary({ summary }: Props) {
  return (
    <Container className="py-20 text-lg tracking-tight text-slate-700 lg:py-28">
      <h3 className="mb-2 font-bold">In summary</h3>
      <p>{summary}</p>
    </Container>
  )
}
