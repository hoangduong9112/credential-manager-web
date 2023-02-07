import {
  ErrorSearchAction,
  ErrorSearchGeneralAction,
} from './ErrorSearchAction';

export interface ErrorSearchReduxState {
  currentErrorSearch: string[];
}

export const INITIAL_ERROR_SEARCH_STATE: ErrorSearchReduxState = {
  currentErrorSearch: [],
};

const ErrorSearchReducer = (
  state = INITIAL_ERROR_SEARCH_STATE,
  action: ErrorSearchGeneralAction<any>,
): ErrorSearchReduxState => {
  switch (action.type) {
    case ErrorSearchAction.SET_CURRENT_ERROR_SEARCH: {
      return {
        ...state,
        currentErrorSearch: action.payload,
      };
    }
    default:
      return state;
  }
};

export default ErrorSearchReducer;
