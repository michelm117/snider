import Vuex from 'vuex';
import jwt from 'jsonwebtoken';
import { store } from '../store';

class TokenService {
  getToken() {
    return store.getters.getToken;
  }

  setToken(token: string) {
    store.dispatch('updateToken', token);
  }

  hasToken(): boolean {
    if (!this.getToken()) {
      return false;
    }
    if (this.getToken() === '') {
      return false;
    }
    return true;
  }

  verify(): boolean {
    if (!this.hasToken()) {
      return false;
    }

    const decoded = jwt.decode(this.getToken(), { complete: true });
    if (!decoded) {
      return false;
    }
    return true;
  }
}

export default new TokenService();
