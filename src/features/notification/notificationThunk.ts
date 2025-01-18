import {createAsyncThunk} from "@reduxjs/toolkit";
import { Message} from "../../types/chatTypes.ts";
import {RootState} from "../../app/store.ts";
import {GlobalError} from "../../types/userTypes.ts";
import axiosApi from "../../axiosApi.ts";
import {isAxiosError} from "axios";
import {IGroup} from "../../types/groupTypes.ts";
import { ICourse} from "../../types/courseTypes.ts";
import {CourseToday, EndedSubscription} from "../../types/notificationTypes.ts";

export const getUnreadMessages = createAsyncThunk<
    Message[],
    void,
    {
        state: RootState;
        rejectValue: GlobalError;
    }
>("notifications/getUnreadMessages", async (_, { rejectWithValue }) => {
    try {
        const { data: groupChatsUnreadMessages } = await axiosApi.get<Message[]>("/chats/groupChatsUnreadMessages");
        const { data: privateChatsUnreadMessages } = await axiosApi.get<Message[]>("/chats/privateChatsUnreadMessages");
        const messages = groupChatsUnreadMessages.concat(privateChatsUnreadMessages);

        return messages;
    } catch (error) {
        if (
            isAxiosError(error) &&
            error.response &&
            error.response.status === 400
        ) {
            return rejectWithValue(error.response.data);
        }
        throw error;
    }
});

export const getCoursesToday = createAsyncThunk<
    CourseToday[],
    void,
    {
        state: RootState;
        rejectValue: GlobalError;
    }
>("notifications/getClassesToday", async (_, { rejectWithValue }) => {
    try {
        const {data: groups} = await axiosApi.get<IGroup[]>("/groups");
        let coursesToday: CourseToday[] = [];
        await Promise.all(
            groups.map(async (group) => {
                const { data: course } = await axiosApi.get<ICourse>(`/courses/${group.course._id}`);
                const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];
                const today = new Date().getDay();

                if (course.schedule.includes(days[today])) {
                    coursesToday = [...coursesToday, { course, group }];
                }
            })
        );
        return coursesToday;
    } catch (error) {
        if (
            isAxiosError(error) &&
            error.response &&
            error.response.status === 400
        ) {
            return rejectWithValue(error.response.data);
        }
        throw error;
    }
});

export const getEndedSubscription = createAsyncThunk<
    EndedSubscription[],
    void,
    {
        state: RootState;
        rejectValue: GlobalError;
    }
>("notifications/getEndedSubscription", async (_, {getState, rejectWithValue }) => {
    try {
        const state = getState() as RootState;
        const user = state.users.user;

        if (!user) {
            throw new Error("Пользователь не авторизован");
        }
        const endedSubscription: EndedSubscription[] = [];
        if (user.role === "trainer"){
            const {data: groups} = await axiosApi.get<IGroup[]>("/groups");
            const date = new Date();
            groups.map((group)=>{
                group.clients.map((client)=>{
                    const dateSubscription = new Date(client.subscribeEnd);
                    if (dateSubscription <= date ){
                        endedSubscription.push({
                            message: `У участника группы "${group.title}" - ${client.client.firstName} ${client.client.lastName} закончилась подписка!`,
                            courseId: '',
                        });
                    }
                });
            });
        }else if(user.role === "client"){
            const {data: groups} = await axiosApi.get<IGroup[]>("/groups");
            const date = new Date();
            groups.map((group)=>{
               group.clients.map((client)=>{
                   const dateSubscription = new Date(client.subscribeEnd);
                   if (client.client._id === user._id && dateSubscription <= date ) {
                       endedSubscription.push({
                           message: `У вас закончилась подписка на курс - ${group.course.title}`,
                           courseId: group.course._id,
                       });
                   }
               });
            });
        }
        return endedSubscription;
    } catch (error) {
        if (
            isAxiosError(error) &&
            error.response &&
            error.response.status === 400
        ) {
            return rejectWithValue(error.response.data);
        }
        throw error;
    }
});