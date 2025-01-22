import { configureStore } from "@reduxjs/toolkit";
import bannerSlice from "./HomeSlices/bannersSlice";
import ServicesSlice from "./HomeSlices/servicesSlice";
import SuppliersSlice from "./HomeSlices/suppliersSlice";
import Projectslice from "./HomeSlices/projectSlice";
import LoginSlice from "./AuthSlices/loginSlice";
import addBannerSlice from "./DashboardSlices/addBanner";
import addServicesSlice from "./DashboardSlices/addServices";
import addSupplierSlice from "./DashboardSlices/addSupplier";
import addProjectSlice from "./DashboardSlices/addProject";

export const store = configureStore({
  reducer: {
    banners: bannerSlice,
    services: ServicesSlice,
    suppliers: SuppliersSlice,
    projects: Projectslice,
    login: LoginSlice,
    addBanner: addBannerSlice,
    addServices: addServicesSlice,
    addSupplier: addSupplierSlice,
    addProject: addProjectSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
