import { LoginResInterface, PublicUserInterface } from '@snider/api-interfaces';
import axios from 'axios';

class AuthService {
  config = {
    // baseURL: 'http://localhost:3333/api',
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      'Content-type': 'application/json',
    },
  };

  login(email: string, password: string): Promise<any> {
    return axios.post(
      `${process.env.VUE_APP_API_URL}/auth/login`,
      {
        password: password,
        email: email,
      },
      { withCredentials: true }
    );
  }

  register(email: string, username: string, password: string): Promise<any> {
    return axios.post<PublicUserInterface>(
      `${process.env.VUE_APP_API_URL}/auth/register`,
      {
        password: password,
        username: username,

        email: email,
      }
    );
  }

  refresh(): Promise<any> {
    return axios.get<LoginResInterface>(
      `${process.env.VUE_APP_API_URL}/auth/refresh`,
      { withCredentials: true }
    );
  }

  // get(id: any): Promise<any> {
  //   return http.get(`/tutorials/${id}`);
  // }

  // create(data: any): Promise<any> {
  //   return http.post('/tutorials', data);
  // }

  // update(id: any, data: any): Promise<any> {
  //   return http.put(`/tutorials/${id}`, data);
  // }

  // delete(id: any): Promise<any> {
  //   return http.delete(`/tutorials/${id}`);
  // }

  // deleteAll(): Promise<any> {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title: string): Promise<any> {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new AuthService();
