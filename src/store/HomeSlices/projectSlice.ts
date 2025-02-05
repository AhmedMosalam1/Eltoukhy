import { ProjectType } from "@/Types/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
type InitialState = {
  data: ProjectType[];
  isLoading: boolean;
  error: string | undefined;
};
let initialState: InitialState = {
  data: [],
  isLoading: false,
  error: "",
};
export let ProjectFunc = createAsyncThunk("Project/getData", async () => {
  try {
    let res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}glass/api/project/getall`
    );
    return res?.data?.data?.documents;
  } catch (error: any) {
    throw new Error(error?.message);
  }
});
export let Projectslice = createSlice({
  name: "Project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ProjectFunc.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ProjectFunc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(ProjectFunc.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});
export default Projectslice.reducer;
