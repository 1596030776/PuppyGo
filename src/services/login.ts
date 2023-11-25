// src/services/login.ts

import type { LoginResult } from '@/types/member'
import { http } from '@/utils/http'

type LoginParams = {
  code: string
  encryptedData: string
  iv: string
}
/**
 * 小程序登录
 * @param data 请求参数
 */
export const postLoginWxMinAPI = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data,
  })
}

/**
 * 小程序登录_内测版
 * @param username 模拟手机号码
 * /login/wxMin/simple
 * /authenticate/login
 */
export const postLoginWxMinSimpleAPI = (username: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/authenticate/login',
    data: {
      username,
    },
  })
}
