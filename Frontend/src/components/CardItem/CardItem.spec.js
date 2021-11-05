import { render } from '@testing-library/react';
import CardItem from './CardItem';

describe('<CardItem />', () => {
  const mockProps = {
    post: {
      image: 'url',
      title: 'News post title',
      description: 'News post description',
      source: 'source',
      url: 'urlPost.com',
      published_at: '54',
    },
  };

  const renderComponent = () => {
    return render(<CardItem {...mockProps} />);
  };

  it('Render posts', () => {
    const { getByText } = renderComponent();

    expect(getByText(mockProps.post.title)).toBeInTheDocument();
    expect(getByText(mockProps.post.description)).toBeInTheDocument();
    expect(getByText(mockProps.post.source)).toBeInTheDocument();
  });

  it('Link href === "urlPost.com"', () => {
    const { getByText } = renderComponent();

    expect(getByText(/Перейти к статье/i).closest('a')).toHaveAttribute('href', mockProps.post.url);
  });

  it('Alt text image === title', () => {
    const { getByAltText } = renderComponent();

    expect(getByAltText(mockProps.post.title)).toBeInTheDocument();
  });
});
