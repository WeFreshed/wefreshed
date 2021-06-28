import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonButton,
  IonIcon,
} from '@ionic/react'
import React, { useContext } from 'react'
import { addCircleOutline } from 'ionicons/icons'
import './Page.css'
import { DataContext } from '../context'
import Post from '../components/Post'

const Posts: React.FC = () => {
  const { state, dispatch } = useContext(DataContext)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Posts</IonTitle>
          <IonButtons slot="primary">
            <IonButton color="secondary" routerLink="/posts/new">
              <IonIcon slot="icon-only" icon={addCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Posts</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList lines="full">
          {state.posts.map((post) => (
            <Post post={post} key={post.id} dispatch={dispatch} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default Posts
