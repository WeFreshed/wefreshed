export interface ILocation {
  latitude: number
  longitude: number
  timestamp: number
}

export const defaultLocation = {
  latitude: 0,
  longitude: 0,
  timestamp: Date.now(),
}

export interface IUser {
  id: number
  name: string
  latitude: number
  longitude: number
}

export type EmotionId = 1 | 2 | 3 | 4

export interface IPost {
  id: number
  text: string
  emotion_id: EmotionId
  latitude: number
  longitude: number
  is_active: boolean
}

export interface IPostParams {
  text: string
  emotion_id: number | null
  latitude?: number
  longitude?: number
}

export type Direction = 'up' | 'down' | 'left' | 'right'

export interface IWeactionParams {
  post_id: number
  direction: Direction
  latitude: number
  longitude: number
}

export interface IStore {
  user: IUser | null
  posts: IPost[]
}

export interface IFetchError {
  ok: boolean
  redirected: boolean
  status: number
  statusText: string
  type: string
  url: string
}
