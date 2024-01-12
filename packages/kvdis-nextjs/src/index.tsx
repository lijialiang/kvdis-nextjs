import './index.css'
import styles from './index.module.css'
import { getCommentListAction } from './kv'
import NewComment from './new-comment'

export interface KvDisProps {
  commentsKey: string
}

export default async function KvDis({ commentsKey: key }: KvDisProps) {
  const list = await getCommentListAction(key)

  return (
    <div className={styles.kvdis}>
      <div className={styles.kvdis_title}>
        Comment
      </div>

      <NewComment commentsKey={key} />

      <ul>
        {
          list.map((comment) => (
            <li key={comment.id}>
              <p>
                <b>
                  {comment.nickname}
                </b>
                <span>
                  {new Date(comment.createdAt).toISOString()}
                </span>
              </p>
              <section>
                {
                  comment.content.split('\n').map((ic, index) => (
                    <p key={`${comment.createdAt}-${index}`}>
                      { ic }
                    </p>
                  ))
                }
              </section>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
