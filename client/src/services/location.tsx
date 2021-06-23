import { Geolocation } from '@ionic-native/geolocation';

export const emptyPosition = {
  coords: {
    latitude: 0,
    longitude: 0,
  },
  timestamp: 0
}

export const getCurrentPosition = async () => {
  try {
    const position = await Geolocation.getCurrentPosition();
    return position
  } catch(err) {
    if (err?.message === 'User denied Geolocation') {
      console.log('User denied Geolocation')
    }
    return emptyPosition
  }
};