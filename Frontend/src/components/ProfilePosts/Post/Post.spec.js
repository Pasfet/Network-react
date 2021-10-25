import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Post from './Post';

describe('<Post />', () => {
  let history;

  const mockProps = {
    post: {
      author_uid: 'id1',
      author_avatar: null,
      author_name: 'name',
      text: 'Post text',
      id: '1',
    },
    myUid: 'id1',
    uid: '',
    deletePost: jest.fn(),
  };

  const renderComponent = props => {
    history = createMemoryHistory();
    history.push = jest.fn();

    return render(
      <Router history={history}>
        <Post {...props} />
      </Router>,
    );
  };

  it('Render post text', () => {
    const { getByText } = renderComponent(mockProps);

    expect(getByText(mockProps.post.text)).toBeInTheDocument();
  });

  it('Render alt text', () => {
    const { getByAltText } = renderComponent(mockProps);

    expect(getByAltText(mockProps.post.author_name)).toBeInTheDocument();
  });

  it('Render deletePostButton if myUid === authorUid', () => {
    const { getByTestId } = renderComponent(mockProps);

    expect(getByTestId('deletePostButton')).toBeInTheDocument();
  });

  it('Does not render deletePostButton if myUid !== authorUid', () => {
    const { queryByTestId } = renderComponent({
      ...mockProps,
      post: { ...mockProps.post, author_uid: 'id2' },
    });

    expect(queryByTestId('deletePostButton')).not.toBeInTheDocument();
  });

  it('Render deletePostButton if myUid === uid', () => {
    const { getByTestId } = renderComponent({
      ...mockProps,
      post: { ...mockProps.post, author_uid: 'id2' },
      uid: 'id1',
    });

    expect(getByTestId('deletePostButton')).toBeInTheDocument();
  });

  it('Does not render deletePostButton if myUid !== uid', () => {
    const { queryByTestId } = renderComponent({
      ...mockProps,
      post: { ...mockProps.post, author_uid: 'id2' },
    });

    expect(queryByTestId('deletePostButton')).not.toBeInTheDocument();
  });

  it('Called deletePost when click on deletePostButton', () => {
    const { getByTestId } = renderComponent(mockProps);

    fireEvent.click(getByTestId('deletePostButton'));

    expect(mockProps.deletePost).toHaveBeenCalledWith(mockProps.post.id);
  });

  it('Push to="/profile/:authorUid" when click on PostAuthorName', () => {
    const { getByText } = renderComponent(mockProps);

    fireEvent.click(getByText(mockProps.post.author_name));

    expect(history.push).toHaveBeenCalledWith('/profile/id1');
  });
});
