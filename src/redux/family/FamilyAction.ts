import {FamilyInfo} from '../../types/family';

export enum FamilyAction {
	ADD_FAMILY = 'ADD_FAMILY',
	EDIT_FAMILY = 'EDIT_FAMILY',
	DELETE_FAMILY = 'DELETE_FAMILY',
}

export interface FamilyGeneralAction<T> {
	type: FamilyAction;
	payload: T;
}

export interface EditPayload {
	id?: string;
	family: FamilyInfo;
}

export const addFamilyAction = (family: FamilyInfo): FamilyGeneralAction<FamilyInfo> => {
	return {type: FamilyAction.ADD_FAMILY, payload: family};
};

export const editFamilyAction = (payload: EditPayload): FamilyGeneralAction<EditPayload> => {
	return {type: FamilyAction.EDIT_FAMILY, payload};
};

export const deleteFamilyAction = (id: string): FamilyGeneralAction<string> => {
	return {type: FamilyAction.DELETE_FAMILY, payload: id};
};
