import React, { useRef } from 'react'
import {
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption
} from '@ionic/react'
import { deletePost, updatePost } from '../services/api'
import { IPost } from '../types'

interface PostProps {
  post: IPost,
  dispatch: React.Dispatch<any>
}

const Post: React.FC<PostProps> = ({ post, dispatch }) => {

  const ref = useRef<HTMLIonItemSlidingElement | null>(null)

  const handleDelete = async () => {
    try {
      await deletePost(post)
      dispatch({ type: 'DELETE_POST', id: post.id })
    } catch(err) {
      console.log(err)
    } finally {
      ref.current?.close()
    }
  }

  const toggleActive = async () => {
    try {
      const updatedPost = await updatePost({ ...post, is_active: !post.is_active })
      dispatch({ type: 'UPDATE_POST', post: updatedPost })
    } catch(err) {
      console.log(err)
    } finally {
      ref.current?.close()
    }
  }

  return (
    <IonItemSliding ref={ref}>
      <IonItem>
        <IonLabel>{post.text}</IonLabel>
        <p>{post.emotion_id}</p>
        <p>{post.is_active ? 'active' : 'not active'}</p>
      </IonItem>

      <IonItemOptions side="end">
        <IonItemOption
          color="secondary"
          onClick={toggleActive}
        >
          Disable
        </IonItemOption>
        <IonItemOption
          onClick={handleDelete}
          color="danger"
        >
          Delete
        </IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default Post;