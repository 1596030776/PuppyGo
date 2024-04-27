import type { PostInfo, PostList, CreatePostInfo } from '@/types/post'
import { http } from '@/utils/http'

export const createPost = async (postinfo : CreatePostInfo) => {
  return http({
    method: 'POST',
    url: '/posts/publishPost',
    data: postinfo,
  })
}

export const getPostList = async () => {
  return http<PostList>({
    method: 'GET',
    url: '/posts/getAllPosts?pageNum=0&pageSize=10',
  })
}

export const getAllPostsByUserAPI = async (userId:number) => {
  return http<PostList>({
    method: 'GET',
    url: `/posts/getAllPostsByUser?pageNum=0&pageSize=10&userId=${userId}`,
  })
}

export const deletePostByIdAPI = async (postId:number) => {
  return http({
    method: 'DELETE',
    url: `/posts/${postId}`,
  })
}
