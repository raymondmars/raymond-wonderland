// /pages/api/ielts/score.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { ServerResponse } from 'http'
import OpenAI from 'openai'

import { EssayType, IELTSScoreData, buildPromptMessage } from '../../../services/scoreService'


if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

if(process.env.OPENAI_PROXY_URL) {
  openai.baseURL = process.env.OPENAI_PROXY_URL
}


const validationAuth = (req: NextApiRequest) => {
  // console.log(req.headers)
  // if(req.headers.authorization !== process.env.AUTHORIZATION) {
  //   return false
  // }
  return true
}

const validationData = (data: IELTSScoreData) => {
  if(data.essayType !== EssayType.Task1 && data.essayType !== EssayType.Task2) {
    return false
  }

  if(data.topic.trim() === '') {
    return false
  }

  if(data.essayType === 1 && data.task1Image.trim() === '') {
    return false
  }

  if(data.contents.trim() === '') {
    return false
  }

  return true
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(req.method === 'POST') {
    if(!validationAuth(req)) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }
    const data = req.body as IELTSScoreData
    if(!validationData(data)) {
      res.status(400).json({ message: 'Bad Request' })
      return
    }
    // test stream response
    // console.log('request data ->', data)
    const examinerPrompt = buildPromptMessage(data)
    // console.log('examiner prompt ->', examinerPrompt)
    const stream = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: examinerPrompt, //[{role: 'user', content: 'give me a react component sample.'}],
      temperature: 0.8,
      stream: true,
    });

    const nodeRes = res as unknown as ServerResponse
    for await (const chunk of stream) {
      const output = chunk.choices[0]?.delta?.content || ''
      // console.log('backend...->', output)
      nodeRes.write(output)
    }
    nodeRes.end()

    res.status(200).json({ message: 'start to score', data })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}
