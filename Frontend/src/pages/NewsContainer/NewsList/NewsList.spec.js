import { render } from '@testing-library/react';
import NewsList from './NewsList';

describe('<NewsList />', () => {
  const mockProps = {
    news: [
      {
        image: 'url',
        title: 'News post title',
        description: 'News post description',
        source: 'source',
        url: 'urlPost.com',
        published_at: '128',
      },
    ],
    fetchMoreNews: jest.fn(),
  };

  const renderComponent = () => {
    return render(<NewsList {...mockProps} />);
  };

  it('Render posts', () => {
    const { getByText } = renderComponent();

    expect(getByText(mockProps.news[0].title)).toBeInTheDocument();
    expect(getByText(mockProps.news[0].description)).toBeInTheDocument();
    expect(getByText(mockProps.news[0].source)).toBeInTheDocument();
  });
});
