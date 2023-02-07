import { FamilyInfo } from '../../types/family';
import { PersonStatus } from '../../types/person';
import { FamilyAction, FamilyGeneralAction } from './FamilyAction';

export interface FamilyReduxState {
  currentFamily: FamilyInfo;
  currentListFamily: FamilyInfo[];
}

export const INITIAL_FAMILY_STATE: FamilyReduxState = {
  currentFamily: {
    id: '1',
    address: '39 Dich Vong Cau Giay',
    soTVien: 4,
    contact: '0981497748',
    owner: 'Le Hai Thanh',
    members: [
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
  },
  currentListFamily: [],
};

const FamilyReducer = (
  state = INITIAL_FAMILY_STATE,
  action: FamilyGeneralAction<any>,
): FamilyReduxState => {
  switch (action.type) {
    case FamilyAction.EDIT_CURRENT_FAMILY: {
      return {
        ...state,
        currentFamily: action.payload,
      };
    }
    case FamilyAction.EDIT_CURRENT_LIST_FAMILY: {
      return {
        ...state,
        currentListFamily: action.payload,
      };
    }
    default:
      return state;
  }
};

export default FamilyReducer;
