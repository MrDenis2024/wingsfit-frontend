import React from 'react';
import Grid from "@mui/material/Grid2";
import { Button} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import {UserProfile} from "../../types/userTypes.ts";
import {logout} from "../../features/users/userThunk.ts";
import {useAppDispatch} from "../../app/hooks.ts";

interface Props {
    user: UserProfile;
}

const AdminNavigationBar: React.FC<Props> = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = async () => {
        await dispatch(logout());
        navigate("/");
    };

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid>
                <Button
                    component={NavLink}
                    to={`/${user.role}s/chats/${user._id}`}
                    color="inherit"
                >
                    <ChatIcon sx={{ mr: 2 }} />
                    Чат
                </Button>
            </Grid>
            <Grid>
                <Button
                    onClick={handleLogout}
                    color="inherit"
                >
                    <LogoutIcon sx={{ mr: 2 }} />
                    Выход
                </Button>
            </Grid>
        </Grid>
    );
};

export default AdminNavigationBar;