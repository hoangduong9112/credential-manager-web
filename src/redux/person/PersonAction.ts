import { PersonInfo } from '../../types/person';

export enum PersonAction {
  EDIT_CURRENT_LIST_PEOPLE = 'EDIT_CURRENT_LIST_PEOPLE',
}

export interface PersonGeneralAction<T> {
  type: PersonAction;
  payload: T;
}

export const setCurrentListPeople = (
  people: PersonInfo[],
): PersonGeneralAction<PersonInfo[]> => {
  return { type: PersonAction.EDIT_CURRENT_LIST_PEOPLE, payload: people };
};
