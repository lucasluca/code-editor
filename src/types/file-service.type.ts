import { IFile, IFileTreeItem } from './file-types';

export interface IFileService {
  getFileTreeFromApi: () => Promise<Array<IFileTreeItem>>;
  getFileFromApi: (id: number) => Promise<IFile>;
  deleteFileOnApi: (id: number) => Promise<FileUpdateResponse>;
  updateFileContentOnApi: (file: IFile) => Promise<FileUpdateResponse>;
}

export interface FileUpdateResponse {
  id: number;
}
