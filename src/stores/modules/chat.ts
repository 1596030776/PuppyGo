import type { Fragment } from './../../types/chat.d'
import type { Conservation, Sentence } from '@/types/chat'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const useChatStore = defineStore(
  'member',
  () => {
    // 对话
    const conservation = ref<Conservation>()

    //对话语句列表
    const fragment = ref<Fragment>()
    //当前句子
    const sentence = ref<Sentence>()

    const setConservation = (val: Conservation) => {
      conservation.value = val
    }

    const clearConservation = () => {
      conservation.value = undefined
    }

    // 记得 return
    return {
      conservation,
      fragment,
      clearConservation,
      setConservation,
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
