/** 帖子相关信息 */
export type PostInfo = {
  id: number
  publisher_id: number
  publisher_name: string
  publisher_avatar: string
  image: string
  title: string
  content: string
  createTime: string
  likeNum: string
}

/**帖子列表 */
export type PostList = Array<Post>
