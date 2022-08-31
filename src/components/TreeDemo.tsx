// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { useContext } from 'react';
import styled from 'styled-components';
import type { AntdTreeNodeAttribute } from 'antd/es/tree';
import { EditorContext } from '../pages/CodeEditorPage';

export default function TreeDemo() {
  const { tree, onSelectFile } = useContext(EditorContext);
  const renderNodeIcon = (node: AntdTreeNodeAttribute) => (node.isDirectory ? <div>📁</div> : <div>📄</div>);
  return (
    <Wrapper className="tree-wrapper" data-testid="tree-wrapper-id">
      <Tree
        showIcon
        defaultExpandAll
        blockNode
        switcherIcon={<DownOutlined color="white" />}
        treeData={tree}
        fieldNames={{ title: 'name', key: 'id', children: 'children' }}
        onSelect={(x) => onSelectFile(x[0])}
        icon={renderNodeIcon}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  padding-left: 20px;
  padding-top: 40px;
  .ant-tree {
    height: 100%;
    background-color: #252526;
    .ant-tree-switcher {
      color: white;
    }
    .ant-tree-title {
      color: white;
    }
    .ant-tree-node-content-wrapper:hover {
      .ant-tree-title {
        color: black;
      }
    }
    .ant-tree-node-selected {
      .ant-tree-title {
        color: black;
      }
    }
  }
`;
