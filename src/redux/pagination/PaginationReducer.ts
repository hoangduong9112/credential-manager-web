import { PaginationAction, PaginationGeneralAction } from './PaginationAction';

export interface PaginationReduxState {
  total: number;
}

export const INITIAL_Pagination_STATE: PaginationReduxState = {
  total: 0,
};

export const PaginationReducer = (
  state = INITIAL_Pagination_STATE,
  action: PaginationGeneralAction<any>,
): PaginationReduxState => {
  switch (action.type) {
    case PaginationAction.CHANGE_TOTAL: {
      return {
        ...state,
        total: action.payload,
      };
    }
    default:
      return state;
  }
};
