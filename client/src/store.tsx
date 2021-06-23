import { IStore, IPost, IUser } from './types'

type Action =
  | { type: 'ADD_POST'; post: IPost }
  | { type: 'UPDATE_POST'; post: IPost }
  | { type: 'DELETE_POST'; id: number }
  | { type: 'SET_DATA'; user: IUser, posts: IPost[] }

export const initialState = { user: null, posts: [] }

export const reducer = (state: IStore, action: Action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, user: action.user, posts: action.posts }
    case 'ADD_POST':
      return { ...state, posts: [ ...state.posts, action.post ] }
    case 'UPDATE_POST':
      return { ...state, posts: state.posts.map(post => {
        if (post.id === action.post.id) {
          return action.post
        }
        return post
      })
    }
    case 'DELETE_POST':
      return { ...state, posts: state.posts.filter(post => post.id !== action.id) }
    default:
      throw new Error()
  }
}
