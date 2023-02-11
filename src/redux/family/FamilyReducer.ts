import {FamilyInfo} from '../../types/family';
import {FamilyAction, FamilyGeneralAction} from './FamilyAction';
import * as _ from 'lodash';
export interface FamilyReduxState {
	listFamily: FamilyInfo[];
}

export const INITIAL_FAMILY_STATE: FamilyReduxState = {
	listFamily: [
		{
			id: '1',
			address: 'Hà Nội',
			soTVien: 1,
			contact: 'duonghoang9112@gmail.com',
			ownerId: '1',
			absentNumber: 0,
		},
		{
			id: '2',
			address: 'Hà Nội',
			soTVien: 1,
			contact: 'minhtuyen@gmail.com',
			ownerId: '2',
			absentNumber: 0,
		},
		{
			id: '3',
			address: 'Hà Nội',
			soTVien: 1,
			contact: 'ngocquan@gmail.com',
			ownerId: '3',
			absentNumber: 0,
		},
		{
			id: '4',
			address: 'Hà Nội',
			soTVien: 1,
			contact: 'linhvu@gmail.com',
			ownerId: '4',
			absentNumber: 0,
		},
		{
			id: '5',
			address: 'Hà Nội',
			soTVien: 1,
			contact: 'dung@gmail.com',
			ownerId: '5',
			absentNumber: 0,
		},
	],
};

const FamilyReducer = (state = INITIAL_FAMILY_STATE, action: FamilyGeneralAction<any>): FamilyReduxState => {
	switch (action.type) {
		case FamilyAction.ADD_FAMILY: {
			return {
				...state,
				listFamily: [...state.listFamily, action.payload],
			};
		}
		case FamilyAction.EDIT_FAMILY: {
			const index = _.findIndex(state.listFamily, (o) => o.id === action.payload.id);
			const editedListFamily = [...state.listFamily];
			editedListFamily[index] = action.payload.family;
			return {
				...state,
				listFamily: editedListFamily,
			};
		}
		case FamilyAction.DELETE_FAMILY: {
			const editedListFamily = state.listFamily.filter((family) => family.id !== action.payload);
			return {
				...state,
				listFamily: editedListFamily,
			};
		}
		default:
			return state;
	}
};

export default FamilyReducer;
