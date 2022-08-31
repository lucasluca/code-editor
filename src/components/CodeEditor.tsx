/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { useContext, useState, useEffect } from 'react';
import { SaveOutlined, DeleteOutlined } from '@ant-design/icons';

import Editor from '@monaco-editor/react';
import { Button } from 'antd';
import styled from 'styled-components';
import { EditorContext } from '../pages/CodeEditorPage';
import EmptyEditor from './EmptyEditor';

export default function CodeEditor() {
  const { saveFile, onDeleteFile, selectedFile, loading } = useContext(EditorContext);

  const [value, setValue] = useState(selectedFile?.content);

  useEffect(() => {
    setValue(selectedFile?.content);
  }, [selectedFile]);
  return (
    <Wrapper>
      {!selectedFile ? (
        <EmptyEditor loading={loading} />
      ) : (
        <>
          <div className="selected-file-header">
            <div className="opened-item-box">
              <span data-testid="selected-file-tab-id">{selectedFile.name}</span>
            </div>
          </div>
          <Editor
            height="calc(100% - 35px)"
            className="editor-component"
            defaultLanguage="java"
            theme="vs-dark"
            value={value}
            onChange={(e) => setValue(e)}
            loading={<EmptyEditor loading={loading} />}
          />
        </>
      )}

      {!!selectedFile && (
        <div className="buttons-wrapper">
          <Button
            type="primary"
            shape="round"
            data-testid="save-change-button-id"
            icon={<DeleteOutlined />}
            size="large"
            onClick={() => saveFile(value)}
            disabled={loading}
            loading={loading}
          >
            Save changes
          </Button>
          <Button
            type="primary"
            shape="round"
            data-testid="delete-file-button-id"
            icon={<SaveOutlined />}
            onClick={onDeleteFile}
            size="large"
            danger
            disabled={loading}
          >
            Delete file
          </Button>
        </div>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  overflow: hidden;
  .buttons-wrapper {
    display: flex;
    position: absolute;
    right: 40px;
    gap: 20px;
    bottom: 40px;
  }

  .selected-file-header {
    display: flex;
    height: 35px;
    width: 100%;
    border-bottom: 1px solid #30363d;
    background-color: #30363d;
  }

  .opened-item-box {
    display: flex;
    border-top: 1px solid #f78166;
    padding-left: 20px;
    padding-right: 20px;
    align-items: center;
    justify-content: center;
    background-color: rgb(13, 17, 23);

    span {
      color: rgb(201, 209, 217);
    }
  }
`;
