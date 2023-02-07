import { FamilyInfo } from '../../types/family';

export enum FamilyAction {
  ADD_FAMILY = 'ADD_FAMILY',
  EDIT_CURRENT_FAMILY = 'EDIT_CURRENT_FAMILY',
  EDIT_CURRENT_LIST_FAMILY = 'EDIT_CURRENT_LIST_FAMILY',
}

export interface FamilyGeneralAction<T> {
  type: FamilyAction;
  payload: T;
}

export const setCurrentFamily = (
  family: FamilyInfo,
): FamilyGeneralAction<FamilyInfo> => {
  return { type: FamilyAction.EDIT_CURRENT_FAMILY, payload: family };
};

export const setCurrentListFamily = (
  families: FamilyInfo[],
): FamilyGeneralAction<FamilyInfo[]> => {
  return { type: FamilyAction.EDIT_CURRENT_LIST_FAMILY, payload: families };
};
