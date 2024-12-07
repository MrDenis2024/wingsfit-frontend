import React, { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.ts";
import {
  selectClientProfileError,
  selectClientProfileLoading,
} from "../../features/clients/clientSlice.ts";
import { IUser } from "../../types/userTypes.ts";
import { selectUser } from "../../features/users/userSlice.ts";
import {
  selectTrainerProfileError,
  selectTrainerProfileLoading,
} from "../../features/trainers/trainersSlice.ts";

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  const clientProfileError = useAppSelector(selectClientProfileError);
  const user = useAppSelector(selectUser) as IUser;
  const clientProfileLoading = useAppSelector(selectClientProfileLoading);
  const trainerProfileLoading = useAppSelector(selectTrainerProfileLoading);
  const trainerError = useAppSelector(selectTrainerProfileError);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !trainerProfileLoading && !clientProfileLoading) {
      const role = user.role;
      if (
        (role === "trainer" && trainerError) ||
        (role === "client" && clientProfileError)
      ) {
        navigate(`/fill-profile/${role}`);
      }
    }
  }, [
    trainerError,
    user,
    trainerProfileLoading,
    clientProfileLoading,
    navigate,
    clientProfileError,
  ]);
  if (!isAllowed) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
