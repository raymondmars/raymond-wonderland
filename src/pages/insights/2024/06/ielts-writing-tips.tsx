import type { InferGetServerSidePropsType } from 'next'

import {remark} from 'remark'
import remarkHtml from 'remark-html'
import remarkParse from 'remark-parse'

import styles from '../../index.module.css'
import { withMetadata } from '@/app/components/Utils'


const metadata = {
  title: "A complete guide to IELTS writing skills: practical strategies to improve your Task 1 and Task 2 scores",
  description: "Learn how to get a high score in the IELTS writing test! This guide provides detailed writing tips and strategies for Task 1 and Task 2, including structure, language use, time management, and more, to help you prepare for the test with ease."
}

export async function getServerSideProps() {
  const markdown = `
# IELTS Writing Tips

## Introduction

The IELTS Academic Writing test is a crucial component of the IELTS exam, lasting for 60 minutes and comprising two tasks. Task 1 requires candidates to describe visual information in at least 150 words, while Task 2 demands a minimum of 250 words to discuss an essay topic. Both tasks test the candidate's ability to present, organize, and elaborate ideas in a coherent and cohesive manner, while employing a range of vocabulary and grammatical structures.

## Task 1: Key Strategies and Tips

### Understanding the Task

In Task 1, candidates are asked to describe the main features of a diagram, which could be a bar chart, line graph, pie chart, table, map, or process diagram. The description should focus on the significant trends, comparisons, and changes over time. It is essential to avoid explaining why these trends occur, as this is the focus of Task 2 essays  .

### Effective Sentence Structures

Using varied sentence structures is critical to achieving a high score in Task 1. Some effective structures include:

1. **Position Statements**:
   - "The price of gas stood at $2.75 per gallon."
   - "In 2005, the sugar export accounted for about 10% of total exports."

2. **Movement Statements**:
   - "There was a decrease in the price of gas."
   - "The export of sugar increased."

3. **Time Phrases**:
   - "From 1990 to 1995"
   - "During a period of 10 years"

4. **Connecting Sentences**:
   - "CD sales increased steadily from 2005 until 2010, before falling slightly in the following year."
   - "After increasing steadily from 2005 until 2010, CD sales fell slightly in the following year."

5. **Vocabulary Variations**:
   - "There was a slight fall in CD sales in 2010."
   - "2010 saw a slight fall in CD sales."
   - "CD sales experienced a slight fall in 2010."

6. **Giving Evidence (Data)**:
   - "CD sales increased slightly from 52 million units in 2010 to 70 million the following year."
   - "During the period from 1990 to 1995, there was a decrease in gas prices from $2.70 to $2.75 per gallon."

These structures help in making the writing more interesting and can significantly improve the band score  .

### Organizing the Report

A well-organized report in Task 1 should include an introduction, an overview, and two or three body paragraphs:

1. **Introduction**: Paraphrase the summary provided in the question.
2. **Overview**: Highlight the main trends and significant points. Use expressions like "The graph shows," "It is clear from the graph," or "As can be seen from the graph."
3. **Body Paragraphs**: Organize the details logically, focusing on key features and trends. Compare and contrast where relevant.

Skipping lines between paragraphs can make the writing neater and easier to follow, which is crucial for creating a positive impression on the examiner  .

### Common Mistakes to Avoid

1. **Adverb vs. Adjective**: Use "a slight increase" instead of "a slightly increase."
2. **Copying the Summary**: Paraphrase effectively to avoid repetition.
3. **Misusing Words or Phrases**: Ensure accurate use of vocabulary (e.g., "sales decreased" instead of "sales reduced").
4. **Subject-Verb Agreement**: Pay attention to grammatical rules (e.g., "He plays" not "He play").
5. **Correct Verb Tenses**: Use the appropriate tense, predominantly the present tense, unless otherwise indicated .

## Task 2: Key Strategies and Tips

### Understanding the Task

Task 2 requires candidates to write an essay on a given topic. The essay should present a clear argument, supported by relevant examples and evidence. It is essential to organize the essay logically, with clear paragraphs and a coherent flow of ideas.

### Essay Types

The four most common types of essays in Task 2 are:

1. **Argument (Evidence-Led)**:
   - Present arguments from both sides before concluding with a balanced view.
   - Introduction: General statement about the topic.
   - Body Paragraphs: Present arguments and evidence from both perspectives.
   - Conclusion: Summarize and give a balanced view.

2. **Thesis-Led**:
   - Present a clear opinion and support it throughout the essay.
   - Introduction: State your opinion clearly.
   - Body Paragraphs: Provide supporting arguments and evidence.
   - Conclusion: Summarize your opinion and main points.

3. **Problem and Solution**:
   - Identify a problem and propose solutions.
   - Introduction: Describe the problem.
   - Body Paragraphs: Discuss solutions and their effectiveness.
   - Conclusion: Summarize the problem and solutions.

4. **Two-Part Questions**:
   - Answer both parts of the question in a structured manner.
   - Introduction: Paraphrase the question.
   - Body Paragraphs: Address each part of the question separately.
   - Conclusion: Summarize the main points   .

### Time Management

Managing time effectively is crucial in Task 2. A recommended approach is:

1. **Planning Stage (10 minutes)**:
   - Read the question carefully.
   - Decide on your overall opinion.
   - Note down ideas and evidence.

2. **Writing Stage (30 minutes)**:
   - Write the introduction (5 minutes).
   - Write the first body paragraph (10 minutes).
   - Write the second body paragraph (10 minutes).
   - Write the conclusion (5 minutes).

3. **Checking Stage (5 minutes)**:
   - Read through your writing.
   - Look for mistakes and correct them  .

### Common Mistakes to Avoid

1. **Informal Language**: Use academic language and avoid colloquial expressions.
2. **Question Marks**: Do not ask questions in your essay; instead, state facts.
3. **Exclamation Points**: Avoid using exclamation points.
4. **Overly Long Essays**: Keep your essay concise and within the word limit to avoid making grammar mistakes.
5. **Linking Phrases**: Use appropriate linking phrases to enhance coherence (e.g., "Furthermore," "However," "In addition")  .

## Conclusion

Achieving a high score in the IELTS Writing test requires a clear understanding of the task requirements, effective use of sentence structures, and careful organization of information. By avoiding common mistakes and managing time efficiently, candidates can improve their writing skills and perform well in both Task 1 and Task 2. Practice regularly, read extensively, and apply these strategies to enhance your IELTS writing performance.
`

  const result = await remark()
    .use(remarkParse)
    .use(remarkHtml)
    .process(markdown)
  const content = String(result)

  return {
    props: {
      content,
    },
  }
}

function Home({ content }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return <div className={styles.post} dangerouslySetInnerHTML={{ __html: content }} />
}

export default withMetadata(metadata)(Home)
