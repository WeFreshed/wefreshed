import { UniqueDeviceID } from '@ionic-native/unique-device-id'
import { v4 as uuidv4 } from 'uuid';

export const getDeviceId = async () => {
  try {
    return await UniqueDeviceID.get()
  } catch(err) {
    if (err === "cordova_not_available") {
      const storageId = localStorage.getItem('weef-id');
      if (storageId) {
        return storageId;
      }
      const uuid = `ls-${uuidv4()}`;
      localStorage.setItem('weef-id', uuid);
      return uuid;
    }
    throw err
  }
}