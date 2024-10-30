import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { googleLogin } from "./userThunk";

const Register = () => {
  const { role } = useParams() as { role: string };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const googleLoginHandler = async (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      await dispatch(
        googleLogin({ credential: credentialResponse.credential, role: role }),
      ).unwrap();
      navigate("/");
    }
  };

  return (
    <>
      <GoogleLogin
        onSuccess={googleLoginHandler}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
};

export default Register;
