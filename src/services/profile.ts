import type { ProfileDetail } from '@/types/member'
import { http } from '@/utils/http'
import type { ProfileParams } from '@/types/member'

/**
 * 获取个人信息
 * /member/profile
 * /user/profile
 */
export const getMemberProfileAPI = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/user/profile',
  })
}

/**
 * 修改个人信息
 * @param data 请求体参数
 * /member/profile
 * /user/profile
 */
export const putMemberProfileAPI = (data: ProfileParams) => {
  return http<ProfileDetail>({
    method: 'PUT',
    url: '/user/profile',
    data,
  })
}
