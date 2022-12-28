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

  const generateIntroduction = async () => {
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
      return intro.choices[0].text || ''
    } catch (err) {
      console.error(err)
    }
    return ''
  }

  const generateQuestions = async () => {
    try {
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
      const questions = JSON.parse(
        matches?.input?.replaceAll('\\n', '') || '[]'
      )
      return (questions as Question[]) || []
    } catch (err) {
      console.error(err)
    }
    return []
  }

  const generateSummary = async () => {
    try {
      const { data: summary } = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `write a single-sentence summary and an open-ended question on the concept of: ${topic}`,
        temperature: 0.4,
        max_tokens: 128,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      return summary.choices[0].text || ''
    } catch (err) {
      console.error(err)
    }
    return ''
  }

  const [introduction, questions, summary] = await Promise.all([
    generateIntroduction(),
    generateQuestions(),
    generateSummary(),
  ])
  return { introduction, questions, summary }
}
