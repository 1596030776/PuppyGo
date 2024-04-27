/** 帖子相关信息 */
export type PostInfo = {
  id: number
  userId: number
  nickname: string
  avatar: string
  imageUrl: string
  title: string
  content: string
  createTime: string
}

/** 创建帖子表单 */
export type CreatePostInfo = {
  userId: number
  nickname: string
  avatar: string
  imageUrl: string
  title: string
  content: string
}

/**帖子列表 */
export type PostList = Array<Post>


