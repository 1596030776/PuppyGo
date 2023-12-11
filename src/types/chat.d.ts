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
