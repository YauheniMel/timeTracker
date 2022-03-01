import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/types/app-state.interface';

export const authFeatureSelector = createFeatureSelector<AppStateInterface>('auth');

export const registerData = createSelector(
  authFeatureSelector,
  (authState: AppStateInterface) => authState
);
