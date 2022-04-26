import { IPost, IPostParams, IWeactionParams } from '../types'
import { getDeviceId } from '../services/device'

export const login = async () => {
  try {
    const device_id = await getDeviceId()
    const response = await fetch('/api/sessions', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ device_id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await response.json()
    return json
  } catch (err) {
    console.log(err)
    return Promise.reject(err)
  }
}

export const getSession = () => {
  return fetch('/api/sessions', {
    method: 'GET',
    credentials: 'include',
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        console.log(response)
        if (response.status === 401) {
          return login()
        } else {
          throw response
        }
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

export const createPost = (post: IPostParams) => {
  return fetch('/api/posts', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({
      ...post,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw response
    }
  })
}

export const deletePost = (post: IPost) => {
  return fetch(`/api/posts/${post.id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw response
    }
  })
}

export const updatePost = (post: IPost) => {
  return fetch(`/api/posts/${post.id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...post,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw response
    }
  })
}

export const getPosts = () => {
  return fetch('/api/posts', {
    method: 'GET',
    credentials: 'include',
  }).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw response
    }
  })
}

export const createWeaction = (weaction: IWeactionParams) => {
  return fetch('/api/weactions', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...weaction,
    }),
  }).then((response) => {
    if (response.ok) {
      return response.json()
    } else {
      throw response
    }
  })
}
