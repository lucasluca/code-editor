import styled from 'styled-components';
import Logo from './Logo';

interface IProps {
  loading: boolean;
}

export default function EmptyEditor({ loading }: IProps) {
  return (
    <Wrapper data-testid="empty-editor-id">
      <div className="logo-options-wrapper">
        <div className="App-logo" data-loading={loading}>
          <Logo />
        </div>
        <div className="text-wrapper">
          <h3 data-testid="empty-title-id">Vezoo Studio Code</h3>
          <span data-testid="empty-subtitle-id">Click on the tree to open a file</span>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1e1e1e;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-options-wrapper {
    margin-top: -100px;
  }
  .text-wrapper {
    h3,
    span {
      color: hsla(0, 0%, 100%, 0.6);
      font-weight: 500;
      font-size: 13px;
    }
    h3 {
      font-size: 30px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      transition: all 0.6s;
    }
    .App-logo[data-loading='true'] {
      animation: App-logo-spin infinite 0.5s linear;
    }
  }

  .App-header {
    background-color: #282c34;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: calc(10px + 2vmin);
    color: white;
  }

  .App-link {
    color: #61dafb;
  }

  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
