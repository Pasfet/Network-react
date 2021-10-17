import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import React from 'react';

import SnackbarAlert from './SnackbarAlert';

describe('<SnackbarAlert />', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  const renderComponent = props => {
    const store = mockStore(() => {});
    return render(
      <Provider store={store}>
        <SnackbarAlert />
      </Provider>,
    );
  };

  it('If snackMessage does not empty, setOpen was called with true', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);
    renderComponent({ snackMessage: 'Message' });

    expect(setState).toHaveBeenCalledTimes(1);
    expect(setState).toHaveBeenCalledWith(true);
  });
});
