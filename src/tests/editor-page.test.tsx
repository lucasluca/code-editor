import { render, screen, fireEvent, act, waitFor, cleanup } from '@testing-library/react';
import CodeEditorPage from '../pages/CodeEditorPage';
import FileServiceMock from '../mocks/file-service-mock';
import NotificationService from '../services/notification-service';

const makeSut = (fileService = new FileServiceMock(), notificationService = new NotificationService(0.005)) => {
  render(<CodeEditorPage fileService={fileService} notificationService={notificationService} />);
};

describe('Editor Page', () => {
  afterEach(() => {
    cleanup();
  });
  it('Page should mount', () => {
    makeSut();
    const element = screen.getByTestId('code-editor-page-wrapper-id');
    const emptyTitle = screen.getByTestId('empty-title-id');
    expect(element).toBeInTheDocument();
    expect(emptyTitle).toBeInTheDocument();
  });

  it('Should open file when click on tree item', async () => {
    makeSut();

    const treeNode = await screen.findByTitle('Hello.java');

    fireEvent.click(treeNode);

    const headerTab = await screen.findByTestId('selected-file-tab-id');
    expect(headerTab).toHaveTextContent('Hello.java');
  });

  it('Should delete a file when a file is selected and click on delete button', async () => {
    makeSut();

    const treeNode = await screen.findByTitle('Hello.java');

    fireEvent.click(treeNode);

    const deleteButton = await screen.findByTestId('delete-file-button-id');
    await act(() => {
      fireEvent.click(deleteButton);
    });
    const deletedTreeNode = screen.queryByTitle('Hello.java');
    expect(deletedTreeNode).not.toBeInTheDocument();
    const emptyTitle = screen.getByTestId('empty-title-id');

    expect(emptyTitle).toBeInTheDocument();
  });

  it('Should not appear delete and save button if no file is selected', () => {
    makeSut();

    const deleteButton = screen.queryByTestId('delete-file-button-id');
    const saveButton = screen.queryByTestId('save-change-button-id');

    expect(deleteButton).not.toBeInTheDocument();
    expect(saveButton).not.toBeInTheDocument();
  });

  it('Should save a file', async () => {
    makeSut();

    const treeNode = await screen.findByTitle('Main.java');

    fireEvent.click(treeNode);
    const saveButton = await screen.findByTestId('save-change-button-id');
    await act(() => {
      fireEvent.click(saveButton);
    });
    const successToast = await screen.findAllByTestId('notification-success');
    expect(successToast[0]).toBeInTheDocument();
  });

  it('Should not render tree if API call fails', async () => {
    const fileServiceSpy = new FileServiceMock();
    jest.spyOn(fileServiceSpy, 'getFileTreeFromApi').mockRejectedValueOnce(new Error('Error'));
    makeSut(fileServiceSpy);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-id')).not.toBeInTheDocument();
    });

    const treeWrapper = screen.queryByTestId('tree-wrapper-id');

    expect(treeWrapper).not.toBeInTheDocument();
    const errorToast = await screen.findAllByTestId('notification-error');
    expect(errorToast[0]).toBeInTheDocument();
  });

  it('Should not DELETE file if API call fails', async () => {
    const fileServiceSpy = new FileServiceMock();
    jest.spyOn(fileServiceSpy, 'deleteFileOnApi').mockRejectedValueOnce(new Error('Error'));
    makeSut(fileServiceSpy);

    const treeNode = await screen.findByTitle('Home.java');

    fireEvent.click(treeNode);

    const deleteButton = await screen.findByTestId('delete-file-button-id');
    await act(() => {
      fireEvent.click(deleteButton);
    });
    const errorToast = await screen.findAllByTestId('notification-error');
    expect(errorToast[0]).toBeInTheDocument();
    expect(treeNode).toBeInTheDocument();
  });

  it('Should not SAVE the file if API call fails', async () => {
    const fileServiceSpy = new FileServiceMock();
    jest.spyOn(fileServiceSpy, 'updateFileContentOnApi').mockRejectedValueOnce(new Error('Error'));
    makeSut(fileServiceSpy);

    const treeNode = await screen.findByTitle('Home.java');

    fireEvent.click(treeNode);

    const saveButton = await screen.findByTestId('save-change-button-id');
    await act(() => {
      fireEvent.click(saveButton);
    });
    const errorToast = await screen.findAllByTestId('notification-error');
    expect(errorToast[0]).toBeInTheDocument();
  });
});
