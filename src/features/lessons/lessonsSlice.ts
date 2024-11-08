import { createSlice } from "@reduxjs/toolkit";
import { Lesson } from "../../types/lessonTypes";

interface LessonState {
    lessons: Lesson[];
    lessonsLoading: boolean;
}

const initialState: LessonState = {
    lessons: [],
    lessonsLoading: false,
};

export const lessonsSlice = createSlice({
    name: 'lessons',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    },
    selectors: {
        selectLessons: (state)=>state.lessons,
        selectLessonsLoading: (state)=>state.lessonsLoading,
    }
});

export const lessonsReducer = lessonsSlice.reducer;

export const { selectLessons, selectLessonsLoading } = lessonsSlice.selectors;