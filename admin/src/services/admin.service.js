import axios from 'axios';

export class AdminService {
  static login(senha, email) {
    return axios({
      method: 'POST',
      url: `http://18.222.174.14:80/admin/barrages`,
    })
  }
}