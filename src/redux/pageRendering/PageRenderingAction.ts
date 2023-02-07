import { PageRender } from '../../types/page';

export enum PageRenderingAction {
  CHANGE_PAGE_RENDER = 'CHANGE_PAGE_RENDER',
}

export interface PageRenderingGeneralAction<T> {
  type: PageRenderingAction;
  payload?: T;
}

export const setPageRendering = (
  page?: PageRender,
): PageRenderingGeneralAction<PageRender> => {
  return { type: PageRenderingAction.CHANGE_PAGE_RENDER, payload: page };
};
