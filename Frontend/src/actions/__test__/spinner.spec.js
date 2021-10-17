import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import spinnerReducer from '../../store/SpinnerReducer/spinnerReducer';
import { loadingFalse, loadingTrue } from '../spinnerActions';
import { LOADING_FALSE, LOADING_TRUE } from '../../store/types/spinnerTypes';

describe('Spinner actions', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  let initialState = {
    loading: false,
  };

  it('Call loadingTrue()', () => {
    const store = mockStore(() => initialState);

    store.dispatch(loadingTrue());
    const actions = store.getActions().map(({ type }) => ({ type }));

    expect(actions).toEqual([{ type: LOADING_TRUE }]);
  });
  it('Change loading:false on loading:true in reducer', () => {
    const store = mockStore(() => initialState);

    store.dispatch(loadingTrue());
    const actions = store.getActions().map(({ type }) => ({ type }));

    actions.forEach(action => {
      initialState = spinnerReducer(initialState, action);
    });

    expect(initialState).toEqual({
      ...initialState,
      loading: true,
    });
  });

  it('loadingFalse()', () => {
    const store = mockStore(() => initialState);

    store.dispatch(loadingFalse());
    const actions = store.getActions().map(({ type }) => ({ type }));

    expect(actions).toEqual([{ type: LOADING_FALSE }]);
  });
  it('Change loading:true on loading:false in reducer', () => {
    initialState = {
      loading: true,
    };
    const store = mockStore(() => initialState);

    store.dispatch(loadingFalse());
    const actions = store.getActions().map(({ type }) => ({ type }));

    actions.forEach(action => {
      initialState = spinnerReducer(initialState, action);
    });

    expect(initialState).toEqual({
      ...initialState,
      loading: false,
    });
  });
});
