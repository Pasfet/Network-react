import { render, fireEvent } from '@testing-library/react';
import DialogSendImage from './DialogSendImage';

describe('<DialogSendImage />', () => {
  const mockProps = {
    open: true,
    handleClose: jest.fn(),
    title: '',
    text: '',
    sendAvatar: jest.fn(),
    formAvatar: null,
    fileInfo: null,
    setFileInfo: jest.fn(),
  };

  const renderComponent = props => {
    return render(<DialogSendImage {...props} />);
  };

  it('Render modal title', () => {
    const { getByText } = renderComponent({ ...mockProps, title: 'Modal title' });

    expect(getByText(/modal title/i)).toBeInTheDocument();
  });

  it('Render modal text', () => {
    const { getByText } = renderComponent({ ...mockProps, text: 'Modal text' });

    expect(getByText(/modal text/i)).toBeInTheDocument();
  });

  it('Render fileInfo', () => {
    const { getByText } = renderComponent({ ...mockProps, fileInfo: { name: 'FileName' } });

    expect(getByText(/FileName/i)).toBeInTheDocument();
  });

  it('Call sendAvatar when form submit', () => {
    const { getByTestId } = renderComponent({ ...mockProps, fileInfo: { name: 'FileName' } });

    fireEvent.submit(getByTestId('dialog-image-form'));

    expect(mockProps.sendAvatar).toHaveBeenCalled();
    expect(mockProps.sendAvatar).toHaveBeenCalledTimes(1);
  });

  it('Call setFileInfo when input change', () => {
    const { getByTestId } = renderComponent({ ...mockProps, formAvatar: { current: '<input />' } });

    fireEvent.change(getByTestId('dialog-input-form'));

    expect(mockProps.setFileInfo).toHaveBeenCalled();
    expect(mockProps.setFileInfo).toHaveBeenCalledTimes(1);
  });

  it('Call handleClose when click on button "Закрыть"', () => {
    const { getByText } = renderComponent({ ...mockProps });

    fireEvent.click(getByText(/Закрыть/i));

    expect(mockProps.handleClose).toHaveBeenCalled();
    expect(mockProps.handleClose).toHaveBeenCalledTimes(1);
  });

  it('Call sendAvatar when click on button "Загрузить"', () => {
    const { getByText } = renderComponent({ ...mockProps });

    fireEvent.submit(getByText(/загрузить/i));

    expect(mockProps.sendAvatar).toHaveBeenCalled();
    expect(mockProps.sendAvatar).toHaveBeenCalledTimes(1);
  });
});
