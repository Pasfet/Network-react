import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ProfilePosts from './ProfilePosts';

describe('<ProfilePosts />', () => {
  let history;

  const mockProps = {
    userPosts: [
      { author_uid: 'id1', author_avatar: null, author_name: 'name', text: 'Post text', id: '1' },
    ],
    error: '',
    setPostValue: jest.fn(),
    postValue: '',
    addPost: jest.fn(),
    myUid: 'id1',
    uid: 'id1',
    deletePost: jest.fn(),
  };

  const renderComponent = props => {
    history = createMemoryHistory();

    return render(
      <Router history={history}>
        <ProfilePosts {...props} />
      </Router>,
    );
  };

  it('Render Post', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText(/Post text/i)).toBeInTheDocument();
    expect(getByText(/name/i)).toBeInTheDocument();
  });

  it('Render Error', () => {
    const { getByText } = renderComponent({ ...mockProps, error: 'Error' });

    expect(getByText(/error/i)).toBeInTheDocument();
  });

  it('Called setPostValue when change form value', () => {
    const { getByPlaceholderText } = renderComponent(mockProps);

    fireEvent.change(getByPlaceholderText(/Введите сообщение поста/i), {
      target: { value: 'wds' },
    });

    expect(mockProps.setPostValue).toHaveBeenCalledWith('wds');
  });

  it('Called addPost when submit form', () => {
    const { getByText, getByPlaceholderText } = renderComponent({
      ...mockProps,
      postValue: 'value',
    });
    expect(getByPlaceholderText(/Введите сообщение поста/i).value).toBe('value');

    fireEvent.submit(getByText(/Отправить/i));

    expect(mockProps.addPost).toHaveBeenCalled();
  });
});
