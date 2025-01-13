import { ValidationError } from "../../types/userTypes.ts";
import { createSlice } from "@reduxjs/toolkit";
import {
  approveJoinToCourseGroup,
  createCourse,
  declineJoinToCourseGroup,
  deleteCourse,
  editCourse,
  fetchCourses,
  fetchSearchCourses,
  getOneCourse,
  joinToCourseGroup,
  migrateToAnotherCourseGroup,
} from "./coursesThunks.ts";
import { ICourse } from "../../types/courseTypes.ts";

export interface CoursesState {
  courses: ICourse[];
  searchCourses: ICourse[];
  coursesLoading: boolean;
  searchCoursesLoading: boolean;
  isCreating: boolean;
  oneCourse: ICourse | null;
  oneCourseLoading: boolean;
  updateLoading: boolean;
  isCourseError: ValidationError | null;
  deleteCourseLoading: false | string;
  addingToCourse: string | false;
  waitListManageLoading: string | false;
}

const initialState: CoursesState = {
  courses: [],
  searchCourses: [],
  coursesLoading: false,
  searchCoursesLoading: false,
  isCreating: false,
  oneCourse: null,
  oneCourseLoading: false,
  updateLoading: false,
  isCourseError: null,
  deleteCourseLoading: false,
  addingToCourse: false,
  waitListManageLoading: false,
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    resetSearchCourses: (state) => {
      state.searchCourses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCourse.pending, (state) => {
        state.isCreating = true;
        state.isCourseError = null;
      })
      .addCase(createCourse.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createCourse.rejected, (state, { payload: error }) => {
        state.isCreating = false;
        state.isCourseError = error || null;
      });

    builder
      .addCase(fetchCourses.pending, (state) => {
        state.coursesLoading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, { payload: courses }) => {
        state.courses = courses;
        state.coursesLoading = false;
      })
      .addCase(fetchCourses.rejected, (state) => {
        state.coursesLoading = false;
      });

    builder
      .addCase(fetchSearchCourses.pending, (state) => {
        state.searchCoursesLoading = true;
      })
      .addCase(fetchSearchCourses.fulfilled, (state, { payload: courses }) => {
        state.searchCourses = courses;
        state.searchCoursesLoading = false;
      })
      .addCase(fetchSearchCourses.rejected, (state) => {
        state.searchCoursesLoading = false;
      });

    builder
      .addCase(getOneCourse.pending, (state) => {
        state.oneCourseLoading = true;
        state.oneCourse = null;
      })
      .addCase(getOneCourse.fulfilled, (state, { payload: oneCourse }) => {
        state.oneCourse = oneCourse;
        state.oneCourseLoading = false;
      })
      .addCase(getOneCourse.rejected, (state) => {
        state.oneCourseLoading = false;
      });

    builder
      .addCase(editCourse.pending, (state) => {
        state.updateLoading = true;
        state.isCourseError = null;
      })
      .addCase(editCourse.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(editCourse.rejected, (state, { payload: error }) => {
        state.updateLoading = false;
        state.isCourseError = error || null;
      });

    builder
      .addCase(joinToCourseGroup.pending, (state, { meta: { arg } }) => {
        state.addingToCourse = arg.groupId;
      })
      .addCase(joinToCourseGroup.fulfilled, (state) => {
        state.addingToCourse = false;
      })
      .addCase(joinToCourseGroup.rejected, (state) => {
        state.addingToCourse = false;
      });

    builder
      .addCase(
        migrateToAnotherCourseGroup.pending,
        (state, { meta: { arg } }) => {
          state.addingToCourse = arg.groupId;
        },
      )
      .addCase(migrateToAnotherCourseGroup.fulfilled, (state) => {
        state.addingToCourse = false;
      })
      .addCase(migrateToAnotherCourseGroup.rejected, (state) => {
        state.addingToCourse = false;
      });
    builder
      .addCase(approveJoinToCourseGroup.pending, (state, { meta: { arg } }) => {
        state.waitListManageLoading = arg.waitListId;
      })
      .addCase(approveJoinToCourseGroup.fulfilled, (state) => {
        state.waitListManageLoading = false;
      })
      .addCase(approveJoinToCourseGroup.rejected, (state) => {
        state.waitListManageLoading = false;
      });
    builder
      .addCase(declineJoinToCourseGroup.pending, (state, { meta: { arg } }) => {
        state.waitListManageLoading = arg.waitListId;
      })
      .addCase(declineJoinToCourseGroup.fulfilled, (state) => {
        state.waitListManageLoading = false;
      })
      .addCase(declineJoinToCourseGroup.rejected, (state) => {
        state.waitListManageLoading = false;
      });

    builder
      .addCase(deleteCourse.pending, (state, { meta: { arg: course } }) => {
        state.deleteCourseLoading = course;
      })
      .addCase(deleteCourse.fulfilled, (state) => {
        state.deleteCourseLoading = false;
      })
      .addCase(deleteCourse.rejected, (state) => {
        state.deleteCourseLoading = false;
      });
  },
  selectors: {
    selectCoursesFetching: (state) => state.coursesLoading,
    selectCourseCreate: (state) => state.isCreating,
    selectCourses: (state) => state.courses,
    selectSearchCourses: (state) => state.searchCourses,
    selectSearchCoursesFetching: (state) => state.searchCoursesLoading,
    selectOneCourse: (state) => state.oneCourse,
    selectOneCourseLoading: (state) => state.oneCourseLoading,
    selectCourseUpdateLoading: (state) => state.updateLoading,
    selectCourseError: (state) => state.isCourseError,
    selectDeleteCourseLoading: (state) => state.deleteCourseLoading,
    selectAddingToCourse: (state) => state.addingToCourse,
    selectWaitlistManageLoading: (state) => state.waitListManageLoading,
  },
});

export const coursesReducer = coursesSlice.reducer;

export const { resetSearchCourses } = coursesSlice.actions;

export const {
  selectCourses,
  selectCoursesFetching,
  selectCourseCreate,
  selectOneCourse,
  selectOneCourseLoading,
  selectCourseUpdateLoading,
  selectCourseError,
  selectSearchCourses,
  selectSearchCoursesFetching,
  selectDeleteCourseLoading,
  selectAddingToCourse,
  selectWaitlistManageLoading,
} = coursesSlice.selectors;
