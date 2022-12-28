import { Question } from '@/utils/types'
import { Configuration, OpenAIApi } from 'openai'

interface Result {
  introduction: string
  questions: Question[]
  summary: string
}

export const getContentFromAI = async (topic: string): Promise<Result> => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  })
  const openai = new OpenAIApi(configuration)

  const result: Result = {
    introduction: '',
    questions: [],
    summary: '',
  }

  try {
    const { data: intro } = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `write two paragraphs explaining the concept of: ${topic}`,
      temperature: 0.4,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    result.introduction = intro.choices[0].text || ''

    const { data: quiz } = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `create a quiz as a json object with the following stucture: [{"question": string, "options": string[], "answer": string}], quiz should be based on the concept of: ${topic}`,
      temperature: 0.4,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })

    const matches = quiz.choices[0].text
      ?.replaceAll('\\n', '')
      .match(/\{(?:[^{}]|(\{(?:[^{}]|())*\}))*\}/)
    const questions = JSON.parse(matches?.input?.replaceAll('\\n', '') || '[]')
    result.questions = questions || []

    const { data: summary } = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `write a single-sentence summary and an open-ended question on the concept of: ${topic}`,
      temperature: 0.4,
      max_tokens: 128,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    result.summary = summary.choices[0].text || ''
  } catch (err) {
    console.error(err)
  }

  return result
}
