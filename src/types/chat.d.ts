/** 对话相关信息 */
export type Sentence = {
  answer: string
  conversationId: number
  id: number
  imgResult: string
  imgUrl: string
  knowledgeResult: string
  question: string
  statue: string
}

/**对话列表 */
export type Fragment = Array<Sentence>

/**交流信息 */
export type Conservation = {
  end: boolean
  fragment: Fragment
  id: number
  name: string
  userId: number
}
/**对话结果 */
export type Answer = {
  answer: string
  conversationId: number
  id: number
  imgResult: string
  imgUrl: string
  knowledgeResult: string
  question: string
  statue: string
}
// "answer": "string",
// "conversationId": 0,
// "id": 0,
// "imgResult": "string",
// "imgUrl": "string",
// "knowledgeResult": "string",
// "question": "string",
// "statue": "DB_INSERT_FAILED"

/** 单条语句问答 */
export type Dialog = {
  botContent: string
  recordId: number
  titleId: number
  userContent: string
  userId: number
}
