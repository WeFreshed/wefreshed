import {
  IonButtons,
  IonButton,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonItem,
  IonTextarea,
  IonLabel,
  IonList,
  IonListHeader,
  IonRadio,
  IonRadioGroup,
  useIonAlert,
} from '@ionic/react'
import { useHistory } from 'react-router'
import React, { useState, useContext } from 'react'
import { DataContext, LocationContext } from '../context'
import { createPost } from '../services/api'
import { IPostParams } from '../types'
import './Page.css'

const initialPost = {
  text: '',
  emotion_id: null,
}

const NewPost: React.FC = () => {
  const { action, push, goBack } = useHistory<{ action: string }>()
  const location = useContext(LocationContext)
  const { dispatch } = useContext(DataContext)
  const [present] = useIonAlert()

  const [post, setPost] = useState<IPostParams>(initialPost)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const _post = await createPost({
        ...post,
        latitude: location?.latitude,
        longitude: location?.longitude,
      })

      dispatch({ type: 'ADD_POST', post: _post })

      setPost(initialPost)
      if (action === 'PUSH') {
        goBack()
      } else {
        push('/posts')
      }
    } catch (err) {
      handleError(err)
    }
  }

  const handleError = async (error: any) => {
    const messages = (await error.json()) as string[]
    present({
      header: 'Alert',
      message: messages.map((msg: string) => msg).join('\n'),
      buttons: ['Ok'],
      onDidDismiss: (e) => console.log('did dismiss'),
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {action === 'PUSH' ? (
              <IonBackButton defaultHref="/" />
            ) : (
              <IonMenuButton />
            )}
          </IonButtons>
          <IonTitle>New Post</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">New Post</IonTitle>
          </IonToolbar>
        </IonHeader>

        <form onSubmit={handleSubmit}>
          <IonList lines="full">
            <IonListHeader>
              <IonLabel>Text</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonTextarea
                value={post.text}
                inputMode="text"
                placeholder="Enter Text"
                autoGrow
                rows={3}
                onIonChange={(e) =>
                  setPost({ ...post, text: e.detail.value || '' })
                }
              />
            </IonItem>

            <IonRadioGroup
              value={post.emotion_id}
              onIonChange={(e) =>
                setPost({ ...post, emotion_id: e.detail.value })
              }
            >
              <IonListHeader>
                <IonLabel>Emotion</IonLabel>
              </IonListHeader>

              <IonItem>
                <IonLabel>Happy</IonLabel>
                <IonRadio slot="end" value={1} />
              </IonItem>

              <IonItem>
                <IonLabel>Amused</IonLabel>
                <IonRadio slot="end" value={2} />
              </IonItem>

              <IonItem>
                <IonLabel>Angry</IonLabel>
                <IonRadio slot="end" value={3} />
              </IonItem>

              <IonItem>
                <IonLabel>Meh</IonLabel>
                <IonRadio slot="end" value={4} />
              </IonItem>
            </IonRadioGroup>
          </IonList>
          <IonButton type="submit" expand="full" fill="outline">
            Create Post
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default NewPost
