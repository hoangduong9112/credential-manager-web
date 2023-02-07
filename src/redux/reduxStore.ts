import { createStore, combineReducers, compose } from 'redux';
import FamilyReducer, { FamilyReduxState } from './family/FamilyReducer';
import {
  PageRenderingReducer,
  PageRenderingReduxState,
} from './pageRendering/PageRenderingReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import EventFundingReducer, {
  EventFundingReduxState,
} from './eventFunding/EventFundingReducer';
import ErrorSearchReducer, {
  ErrorSearchReduxState,
} from './errorSearch/ErrorSearchReducer';
import {
  PaginationReducer,
  PaginationReduxState,
} from './pagination/PaginationReducer';
import PersonReducer, { PersonReduxState } from './person/PersonReducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface RootState {
  family: FamilyReduxState;
  pageRendering: PageRenderingReduxState;
  pagination: PaginationReduxState;
  eventFunding: EventFundingReduxState;
  errorSearch: ErrorSearchReduxState;
  person: PersonReduxState;
}

const rootReducer = combineReducers({
  family: FamilyReducer,
  pageRendering: PageRenderingReducer,
  pagination: PaginationReducer,
  eventFunding: EventFundingReducer,
  errorSearch: ErrorSearchReducer,
  person: PersonReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
