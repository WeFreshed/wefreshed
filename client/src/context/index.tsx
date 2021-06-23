import { createContext } from 'react'
import { ILocation, IStore, defaultLocation } from '../types'
import { initialState } from '../store'

export const LocationContext = createContext<ILocation>(defaultLocation)

export const DataContext = createContext<{
  state: IStore;
  dispatch: React.Dispatch<any>
}>({ 
  state: initialState,
  dispatch: () => null
})