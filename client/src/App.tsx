import Menu from './components/Menu';
import Posts from './pages/Posts';
import User from './pages/User';
import NewPost from './pages/NewPost';
import Weact from './pages/Weact';
import React, { useEffect, useState, useReducer } from 'react';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

import { getSession } from './services/api';
import { getCurrentPosition } from './services/location'
import { DataContext, LocationContext } from './context';
import { reducer, initialState } from './store';

import { ILocation, defaultLocation } from './types'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [userLocation, setUserLocation] = useState<ILocation>(defaultLocation)

  useEffect(() => {
    const getData = async () => {
      try {
        const sessionData = await getSession()
        dispatch({ type: 'SET_DATA', ...sessionData })
      } catch(err) {
        console.log(err)
      }
    }

    const getUserLocation = async () => {
      const position = await getCurrentPosition();
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        timestamp: position.timestamp
      })
    };

    getData()
    getUserLocation()
  }, [])

  if (!state.user) {
    return <div>nope</div>
  }

  return (
    <IonApp>
      <DataContext.Provider value={{ state, dispatch }}>
        <LocationContext.Provider value={userLocation}>
          <IonReactHashRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/posts/new" component={NewPost} exact />
                <Route path="/posts" component={Posts} exact />
                <Route path="/weact" component={Weact} exact />
                <Route path="/user" component={User} exact />
                <Redirect from="/" to="/posts" exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactHashRouter>
        </LocationContext.Provider>
      </DataContext.Provider>
    </IonApp>
  );
};

export default App;
