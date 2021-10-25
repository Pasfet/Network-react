import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import fetchMock from 'jest-fetch-mock';

import NewsContainer from './NewsContainer';

fetchMock.enableMocks();

describe('<NewsContainer />', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  let store;
  let history;

  const mockNews = [
    {
      urlToImage: 'url',
      title: 'News post title',
      description: 'News post description',
      source: {
        name: 'name source',
      },
      url: 'urlPost.com',
    },
  ];

  const renderComponent = () => {
    history = createMemoryHistory();

    store = mockStore(() => ({
      newsPage: {
        news: mockNews,
      },
      error: {
        error: null,
      },
    }));
    return render(
      <Router history={history}>
        <Provider store={store}>
          <NewsContainer />
        </Provider>
      </Router>,
    );
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('Render newsPost', () => {
    const { getByText } = renderComponent();

    expect(getByText(mockNews[0].title)).toBeInTheDocument();
    expect(getByText(mockNews[0].description)).toBeInTheDocument();
    expect(getByText(mockNews[0].source.name)).toBeInTheDocument();
  });

  it('Link "Перейти к статье" href === "urlPost.com"', () => {
    const { getByText } = renderComponent();

    expect(getByText(/Перейти к статье/i).closest('a')).toHaveAttribute('href', mockNews[0].url);
  });
});
