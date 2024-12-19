import ClientProfileDetail from "./components/ClientProfileDetail.tsx";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {useEffect} from "react";
import {getClientProfile} from "./clientThunk.ts";
import {selectClientProfile, selectClientProfileLoading} from "./clientSlice.ts";
import {selectUser} from "../users/userSlice.ts";
import {Box} from "@mui/material";
import LoadingIndicator from "../../UI/LoadingIndicator/LoadingIndicator.tsx";


const OneClient = () => {
    const { id } = useParams() as { id: string };
    const dispatch = useAppDispatch();
    const oneClient = useAppSelector(selectClientProfile);
    const user = useAppSelector(selectUser);
    const isLoading = useAppSelector(selectClientProfileLoading);

    useEffect(() => {
        dispatch(getClientProfile(id));
    }, [dispatch, id]);

    const isMyProfile = user?._id === id;
    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                }}
            >
                <LoadingIndicator />
            </Box>
        );
    }
    return (
   <>
   <ClientProfileDetail
       clientsProfile={isMyProfile ? oneClient : null}
        id={id}
       isOwner={isMyProfile}
   />
   </>

  );
};

export default OneClient;
