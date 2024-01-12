'use server'

import { kv } from '@vercel/kv'

export interface Comment {
  id: string
  nickname: string
  content: string
  email: string | null
  createdAt: number
}

const kvKey = (key: string) => `kvdis_comment_${key}`

export const getCommentListAction = async (key: string): Promise<Comment[]> => {
  return (await kv.get(kvKey(key))) || []
}

export const newCommentAction = async (key: string, comment: Comment): Promise<Comment[]> => {
  const list = await getCommentListAction(key)
  list.unshift(comment)
  await kv.set(kvKey(key), list)
  return list
}

export const deleteCommentAction = async (key: string, id: string): Promise<Comment[]> => {
  const list = await getCommentListAction(key)
  list.splice(list.findIndex((item) => item.id === id), 1)
  await kv.set(kvKey(key), list)
  return list
}
