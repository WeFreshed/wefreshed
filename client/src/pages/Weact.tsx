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
  IonFooter,
  IonButton,
  IonIcon,
  useIonAlert,
} from '@ionic/react'
import {
  arrowDownCircleOutline,
  arrowUpCircleOutline,
  arrowForwardCircleOutline,
  arrowBackCircleOutline,
} from 'ionicons/icons'
import { useHistory } from 'react-router'
import React, { useState, useEffect, useContext, useRef } from 'react'
import { IPost, Direction, IFetchError } from '../types'
import { LocationContext } from '../context'
import * as Api from '../services/api'

import { motion, useMotionValue, useAnimation } from 'framer-motion'

import './Weact.css'

const Page: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([])
  const [currentPost, setCurrentPost] = useState<IPost | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { push } = useHistory<{ action: string }>()
  const location = useContext(LocationContext)
  const content = useRef<HTMLIonContentElement | null>(null)
  const cardElem = useRef<HTMLDivElement | null>(null)
  const x = useMotionValue(0)
  const controls = useAnimation()
  const [presentAlert] = useIonAlert()

  const _setPosts = (posts: IPost[]) => {
    const [_post, ..._posts] = posts
    setCurrentPost(_post)
    setPosts(_posts)
    if (!_posts.length) {
      getPosts().then((posts) => setPosts(posts))
    }
  }

  const handleError = (err: IFetchError) => {
    if (err.status === 401) {
      push('/')
    } else {
      setError('Something went wrong 😞')
    }
  }

  const getPosts = async () => {
    try {
      setError(null)
      return await Api.getPosts()
    } catch (err) {
      handleError(err as IFetchError)
    }
  }

  useEffect(() => {
    if (null !== content.current) {
      console.log(content?.current?.getBoundingClientRect())
    }
    getPosts().then((posts) => posts && _setPosts(posts))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleWeaction = async (direction: Direction) => {
    if (currentPost) {
      const params = {
        post_id: currentPost.id,
        poster_id: currentPost.user_id,
        direction,
        latitude: location.latitude,
        longitude: location.longitude,
      }
      try {
        const weaction = await Api.createWeaction(params)
        if (weaction.is_weef) {
          presentAlert({
            header: 'Weef Alert',
            subHeader: "You've created a Weef!",
            message: 'You can view you Weef on the Week page.',
            buttons: ['OK'],
          })
        }

        _setPosts(posts)
      } catch (err) {
        handleError(err as IFetchError)
      }
    }
  }

  const handleDragEnd = async (
    event: any,
    info: {
      offset: { x: number; y: number }
      velocity: { x: number; y: number }
    },
  ) => {
    const offsetX = info.offset.x
    const velocityX = info.velocity.x
    const offsetY = info.offset.y
    const velocityY = info.velocity.y

    let direction: Direction | null = null
    let transition

    if (offsetY < -100 || velocityY < -100) {
      console.log('swipe up')
      transition = { y: -1000 }
      direction = 'up'
    } else if (offsetY > 100 || velocityY > 100) {
      console.log('swipe down')
      transition = { y: 1000 }
      direction = 'down'
    } else if (offsetX < -100 || velocityX < -100) {
      console.log('swipe right')
      transition = { x: -1000 }
      direction = 'right'
    } else if (offsetX > 100 || velocityX > 100) {
      console.log('swipe left')
      transition = { x: 1000 }
      direction = 'left'
    }

    if (direction) {
      try {
        await handleWeaction(direction)
        await controls.start({
          ...transition,
          transition: { duration: 0.5 },
          opacity: 0,
        })
        await controls.start({ opacity: 1, x: 0, y: 0 })
      } catch (err) {
        console.log(err)
      }
    }
  }

  if (error) {
    return <p>{error}</p>
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Weact</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen ref={content} scrollY={false}>
        <motion.div
          ref={cardElem}
          drag
          dragConstraints={{
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          dragElastic={1}
          whileTap={{ scale: 1.1 }}
          style={{ x }}
          onDragEnd={handleDragEnd}
          animate={controls}
          className="weact-height"
        >
          <IonCard className="full-height">
            <IonCardContent>
              {posts.length && <p>{posts[0].text}</p>}
            </IonCardContent>
          </IonCard>
        </motion.div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonButtons>
            <IonButton onClick={() => handleWeaction('down')}>
              <IonIcon slot="icon-only" icon={arrowDownCircleOutline} />
            </IonButton>
            <IonButton onClick={() => handleWeaction('left')}>
              <IonIcon slot="icon-only" icon={arrowBackCircleOutline} />
            </IonButton>
            <IonButton onClick={() => handleWeaction('right')}>
              <IonIcon slot="icon-only" icon={arrowForwardCircleOutline} />
            </IonButton>
            <IonButton onClick={() => handleWeaction('up')}>
              <IonIcon slot="icon-only" icon={arrowUpCircleOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  )
}

export default Page
