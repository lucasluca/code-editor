import axios from 'axios';
import { IFileService } from '../types/file-service.type';
import { IFile } from '../types/file-types';

export default class FileService implements IFileService {
  getFileTreeFromApi = async () => {
    try {
      const response = await axios.get('https://my-json-server.typicode.com/open-veezoo/editor/filetree');
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error(`${e}`);
    }
  };

  getFileFromApi = async (id: number) => {
    try {
      const response = await axios.get(`https://my-json-server.typicode.com/open-veezoo/editor/files/${id}`);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error(`${e}`);
    }
  };

  deleteFileOnApi = async (id: number) => {
    try {
      const response = await axios.delete(`https://my-json-server.typicode.com/open-veezoo/editor/files/${id}`);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error(`${e}`);
    }
  };

  updateFileContentOnApi = async (file: IFile) => {
    try {
      const response = await axios.put(`https://my-json-server.typicode.com/open-veezoo/editor/files/${file.id}`, file);
      return response.data;
    } catch (e) {
      console.error(e);
      throw new Error(`${e}`);
    }
  };
}
