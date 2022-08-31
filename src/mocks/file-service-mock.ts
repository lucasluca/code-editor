/* eslint-disable @typescript-eslint/no-unused-vars */
import { FileUpdateResponse, IFileService } from '../types/file-service.type';
import { IFile, IFileTreeItem } from '../types/file-types';
import { filetree, files } from './api-response-mock';

export default class FileServiceMock implements IFileService {
  getFileTreeFromApi = async () =>
    new Promise<IFileTreeItem[]>((resolve) => {
      resolve(filetree);
    });

  getFileFromApi = async (id: number) =>
    new Promise<IFile>((resolve) => {
      resolve(files[0]);
    });

  deleteFileOnApi = async (id: number) =>
    new Promise<FileUpdateResponse>((resolve) => {
      resolve({ id });
    });

  updateFileContentOnApi = async (file: IFile) =>
    new Promise<FileUpdateResponse>((resolve) => {
      resolve({ id: 3 });
    });
}
