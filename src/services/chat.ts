import { http } from '@/utils/http'
/**
 * 关于聊天的接口
 */
import type { Conservation } from '@/types/chat'

/**创建对话 */
export const initConservationAPI = () => {
  return http<Conservation>({
    method: 'POST',
    url: '/conversation',
    data: {
      petId: 3,
    },
  })
}

/**发送语句 */
export const postFragment = (conversationId: number, question: string) => {
  return http<number>({
    method: 'POST',
    url: '/conversation/fragment',
    data: {
      conversationId,
      question,
    },
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
