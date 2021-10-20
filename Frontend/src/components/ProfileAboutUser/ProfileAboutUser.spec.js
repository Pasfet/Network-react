import { render } from '@testing-library/react';
import ProfileAboutUser from './ProfileAboutUser';

describe('<ProfileAboutUser />', () => {
  const renderComponent = props => {
    return render(<ProfileAboutUser {...props} />);
  };

  it('Render table aboutUser', () => {
    const { getByText } = renderComponent({
      about: {
        lang: { text: 'Language', payload: 'Eng' },
        site: { text: 'Site', payload: 'www.site.com' },
      },
    });

    expect(getByText(/Language$/i)).toBeInTheDocument();
    expect(getByText(/Eng$/i)).toBeInTheDocument();
    expect(getByText(/Site$/i)).toBeInTheDocument();
    expect(getByText(/www\.site\.com/i)).toBeInTheDocument();
  });
});
