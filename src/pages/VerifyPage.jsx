import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verify } from "../redux/userSlice";

const VerifyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      dispatch(verify(token));
      navigate("/login")
    }
  }, [dispatch, token]);

  return <div>Verifying...</div>;
};

export default VerifyPage;
