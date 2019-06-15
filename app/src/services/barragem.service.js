import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export class BarragemService {
  static list(addressId) {
    return axios({
      method: 'GET',
      url: `http://18.222.174.14:80/admin/barrages/${addressId}`,
      params: {
        addressId
      }
    });
  }

  static async barragensAddress(addressId) {
    return axios({
      method: 'GET',
      url: `http://18.217.252.7:80/api/v1/addresses/${addressId}/get_close_barrage`,
      headers: {
        "access-token": await AsyncStorage.getItem("access-token"),
        "client": await AsyncStorage.getItem("client"),
        "resource-type": await AsyncStorage.getItem("resource-type"),
        "uid": await AsyncStorage.getItem("uid"),
      }
    })
  }

  static get(barragemId) {
    return axios({
      method: 'GET',
      url: `http://18.217.252.7:80/admin/barrages/${barragemId}`,
    })
  }
}