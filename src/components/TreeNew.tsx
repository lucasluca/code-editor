// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import { useContext } from 'react';
import styled from 'styled-components';
import type { AntdTreeNodeAttribute } from 'antd/es/tree';
import { EditorContext } from '../pages/CodeEditorPage';
import { filetree } from '../mocks/api-response-mock';
import { IFileTreeItem } from '../types/file-types';
import EditableNode from './EditableNode';

const { TreeNode } = Tree;

export default function TreeNew() {
  // const { tree, onSelectFile } = useContext(EditorContext);
  // const renderNodeIcon = (node: AntdTreeNodeAttribute) => (node.isDirectory ? <div>📁</div> : <div>📄</div>);

  const renderNode = (treeData: IFileTreeItem[]) =>
    treeData?.children?.map((node: IFileTreeItem) => {
      if (node?.children?.length)
        return (
          <TreeNode key={node.name} title={node.name}>
            {renderNode(node)}
          </TreeNode>
        );
      return <TreeNode key={node.name} title={node.name} />;
    });

  return (
    <Wrapper className="tree-wrapper" data-testid="tree-wrapper-id">
      <Tree defaultExpandAll>
        {/* {renderNode(filetree[0])} */}
        <TreeNode title={() => <EditableNode title="o loco" />} />
      </Tree>
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
