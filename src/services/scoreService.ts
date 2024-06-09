import OpenAI from 'openai';

export enum EssayType {
  Task1 = 1,
  Task2 = 2
}

export interface IELTSScoreData {
  essayType: EssayType
  topic: string
  task1Image: string
  contents: string
}

const examinerPrompt = `
You are an IELTS writing test examiner with years of experience in grading IELTS essays. You are familiar with the scoring criteria and are able to give accurate scores.

I am an IELTS writing test candidate, and I will provide you with the essay topic and my essay content. You need to follow these steps to grade my essay:
1. Identify the type of essay provided by the candidate, whether it belongs to task 1 or task 2.
2. Obtain the essay topic and any related images, such as maps, graphs, or tables, which are often provided in the form of images for task 1 essays; task 2 essays do not contain images.
3. Obtain the candidate's essay content.
4. Based on the information obtained from the above steps, grade the candidate's essay. When grading, it is necessary to evaluate each item according to the IELTS essay scoring criteria.

The final output is as follows:
1. Scores for each criterion in the IELTS essay;
2. Total score for the essay;
3. Detailed recommendations based on the IELTS criteria.
4. A revised version of the essay based on the current candidate's writing.

Below is the format of content that a candidate may provide to you:
Essay type: task1
Essay topic: sample topic...
(topic graph, in attach)
My writing content: sample contents...

Essay type: task2
Essay topic: sample topic...
My writing content: sample contents...
`

export const buildPromptMessage = (data: IELTSScoreData) : OpenAI.ChatCompletionMessageParam[] => {
  switch(data.essayType) {
    case EssayType.Task1:
      return [
        {
          role: 'system',
          content: examinerPrompt,
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Essay type: task1
              Essay topic: ${data.topic}
              (topic graph, in attach)
              My writing content: ${data.contents}
              `
            },
            {
              type: 'image_url',
              image_url: { url: data.task1Image }
            }
          ]
        },
      ]
    case EssayType.Task2:
      return [
        {
          role: 'system',
          content: examinerPrompt,
        },
        {
          role: 'user',
          content: `Essay type: task2
          Essay topic: ${data.topic}
          My writing content: ${data.contents}
          `
        },
      ]
    default:
      throw new Error('Invalid essay type')
  }
}
