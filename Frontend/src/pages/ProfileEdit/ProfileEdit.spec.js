import { render, fireEvent } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import ProfileEdit from './ProfileEdit';

describe('<ProfileEdit />', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const renderComponent = store => {
    const history = createMemoryHistory();

    return render(
      <Router history={history}>
        <Provider store={store}>
          <ProfileEdit />
        </Provider>
      </Router>,
    );
  };

  it('Render aboutItemLabel', () => {
    const state = mockStore(() => ({
      profilePage: {
        uid: 'id1',
        user: {
          about: {
            birthday: { text: 'День рождения', payload: '' },
            city: { text: 'Город', payload: 'Moscow' },
            site: { text: 'Сайт', payload: 'site.com' },
            language: { text: 'Языки', payload: '' },
          },
        },
      },
      error: {
        error: null,
      },
    }));

    const { getByText } = renderComponent(state);

    expect(getByText(/Дата рождения/i)).toBeInTheDocument();
    expect(getByText(/Город/i)).toBeInTheDocument();
    expect(getByText(/Ваш сайт/i)).toBeInTheDocument();
    expect(getByText(/Языки/i)).toBeInTheDocument();
  });

  it('Render valueInputs', () => {
    const state = mockStore(() => ({
      profilePage: {
        uid: 'id1',
        user: {
          about: {
            birthday: { text: 'День рождения', payload: '' },
            city: { text: 'Город', payload: 'Moscow' },
            site: { text: 'Сайт', payload: 'site.com' },
            language: { text: 'Языки', payload: '' },
          },
        },
      },
      error: {
        error: null,
      },
    }));
    const { getByDisplayValue, getByTestId } = renderComponent(state);

    expect(getByTestId('birthdayInput').querySelector('input').value).toBe('');
    expect(getByDisplayValue('Moscow')).toBeInTheDocument();
    expect(getByDisplayValue('site.com')).toBeInTheDocument();
    expect(getByTestId('langInput').querySelector('input').value).toBe('');
  });

  it('Change birthdayInput', () => {
    const state = mockStore(() => ({
      profilePage: {
        uid: 'id1',
        user: {
          about: {
            birthday: { text: 'День рождения', payload: '' },
            city: { text: 'Город', payload: 'Moscow' },
            site: { text: 'Сайт', payload: 'site.com' },
            language: { text: 'Языки', payload: '' },
          },
        },
      },
      error: {
        error: null,
      },
    }));
    const { getByDisplayValue, getByTestId } = renderComponent(state);

    fireEvent.change(getByTestId('birthdayInput').querySelector('input'), {
      target: { value: 'mail' },
    });

    expect(getByDisplayValue('mail')).toBeInTheDocument();
  });

  it('Change cityInput', () => {
    const state = mockStore(() => ({
      profilePage: {
        uid: 'id1',
        user: {
          about: {
            birthday: { text: 'День рождения', payload: '' },
            city: { text: 'Город', payload: 'Moscow' },
            site: { text: 'Сайт', payload: 'site.com' },
            language: { text: 'Языки', payload: '' },
          },
        },
      },
      error: {
        error: null,
      },
    }));
    const { getByDisplayValue, getByTestId } = renderComponent(state);

    fireEvent.change(getByTestId('cityInput').querySelector('input'), {
      target: { value: 'TestCity' },
    });

    expect(getByDisplayValue('TestCity')).toBeInTheDocument();
  });

  it('Change siteInput', () => {
    const state = mockStore(() => ({
      profilePage: {
        uid: 'id1',
        user: {
          about: {
            birthday: { text: 'День рождения', payload: '' },
            city: { text: 'Город', payload: 'Moscow' },
            site: { text: 'Сайт', payload: 'site.com' },
            language: { text: 'Языки', payload: '' },
          },
        },
      },
      error: {
        error: null,
      },
    }));
    const { getByDisplayValue, getByTestId } = renderComponent(state);

    fireEvent.change(getByTestId('siteInput').querySelector('input'), {
      target: { value: 'www.site.com' },
    });

    expect(getByDisplayValue('www.site.com')).toBeInTheDocument();
  });

  it('Change langInput', () => {
    const state = mockStore(() => ({
      profilePage: {
        uid: 'id1',
        user: {
          about: {
            birthday: { text: 'День рождения', payload: '' },
            city: { text: 'Город', payload: 'Moscow' },
            site: { text: 'Сайт', payload: 'site.com' },
            language: { text: 'Языки', payload: '' },
          },
        },
      },
      error: {
        error: null,
      },
    }));
    const { getByDisplayValue, getByTestId } = renderComponent(state);

    fireEvent.change(getByTestId('langInput').querySelector('input'), {
      target: { value: 'English' },
    });

    expect(getByDisplayValue('English')).toBeInTheDocument();
  });

  it('Render error', () => {
    const state = mockStore(() => ({
      profilePage: {
        uid: 'id1',
        user: {
          about: {
            birthday: { text: 'День рождения', payload: '' },
            city: { text: 'Город', payload: 'Moscow' },
            site: { text: 'Сайт', payload: 'site.com' },
            language: { text: 'Языки', payload: '' },
          },
        },
      },
      error: {
        error: { message: 'Failed to fetch', type: 'error' },
      },
    }));
    const { getByText } = renderComponent(state);

    expect(getByText(/Failed to fetch/i)).toBeInTheDocument();
  });
});
