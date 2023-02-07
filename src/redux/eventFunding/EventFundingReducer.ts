import { EventFundingInfo } from '../../types/eventFunding';
import {
  EventFundingAction,
  EventFundingGeneralAction,
} from './EventFundingAction';

export interface EventFundingReduxState {
  currentEventFunding: EventFundingInfo;
  currentListEventFunding: EventFundingInfo[];
}

export const INITIAL_EventFunding_STATE: EventFundingReduxState = {
  currentEventFunding: {
    id: 1,
    eventName: 'Đóng góp hội khuyến học',
    date: '15/10/2021',
    tongtien: 4,
    descriptions: '',
    listHKDG: [
      {
        address: '39 Dich Vong Cau Giay',
        tenChuHo: 'Le Hai Thanh',
        amount: 1,
        time: '15/10/2021',
      },
    ],
  },
  currentListEventFunding: [],
};

const EventFundingReducer = (
  state = INITIAL_EventFunding_STATE,
  action: EventFundingGeneralAction<any>,
): EventFundingReduxState => {
  switch (action.type) {
    case EventFundingAction.EDIT_CURRENT_EVENT_FUNDING: {
      return {
        ...state,
        currentEventFunding: action.payload,
      };
    }
    case EventFundingAction.EDIT_CURRENT_LIST_EVENT_FUNDING: {
      return {
        ...state,
        currentListEventFunding: action.payload,
      };
    }
    default:
      return state;
  }
};

export default EventFundingReducer;
