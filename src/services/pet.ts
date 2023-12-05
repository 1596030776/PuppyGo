import type { PetInfoList } from '@/types/pet'
import { http } from '@/utils/http'

//获取所有宠物信息
export const getPetInfoAPI = () => {
  return http<{ pets: PetInfoList }>({
    method: 'GET',
    url: '/pet/pets',
  })
}
