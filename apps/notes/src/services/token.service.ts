import jwt from 'jsonwebtoken';

class TokenService {
  private token = '';

  setToken(token: string) {
    this.token = token;
  }

  hasToken(): boolean {
    return !this.token ? false : true;
  }

  verify(): boolean {
    if (!this.hasToken()) {
      return false;
    }

    const decoded = jwt.decode(this.token, { complete: true });
    if (!decoded) {
      return false;
    }
    return true;
  }
}

export default new TokenService();
