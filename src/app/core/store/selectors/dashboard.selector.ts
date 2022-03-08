import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DashboardInterface } from 'src/app/shared/types/store.interfaces';

export const dashboardFeatureSelector = createFeatureSelector<DashboardInterface>('profile');

export const profileSelector = createSelector(
  dashboardFeatureSelector,
  (profile: DashboardInterface) => profile
);
