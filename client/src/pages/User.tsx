import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
} from '@ionic/react'
import React, { useContext } from 'react'
import './Page.css'
import { DataContext } from '../context'

const User: React.FC = () => {
  const { state } = useContext(DataContext)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>User</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">User</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonCard>
          <IonCardContent>
            <p>User id: {state?.user?.id}</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  )
}

export default User
