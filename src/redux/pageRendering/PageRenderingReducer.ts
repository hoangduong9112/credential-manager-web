import { PageRender } from '../../types/page';
import {
  PageRenderingAction,
  PageRenderingGeneralAction,
} from './PageRenderingAction';

export interface PageRenderingReduxState {
  currentPageRendering?: PageRender;
}

export const INITIAL_PageRendering_STATE: PageRenderingReduxState = {
  currentPageRendering: PageRender.LIST_CREDENTIAL,
};

export const PageRenderingReducer = (
  state = INITIAL_PageRendering_STATE,
  action: PageRenderingGeneralAction<any>,
): PageRenderingReduxState => {
  switch (action.type) {
    case PageRenderingAction.CHANGE_PAGE_RENDER: {
      return {
        ...state,
        currentPageRendering: action.payload,
      };
    }
    default:
      return state;
  }
};
