export enum ErrorSearchAction {
  SET_CURRENT_ERROR_SEARCH = 'SET_CURRENT_ERROR_SEARCH',
}

export interface ErrorSearchGeneralAction<T> {
  type: ErrorSearchAction;
  payload: T;
}

export const setCurrentErrorSearch = (
  ErrorSearch: string[],
): ErrorSearchGeneralAction<string[]> => {
  return {
    type: ErrorSearchAction.SET_CURRENT_ERROR_SEARCH,
    payload: ErrorSearch,
  };
};
