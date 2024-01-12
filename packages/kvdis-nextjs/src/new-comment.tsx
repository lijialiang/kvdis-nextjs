'use client'

import styles from './new-comment.module.css'
import { useRouter } from 'next/navigation'
import { KeyboardEventHandler, useEffect, useRef, useState, useTransition } from 'react'
import { newCommentAction } from './kv'

export interface NewCommentProps {
  commentsKey: string
}

export default function NewComment({ commentsKey: key }: NewCommentProps) {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contentRef = useRef<HTMLTextAreaElement>(null)
  const [contentRefCursorIndex, setContentCursorIndex] = useState(0)

  const router = useRouter()
  const [, startTransition] = useTransition()

  const newComment = () => {
    if (isSubmitting) {
      return
    }
    setIsSubmitting(true)
    if (!nickname || !content) {
      return
    }

    newCommentAction(key, {
      id: Date.now().toString(),
      nickname,
      email: email ?? '',
      content,
      createdAt: Date.now()
    }).then(() => {
      setNickname('')
      setEmail('')
      setContent('')
      setIsSubmitting(false)
      startTransition(router.refresh)
    })
  }

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.setSelectionRange(contentRefCursorIndex, contentRefCursorIndex)
    }
  }, [contentRefCursorIndex])

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  const handleKeyUp: KeyboardEventHandler = (event) => {
    event.preventDefault()
    if (contentRef.current && event.key === 'Enter') {
      const { selectionStart = 0, selectionEnd = 0 } = contentRef.current
      const newInput = `${content.slice(0, selectionStart)}${'\n'}${content.slice(selectionEnd)}`
      setContent(newInput)
      setContentCursorIndex(selectionStart + 1)
    }
  }

  return (
    <div className={styles.kvdis_new_comment}>
      <p>
        <input
          placeholder="Nickname"
          type="text"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        <input
          placeholder="Email"
          type="text"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </p>

      <p>
        <textarea
          placeholder="Comment"
          value={content}
          ref={contentRef}
          onChange={e => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        ></textarea>
      </p>

      <p>
        <button onClick={() => newComment()}>Submit</button>
      </p>
    </div>
  )
}
