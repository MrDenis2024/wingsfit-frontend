import {useEffect} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {getCoursesToday, getEndedSubscription, getUnreadMessages} from "./notificationThunk.ts";

const Notification = ()=>{
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getEndedSubscription());
    }, [dispatch]);

    return(
        <>
        </>
    );
};

export default Notification;