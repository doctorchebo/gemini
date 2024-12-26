import { Action } from '@ngrx/store';

export const SET_DARK_MODE = '[Home] Set Dark Mode';

export class SetDarkMode implements Action {
  readonly type = SET_DARK_MODE;
  constructor(public payload: boolean) {}
}

export type HomeActions = SetDarkMode;
