import { createAsyncThunk } from "@reduxjs/toolkit";
import { Lesson, LessonMutation } from "../../types/lessonTypes";
import axiosApi from "../../axiosApi";

export const createLesson = createAsyncThunk<void, LessonMutation>('lessons/create', async(lessonMutation)=>{
    try{
        await axiosApi.post<Lesson>('/lessons', lessonMutation);
    }catch(e){
        throw e;
    }
});