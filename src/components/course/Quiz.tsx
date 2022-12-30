import { Question } from '@/utils/types'
import React, { useEffect, useState } from 'react'
import JSConfetti from 'js-confetti'
import { Container } from '../Container'
import { MultipleChoice } from './MultipleChoice'
import { Button } from '../Button'
import clsx from 'clsx'

interface Props {
  questions: Question[]
  onComplete: () => void
}

export function Quiz({ questions, onComplete }: Props) {
  const [answers, setAnswers] = useState<string[] | null>(null)

  useEffect(() => {
    if (answers?.length === questions?.length) {
      onComplete()
      const correctAnswers = answers.filter(
        (answer, index) => questions[index].answer === answer
      )
      if (correctAnswers.length === questions.length) {
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti()
      }
    }
  }, [answers])

  const handleStartQuiz = () => {
    setAnswers([])
    setTimeout(() => {
      scroll(0)
    }, 0)
  }

  const handleOnSelect = (index, value) => {
    if (answers) {
      answers[index] = value
      setAnswers([...answers])
      setTimeout(() => {
        scroll(index + 1)
      }, 0)
    }
  }

  const scroll = (index) => {
    const section = document.querySelector(`#question-${index}`)
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <div className="flex justify-center pb-16">
        <Button
          onClick={handleStartQuiz}
          className={clsx(answers ? 'invisible' : '')}
        >
          Start Quiz
        </Button>
      </div>
      {!!answers && (
        <div className="border-t border-b bg-slate-50">
          <Container className="py-16 lg:py-20">
            <ul
              role="list"
              className="mx-auto grid grid-cols-1 gap-6 sm:gap-20 lg:max-w-none"
            >
              {questions
                .filter((_, index) => answers.length + 1 > index)
                .map(({ question, options, answer }, index) => (
                  <li
                    key={index}
                    id={`question-${index}`}
                    className="relative rounded-lg bg-white p-6 shadow-xl shadow-slate-900/10"
                  >
                    <label className="text-sm font-bold tracking-wide text-slate-900">
                      Question {index + 1}
                    </label>
                    <p className="pb-4 text-lg leading-7 tracking-tight text-slate-900">
                      {question}
                    </p>
                    <MultipleChoice
                      choices={options}
                      answer={answer}
                      onSelect={(value) => handleOnSelect(index, value)}
                    />
                  </li>
                ))}
            </ul>
          </Container>
        </div>
      )}
    </>
  )
}
