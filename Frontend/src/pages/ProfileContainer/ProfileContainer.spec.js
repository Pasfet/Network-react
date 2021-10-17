import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'jest-fetch-mock';

import ProfileContainer from './ProfileContainer';
import { Provider } from 'react-redux';

fetchMock.enableMocks();

describe('<ProfileContainer />', () => {
  let history;
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const renderComponent = store => {
    history = createMemoryHistory();
    history.push('/profile/id1');
    return render(
      <Router history={history}>
        <Provider store={store}>
          <Route path="/profile/:uid">
            <ProfileContainer />
          </Route>
        </Provider>
      </Router>,
    );
  };

  it('Render userName', () => {
    let initialState = {
      profilePage: {
        uid: 'id1',
        user: { name: 'MyName', about: {} },
      },
      error: {
        error: null,
      },
    };

    const store = mockStore(() => initialState);

    const { getByText } = renderComponent(store);

    expect(getByText(/MyName/i)).toBeInTheDocument();
  });
  it('Redner button "Редактировать" if uid === userUid', () => {
    let initialState = {
      profilePage: {
        uid: 'id1',
        user: { name: 'MyName', about: {} },
      },
      error: {
        error: null,
      },
    };

    const store = mockStore(() => initialState);
    const { getByText } = renderComponent(store);

    expect(getByText(/Редактировать/i)).toBeInTheDocument();
  });
  it('Does not redner button "Редактировать" if uid === userUid', () => {
    let initialState = {
      profilePage: {
        uid: 'id2',
        user: { name: 'MyName', about: {} },
      },
      error: {
        error: null,
      },
    };

    const store = mockStore(() => initialState);
    const { queryByText } = renderComponent(store);
    const btn = queryByText('Редактировать');

    expect(btn).not.toBeInTheDocument();
  });

  it('Render status', () => {
    let initialState = {
      profilePage: {
        uid: 'id2',
        user: { name: 'MyName', about: {}, status: 'MyNewStatus' },
      },
      error: {
        error: null,
      },
    };

    const store = mockStore(() => initialState);
    const { getByText } = renderComponent(store);

    expect(getByText(/MyNewStatus/i)).toBeInTheDocument();
  });
  it('Render "Установить статус" if status is empty', () => {
    let initialState = {
      profilePage: {
        uid: 'id2',
        user: { name: 'MyName', about: {}, status: '' },
      },
      error: {
        error: null,
      },
    };

    const store = mockStore(() => initialState);
    const { getByText } = renderComponent(store);

    expect(getByText(/Установить статус/i)).toBeInTheDocument();
  });
  it('Render userAbout', () => {
    let initialState = {
      profilePage: {
        uid: 'id2',
        user: {
          name: 'MyName',
          about: {
            site: { text: 'Сайт', payload: 'www.site.com' },
            language: { text: 'Языки', payload: 'English' },
          },
          status: '',
        },
      },
      error: {
        error: null,
      },
    };

    const store = mockStore(() => initialState);
    const { getByText } = renderComponent(store);

    expect(getByText(/www\.site\.com/i)).toBeInTheDocument();
    expect(getByText(/Сайт/i)).toBeInTheDocument();
    expect(getByText(/Языки/i)).toBeInTheDocument();
    expect(getByText(/English/i)).toBeInTheDocument();
  });
  it('Render "ничего не задано" if userAbout is empty', () => {
    let initialState = {
      profilePage: {
        uid: 'id2',
        user: {
          name: 'MyName',
          about: {
            site: { text: 'Сайт', payload: 'www.site.com' },
            language: { text: 'Языки', payload: '' },
          },
          status: '',
        },
      },
      error: {
        error: null,
      },
    };

    const store = mockStore(() => initialState);
    const { getByText } = renderComponent(store);

    expect(getByText(/www\.site\.com/i)).toBeInTheDocument();
    expect(getByText(/Сайт/i)).toBeInTheDocument();
    expect(getByText(/Языки/i)).toBeInTheDocument();
    expect(getByText(/Ничего не задано/i)).toBeInTheDocument();
  });

  it('Render error', () => {
    let initialState = {
      profilePage: {
        uid: 'id2',
        user: {
          name: 'MyName',
          about: {},
          status: '',
        },
      },
      error: {
        error: { message: 'Failed to fetch', type: 'error' },
      },
    };

    const store = mockStore(() => initialState);
    const { getByText } = renderComponent(store);

    expect(getByText(/Failed to fetch/i)).toBeInTheDocument();
  });
});
