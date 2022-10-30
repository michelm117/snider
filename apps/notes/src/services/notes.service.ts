import { NoteInterface, NoteInfoInterface } from '@snider/api-interfaces';
import axios from 'axios';
import { string } from 'joi';

class NoteService {
  getAllNotes(): Promise<any> {
    return axios.get<NoteInfoInterface[]>(
      `${process.env.VUE_APP_API_URL}/notes`
    );
  }

  getAllNotesInfos(): Promise<any> {
    return axios.get<NoteInfoInterface[]>(
      `${process.env.VUE_APP_API_URL}/notes/info`
    );
  }

  get(id: number): Promise<any> {
    return axios.get<NoteInterface>(
      `${process.env.VUE_APP_API_URL}/notes/${id}`
    );
  }

  update(id: number, name: string, note: string): Promise<any> {
    return axios.put<NoteInterface>(
      `${process.env.VUE_APP_API_URL}/notes/${id}`,
      {
        name: string,
        note: string,
      }
    );
  }

  create(id: number, name: string, note: string): Promise<any> {
    return axios.put<NoteInterface>(
      `${process.env.VUE_APP_API_URL}/notes/${id}`,
      {
        name: string,
        note: string,
      }
    );
  }

  delete(id: any): Promise<any> {
    return axios.delete(`${process.env.VUE_APP_API_URL}/notes/${id}`);
  }
}

export default new NoteService();
