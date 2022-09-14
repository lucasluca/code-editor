/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import styled from 'styled-components';
import { KeyboardEvent, useRef } from 'react';

interface IProps {
  title: string;
}

export default function EditableNode({ title }: IProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const initialValueRef = useRef<string>(title);

  function focusAndPlaceCaretAtEnd(el: HTMLDivElement) {
    el.focus();
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  const onDoubleClick = () => {
    if (!divRef?.current) return;
    divRef.current.contentEditable = 'true';
    focusAndPlaceCaretAtEnd(divRef.current);
  };

  const onBlur = () => {
    if (!divRef?.current) return;
    divRef.current.contentEditable = 'false';
    divRef.current.blur();
  };

  const cancelEdit = () => {
    if (!divRef?.current) return;
    divRef.current.textContent = initialValueRef.current;
    onBlur();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.code === 'Enter') e.preventDefault();
    if (e.code === 'Escape') cancelEdit();
  };

  return (
    <Wrapper>
      <div
        contentEditable={false}
        suppressContentEditableWarning
        ref={divRef}
        onKeyDown={onKeyDown}
        onDoubleClick={onDoubleClick}
        onBlur={onBlur}
      >
        {title}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  [contenteditable] {
    outline: 0px solid transparent;
  }
`;
