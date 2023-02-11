import {PersonInfo} from '../../types/person';

export enum PersonAction {
	ADD_PERSON = 'ADD_PERSON',
	EDIT_PERSON = 'EDIT_PERSON',
	DELETE_PERSON = 'DELETE_PERSON',
}

export interface PersonGeneralAction<T> {
	type: PersonAction;
	payload: T;
}

export interface EditPayload {
	id?: string;
	person: PersonInfo;
}

export const addPersonAction = (person: PersonInfo): PersonGeneralAction<PersonInfo> => {
	return {type: PersonAction.ADD_PERSON, payload: person};
};

export const editPersonAction = (payload: EditPayload): PersonGeneralAction<EditPayload> => {
	return {type: PersonAction.EDIT_PERSON, payload};
};

export const deletePersonAction = (id: string): PersonGeneralAction<string> => {
	return {type: PersonAction.DELETE_PERSON, payload: id};
};
