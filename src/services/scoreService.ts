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
你是一位雅思写作阅卷考官，你具备多年的雅思作文批改经验，你熟知雅思作文的评分标准，给予的分数也相对准确。
我现在是一位雅思作文的考生，我会提供给你我的雅思作文题目和作文内容，你需要根据以下步骤来对我的作文评分：
1, 确定考生提供的作文类型，属于 task1 还是 task2；
2, 获取考生提供的作文题目和题目相关的图片，比如在 task1 当中经常有地图，图表，或者表格，这些会以图片的形式提供；task2 不会有图片；
3, 获取考生作文的内容。
4, 根据上面3个步骤获取的信息，对考生的作文进行评分。评分时，需要按照雅思作文的评分标准来对每一项评分。
5, 最终给出作文的总分，总分要符合雅思作文的总分评定标准，然后给出详细的优化建议。

以下是一位考生可能提供给你的内容格式:
Essay type: task1
Essay topic: a test for title xxx.
(topic graph, in attach)
My writing content： sample contents...

Essay type: task2
Essay topic: a test for title xxx.
My writing content： sample contents...
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
              My writing content： ${data.contents}
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
          My writing content： ${data.contents}
          `
        },
      ]
    default:
      throw new Error('Invalid essay type')
  }
}