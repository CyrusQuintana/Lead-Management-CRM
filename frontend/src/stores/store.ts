import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import interactionsSlice from './interactions/interactionsSlice';
import leadsSlice from './leads/leadsSlice';
import organizationsSlice from './organizations/organizationsSlice';
import reportsSlice from './reports/reportsSlice';
import tasksSlice from './tasks/tasksSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import organizationSlice from './organization/organizationSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    interactions: interactionsSlice,
    leads: leadsSlice,
    organizations: organizationsSlice,
    reports: reportsSlice,
    tasks: tasksSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    organization: organizationSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
