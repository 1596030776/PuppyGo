import type { PetInfo, PetInfoList, list } from '@/types/pet'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const usePetStore = defineStore(
  'pet',
  () => {
    //宠物信息
    const petsInfo = ref<PetInfoList>()
    const curPet = ref<PetInfo>({} as PetInfo)
    const newsList = ref<list>()

    const setPetsInfo = (val: PetInfoList) => {
      petsInfo.value = val
    }

    const clearPetsInfo = () => {
      petsInfo.value = undefined
    }

    // 记得 return
    return {
      petsInfo,
      curPet,
      newsList,
      setPetsInfo,
      clearPetsInfo,
    }
  },
  // TODO: 持久化
  {
    persist: {
      // 调整为兼容多端的API
      storage: {
        setItem(key, value) {
          uni.setStorageSync(key, value)
        },
        getItem(key) {
          return uni.getStorageSync(key)
        },
      },
    },
  },
)
