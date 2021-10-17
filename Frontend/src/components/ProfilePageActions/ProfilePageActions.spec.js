import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import ProfilePageActions from './ProfilePageActions';

describe('<ProfilePageActions />', () => {
  let history;

  const renderComponent = props => {
    history = createMemoryHistory();
    history.push = jest.fn();

    return render(
      <Router history={history}>
        <ProfilePageActions {...props} />
      </Router>,
    );
  };

  it('Render button "Редактировать", if uid === userUid', () => {
    const { getByText } = renderComponent({ userUid: 'id1', uid: 'id1' });

    expect(getByText(/Редактировать/i)).toBeInTheDocument();
  });

  it('Does not render button "Редактировать", if uid !== userUid', () => {
    const { queryByText } = renderComponent({ userUid: 'id1', uid: 'id2' });

    expect(queryByText(/Редактировать/i)).not.toBeInTheDocument();
  });

  it('Push to "/profile/:uid/edit" on click button', () => {
    const { getByText } = renderComponent({ userUid: 'id1', uid: 'id1' });

    fireEvent.click(getByText(/Редактировать/i));

    expect(history.push).toHaveBeenCalledWith('/profile/id1/edit');
  });
});
