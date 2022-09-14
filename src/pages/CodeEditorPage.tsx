/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import CodeEditor from '../components/CodeEditor';
import TreeDemo from '../components/TreeDemo';
import { ICodeEditorContext, IFileTreeItem, IFile } from '../types/file-types';
import FileService from '../services/file-service';
import NotificationService from '../services/notification-service';
import TreeNew from '../components/TreeNew';

export const EditorContext = createContext({} as ICodeEditorContext);

interface IProps {
  fileService: FileService;
  notificationService: NotificationService;
}

export default function CodeEditorPage({ fileService, notificationService }: IProps) {
  const [tree, setTree] = useState<Array<IFileTreeItem>>([]);
  const [selectedFile, setSelectedFile] = useState<IFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const renderNotificationDescription = (description: string, type: string) => (
    <span data-testid={`notification-${type}`}>{description}</span>
  );
  const openSuccessToast = (description = 'Operation done') => {
    notificationService.openNotification('success', 'Sucess', renderNotificationDescription(description, 'success'));
  };

  const openErrorToast = (description = 'Unable to obtain files from server. Try again later') => {
    notificationService.openNotification('error', 'Error', renderNotificationDescription(description, 'error'));
  };
  const onMount = async () => {
    try {
      setLoading(true);
      const response = await fileService.getFileTreeFromApi();
      console.log('RESPONSE', response);
      setTree(response);
      setLoading(false);
    } catch (err) {
      openErrorToast();
      setLoading(false);
    }
  };

  useEffect(() => {
    onMount();
  }, []);

  const onSelectFile = async (id: number) => {
    setLoading(true);
    const file = await fileService.getFileFromApi(id);
    setLoading(false);
    setSelectedFile(file || null);
  };

  const loop = (
    data: Array<IFileTreeItem>,
    id: React.Key,
    callback: (node: IFileTreeItem, i: number, data: Array<IFileTreeItem>) => void,
  ) => {
    for (let i = 0; i < data.length; i += 1) {
      if (data[i].id === id) {
        return callback(data[i], i, data);
      }
      if (data[i].children) {
        loop(data[i].children!, id, callback);
      }
    }
  };

  const saveFile = async (content: string) => {
    try {
      setLoading(true);
      if (!selectedFile) return;
      await fileService.updateFileContentOnApi(selectedFile);
      setLoading(false);
      const id = selectedFile?.id;
      if (!id) return;
      const newFile: IFile = { ...selectedFile, content };
      setSelectedFile(newFile);
      openSuccessToast(`File ${selectedFile.name} saved successfully`);
    } catch (err) {
      console.error(err);
      setLoading(false);
      openErrorToast('Error on update file. Try again later.');
    }
  };

  const removeFileFromTree = () => {
    const id = selectedFile?.id;
    if (!id) return;
    const treeCopy = [...tree];
    loop(treeCopy, id, (item, index, arr) => {
      arr.splice(index, 1);
      setTree([...treeCopy]);
    });
  };

  const onDeleteFile = async () => {
    try {
      setLoading(true);
      const id = selectedFile?.id;
      if (!id) return;
      await fileService.deleteFileOnApi(id);
      setLoading(false);
      removeFileFromTree();
      openSuccessToast(`File ${selectedFile.name} deleted successfully`);
      setSelectedFile(null);
    } catch (e) {
      console.error(e);
      setLoading(false);
      openErrorToast();
    }
  };

  const sharedValues = useMemo(
    () => ({
      tree,
      selectedFile,
      onSelectFile,
      onDeleteFile,
      saveFile,
      loading,
    }),
    [tree, selectedFile, loading],
  );
  return (
    <EditorContext.Provider value={sharedValues}>
      <Wrapper data-testid="code-editor-page-wrapper-id">
        <div className="left-tree-wrapper" data-testid="left-tree-wrapper-id">
          {loading && (
            <div className="loading-invisible" data-testid="loading-id">
              Loading...
            </div>
          )}
          {!!tree?.length && <TreeNew />}
        </div>
        <div className="right-code-editor" data-testid="right-code-editor-id">
          <CodeEditor />
        </div>
      </Wrapper>
    </EditorContext.Provider>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  height: 100vh;
  width: 100%;
  .loading-invisible {
    position: absolute;
  }
  .left-tree-wrapper {
    width: 30%;
    height: 100%;
    background-color: #252526;
  }

  .right-code-editor {
    width: 70%;
  }
`;
