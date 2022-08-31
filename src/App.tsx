import CodeEditorPage from './pages/CodeEditorPage';
import FileService from './services/file-service';
import NotificationService from './services/notification-service';

function App() {
  return <CodeEditorPage fileService={new FileService()} notificationService={new NotificationService()} />;
}

export default App;
