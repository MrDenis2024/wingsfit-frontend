import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {selectClientProfile} from "../clientSlice.ts";
import {getClientProfile} from "../clientThunk.ts";

const OneClient = () => {
    const { id } = useParams() as { id: string };

    const dispatch = useAppDispatch();
    const userProfile = useAppSelector(selectClientProfile);

    useEffect(() => {
        dispatch(getClientProfile(id))
    }, [dispatch]);

    useEffect(() => {
        console.log(userProfile);
    }, [userProfile]);
    return (
        <div>

        </div>
    );
};

export default OneClient;