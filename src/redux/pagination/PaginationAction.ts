export enum PaginationAction {
  CHANGE_TOTAL = 'CHANGE_TOTAL',
}

export interface PaginationGeneralAction<T> {
  type: PaginationAction;
  payload: T;
}

export const setTotal = (total: number): PaginationGeneralAction<number> => {
  return { type: PaginationAction.CHANGE_TOTAL, payload: total };
};
