import { PersonInfo } from '../../types/person';
import { PersonStatus } from '../../types/person';
import { PersonAction, PersonGeneralAction } from './PersonAction';

export interface PersonReduxState {
  currentListPeople: PersonInfo[];
}

export const INITIAL_PERSON_STATE: PersonReduxState = {
  currentListPeople: [
    {
      id: 2,
      canCuocCongDan: '001100110011',
      firstName: 'Thành',
      lastName: 'Lê Hải',
      address: 'Cầu Giấy',
      dateOfBirth: '2020-01-01',
      gender: 'male',
      job: 'Học sinh',
      relationship: 'Chủ hộ',
      specialNotes: 'không',
      status: PersonStatus.LIVE,
      image:
        'https://vnn-imgs-a1.vgcloud.vn/image1.ictnews.vn/_Files/2020/03/17/trend-avatar-1.jpg',
      phoneNumber: '',
      idSHKSoHuu: '',
    },
  ],
};

const PersonReducer = (
  state = INITIAL_PERSON_STATE,
  action: PersonGeneralAction<any>,
): PersonReduxState => {
  switch (action.type) {
    case PersonAction.EDIT_CURRENT_LIST_PEOPLE: {
      return {
        ...state,
        currentListPeople: action.payload,
      };
    }
    default:
      return state;
  }
};

export default PersonReducer;
