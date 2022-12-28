export interface Question {
  question: string
  options: string[]
  answer: string
}

export interface Course {
  id: string
  topic: string
  title?: string
  image?: {
    url: string
    credit: string
  }
  author: {
    name: string
    avatar: string
  }
  introduction?: string
  questions?: Question[]
  summary?: string
  updated?: string
}
