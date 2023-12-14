import { http } from '@/utils/http'
/**
 * 关于聊天的接口
 */
import type { Conservation, Answer } from '@/types/chat'

/**创建对话 */
export const initConservationAPI = (petId: number) => {
  return http<Conservation>({
    method: 'POST',
    url: `/conversation/${petId}`,
  })
}

/**发送语句 */
export const postFragment = (conversationId: number, question: string) => {
  return http<number>({
    method: 'POST',
    url: `/conversation/fragment?conversationId=${conversationId}&question=${question}`,
  })
}

/**获取状态 */
export const getStatue = (fragmentId: number) => {
  return http<string>({
    method: 'GET',
    url: '/conversation/fragment/statue',
    data: {
      fragmentId,
    },
  })
}

// "answer": "string",
// "conversationId": 0,
// "id": 0,
// "imgResult": "string",
// "imgUrl": "string",
// "knowledgeResult": "string",
// "question": "string",
// "statue": "DB_INSERT_FAILED"

/**获取状态 */
export const getAnswer = (fragmentId: number) => {
  return http<Answer>({
    method: 'GET',
    url: `/conversation/fragment/${fragmentId}`,
  })
}
