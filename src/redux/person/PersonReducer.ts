import {PersonInfo} from '../../types/person';
import {PersonStatus} from '../../types/person';
import {PersonAction, PersonGeneralAction} from './PersonAction';
import * as _ from 'lodash';

export interface PersonReduxState {
	listPeople: PersonInfo[];
}

export const INITIAL_PERSON_STATE: PersonReduxState = {
	listPeople: [
		{
			id: '1',
			familyId: '1',
			canCuocCongDan: '001100110011',
			name: 'Dương',
			address: 'Cầu Giấy',
			dateOfBirth: '2020-01-01',
			gender: 'male',
			job: 'Học sinh',
			relationship: 'Chủ hộ',
			status: PersonStatus.LIVE,
			image: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
			phoneNumber: '',
		},
		{
			id: '2',
			familyId: '2',
			canCuocCongDan: '001100110011',
			name: 'Tuyên',
			address: 'Cầu Giấy',
			dateOfBirth: '2020-01-01',
			gender: 'male',
			job: 'Học sinh',
			relationship: 'Chủ hộ',
			status: PersonStatus.LIVE,
			image: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
			phoneNumber: '',
		},
		{
			id: '3',
			familyId: '3',
			canCuocCongDan: '001100110011',
			name: 'Quân',
			address: 'Cầu Giấy',
			dateOfBirth: '2020-01-01',
			gender: 'male',
			job: 'Học sinh',
			relationship: 'Chủ hộ',
			status: PersonStatus.LIVE,
			image: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
			phoneNumber: '',
		},
		{
			id: '4',
			familyId: '4',
			canCuocCongDan: '001100110011',
			name: 'Linh',
			address: 'Cầu Giấy',
			dateOfBirth: '2020-01-01',
			gender: 'male',
			job: 'Học sinh',
			relationship: 'Chủ hộ',
			status: PersonStatus.LIVE,
			image: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
			phoneNumber: '',
		},
		{
			id: '5',
			familyId: '5',
			canCuocCongDan: '001100110011',
			name: 'Dũng',
			address: 'Cầu Giấy',
			dateOfBirth: '2020-01-01',
			gender: 'male',
			job: 'Học sinh',
			relationship: 'Chủ hộ',
			status: PersonStatus.LIVE,
			image: 'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
			phoneNumber: '',
		},
	],
};

const PersonReducer = (state = INITIAL_PERSON_STATE, action: PersonGeneralAction<any>): PersonReduxState => {
	switch (action.type) {
		case PersonAction.ADD_PERSON: {
			return {
				...state,
				listPeople: [...state.listPeople, action.payload],
			};
		}
		case PersonAction.EDIT_PERSON: {
			const index = _.findIndex(state.listPeople, (o) => o.id === action.payload.id);
			const editedListPeople = [...state.listPeople];
			editedListPeople[index] = action.payload.person;
			return {
				...state,
				listPeople: editedListPeople,
			};
		}
		case PersonAction.DELETE_PERSON: {
			const editedListPeople = [...state.listPeople];
			editedListPeople.splice(action.payload.id, 1);
			return {
				...state,
				listPeople: editedListPeople,
			};
		}
		default:
			return state;
	}
};

export default PersonReducer;
