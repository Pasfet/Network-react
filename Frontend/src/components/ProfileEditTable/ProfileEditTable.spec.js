import { render, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import ProfileEditTable from './ProfileEditTable';

describe('<ProfileEditTable />', () => {
  const renderComponent = props => {
    const history = createMemoryHistory();

    return render(
      <Router history={history}>
        <ProfileEditTable {...props} />
      </Router>,
    );
  };

  const mockProps = {
    birthday: '',
    setBirthday: jest.fn(),
    city: '',
    setCity: jest.fn(),
    site: '',
    setSite: jest.fn(),
    language: '',
    setLanguage: jest.fn(),
    sendAbout: jest.fn(),
    error: '',
  };

  it('Render placeholders', () => {
    const { getByPlaceholderText } = renderComponent(mockProps);

    expect(getByPlaceholderText(/Дата рождения/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Город/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Ваш сайт/i)).toBeInTheDocument();
    expect(getByPlaceholderText(/Языки/i)).toBeInTheDocument();
  });
  it('Render birthdayInput value', () => {
    const { getByDisplayValue } = renderComponent({ ...mockProps, birthday: '22.03' });

    expect(getByDisplayValue('22.03')).toBeInTheDocument();
  });
  it('Call setBirthday', () => {
    const { getByTestId } = renderComponent({ ...mockProps, birthday: '' });

    fireEvent.change(getByTestId('birthdayInput').querySelector('input'), {
      target: { value: '14.05' },
    });

    expect(mockProps.setBirthday).toHaveBeenCalledWith('14.05');
  });
  it('Render cityInput value', () => {
    const { getByDisplayValue } = renderComponent({ ...mockProps, city: 'Moscow' });

    expect(getByDisplayValue('Moscow')).toBeInTheDocument();
  });
  it('Call setCity', () => {
    const { getByTestId } = renderComponent({ ...mockProps, city: '' });

    fireEvent.change(getByTestId('cityInput').querySelector('input'), {
      target: { value: 'Tver' },
    });

    expect(mockProps.setCity).toHaveBeenCalledWith('Tver');
  });
  it('Render siteInput value', () => {
    const { getByDisplayValue } = renderComponent({ ...mockProps, site: 'site' });

    expect(getByDisplayValue('site')).toBeInTheDocument();
  });
  it('Call setSite', () => {
    const { getByTestId } = renderComponent({ ...mockProps, site: '' });

    fireEvent.change(getByTestId('siteInput').querySelector('input'), {
      target: { value: 'www.email.com' },
    });

    expect(mockProps.setSite).toHaveBeenCalledWith('www.email.com');
  });
  it('Render langInput value', () => {
    const { getByDisplayValue } = renderComponent({ ...mockProps, language: 'English' });

    expect(getByDisplayValue('English')).toBeInTheDocument();
  });
  it('Call setLanguage', () => {
    const { getByTestId } = renderComponent({ ...mockProps, language: '' });

    fireEvent.change(getByTestId('langInput').querySelector('input'), {
      target: { value: 'Russian' },
    });

    expect(mockProps.setLanguage).toHaveBeenCalledWith('Russian');
  });
  it('Call sendAbout', () => {
    const { getByText } = renderComponent(mockProps);

    fireEvent.click(getByText(/Сохранить/i));

    expect(mockProps.sendAbout).toHaveBeenCalled();
  });
  it('Render error', () => {
    const { getByText } = renderComponent({ ...mockProps, error: 'Error' });

    expect(getByText(/Error/i)).toBeInTheDocument();
  });
});
