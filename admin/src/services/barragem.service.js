import axios from 'axios';

export class BarragemService {
  static list() {
    return axios({
      method: 'GET',
      url: 'http://18.217.252.7:80/admin/barrages',
    })
  }

  static get(barragemId) {
    return axios({
      method: 'GET',
      url: `http://18.217.252.7:80/admin/barrages/${barragemId}`,
    })
  }

  static create(barragem) {
    return axios({
      method: 'POST',
      url: `http://18.222.174.14:80/admin/barrages`,
      data: barragem
    })
  }

  static getHumiditySensorMeasurement(barragemId) {
    return axios({
      method: 'GET',
      url: `http://18.222.174.14:80/admin/barrages/${barragemId}`,
      params: {
        barragemId
      }
    })
  }

  static getVibrationMeasurement(barragemId) {
    return axios({
      method: 'GET',
      url: `http://18.222.174.14:80/admin/barrages/${barragemId}`,
      params: {
        barragemId
      }
    })
  }
}