import type { PostInfo, PostList } from '@/types/post'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义 Store
export const usePostStore = defineStore(
  'post',
  () => {
    const postInfo = ref<PostInfo>()
    const postList = ref<PostList>()

    const setPostListInfo = (val: PostList) => {
      postList.value = val
    }

    const clearPostListInfo = () => {
      postList.value = undefined
    }

    const setPostInfo = (val: PostInfo) => {
      postInfo.value = val
    }

    const clearPostInfo = () => {
      postInfo.value = undefined
    }

    return {
      postInfo,
      postList,
      setPostListInfo,
      clearPostListInfo,
      setPostInfo,
      clearPostInfo
    }
  },
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
