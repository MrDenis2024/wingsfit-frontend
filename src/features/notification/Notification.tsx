import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {getUnreadMessages} from "./notificationThunk.ts";
import { selectUnreadMessages} from "./notificationSlice.ts";

const Notification = ()=>{
    const dispatch = useAppDispatch();
    const unreadMessages = useAppSelector(selectUnreadMessages);
    useEffect(() => {
        dispatch(getUnreadMessages());
    }, [dispatch]);

    return(
        <>
            {unreadMessages.map((message)=>{
                return(
                    <>
                        {message.message}
                    </>
                );
            })}
        </>
    );
};

export default Notification;