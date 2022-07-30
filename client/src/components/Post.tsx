import React, { useRef } from 'react'
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonText,
} from '@ionic/react'
import { deletePost, updatePost } from '../services/api'
import { IPost } from '../types'

const emotions = {
  1: '😂',
  2: '😢',
  3: '😠',
  4: '🥱',
}

interface PostProps {
  post: IPost
  dispatch: React.Dispatch<any>
}

const Post: React.FC<PostProps> = ({ post, dispatch }) => {
  const ref = useRef<HTMLIonItemSlidingElement | null>(null)

  const handleDelete = async () => {
    try {
      await deletePost(post)
      dispatch({ type: 'DELETE_POST', id: post.id })
    } catch (err) {
      console.log(err)
    } finally {
      ref.current?.close()
    }
  }

  const toggleActive = async () => {
    try {
      const updatedPost = await updatePost({
        ...post,
        is_active: !post.is_active,
      })
      dispatch({ type: 'UPDATE_POST', post: updatedPost })
    } catch (err) {
      console.log(err)
    } finally {
      ref.current?.close()
    }
  }

  return (
    <IonItemSliding ref={ref}>
      <IonItem disabled={!post.is_active}>
        <IonText slot="start">{emotions[post.emotion_id]}</IonText>
        <IonLabel>
          <IonText>{post.text}</IonText>
        </IonLabel>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption color="secondary" onClick={toggleActive}>
          {post.is_active ? 'Disable' : 'Enable'}
        </IonItemOption>
        <IonItemOption onClick={handleDelete} color="danger">
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  )
}

export default Post
