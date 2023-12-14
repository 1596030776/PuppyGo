import type { PetInfoList, list, PetMatter, PetMatterPara, PetMatterList } from '@/types/pet'
import { http } from '@/utils/http'

//获取所有宠物新闻列表信息
export const getPetNewsAPI = () => {
  return http<list>({
    method: 'GET',
    url: '/petNews',
  })
}

//获取所有宠物信息
export const getPetInfoAPI = () => {
  return http<{ pets: PetInfoList }>({
    method: 'GET',
    url: '/pet/pets',
  })
}

//获取宠物清单
export const getPetMattersAPI = (petId: number) => {
  return http<PetMatterList>({
    method: 'GET',
    url: '/petmatters/byPet',
    data: {
      petId,
    },
  })
}

//添加宠物清单
export const postPetMatterAPI = async (petMatterPara: PetMatterPara) => {
  return http({
    method: 'POST',
    url: '/petmatters',
    data: petMatterPara,
  })
}

//根据对话生成事项
export const getPetMatterAdviceAPI = async (fragmentId: string) => {
  return http<PetMatter>({
    method: 'GET',
    url: `/conversation/fragment/advice/${fragmentId}`,
  })
}
