'use server'

import { kv } from '@vercel/kv'

export interface Comment {
  id: string
  nickname: string
  content: string
  email: string | null
  createdAt: number
}

export const getCommentListAction = async (key: string): Promise<Comment[]> => {
  return (await kv.get(key)) || []
}

export const newCommentAction = async (key: string, comment: Comment): Promise<Comment[]> => {
  const list = await getCommentListAction(key)
  list.unshift(comment)
  await kv.set(key, list)
  return list
}

export const deleteCommentAction = async (key: string, id: string): Promise<Comment[]> => {
  const list = await getCommentListAction(key)
  list.splice(list.findIndex((item) => item.id === id), 1)
  await kv.set(key, list)
  return list
}
