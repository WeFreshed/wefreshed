import React from 'react'
import { IonSlides, IonSlide, IonContent, IonButton } from '@ionic/react'
import './Welcome.css'

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400,
}

const Welcome: React.FC = () => (
  <IonContent>
    <IonSlides pager={true} options={slideOpts}>
      <IonSlide>
        <h1>Welcome</h1>
      </IonSlide>
      <IonSlide>
        <h1>Here's how it works</h1>
      </IonSlide>
      <IonSlide style={{ flexDirection: 'column' }}>
        <h1>Are you ready to get started?</h1>
        <IonButton routerLink="/posts/new">Create your first post</IonButton>
      </IonSlide>
    </IonSlides>
  </IonContent>
)

export default Welcome
