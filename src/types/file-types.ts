export interface IFileTreeItem {
  id: number;
  name: string;
  isDirectory: boolean;
  children?: Array<IFileTreeItem>;
}

export interface IFile {
  id: number;
  name: string;
  content: string;
}

export interface ICodeEditorContext {
  tree: Array<IFileTreeItem>;
  selectedFile: IFile | null;
  onSelectFile: (id: number) => void;
  onDeleteFile: () => void;
  saveFile: (content: string) => void;
  loading: boolean;
}

export type INotificationType = 'success' | 'info' | 'warning' | 'error';
