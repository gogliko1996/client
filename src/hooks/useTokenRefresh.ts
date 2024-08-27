import { useEffect } from "react";
import api from "../utils/api/api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/reducerStore/store";
import { screen } from "../routes/routeName";
import { useNavigate } from "react-router-dom";
import { getUser } from "../page/Auth/redux/userReducer";

const useTokenRefresh = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    if (token) {
      dispatch(getUser()).then(() => {
        navigate(screen.home);
      });
    }
  }, [token]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      api
        .post("/auth/refresh-token", {
          token: localStorage.getItem("refreshToken"),
        })
        .then((response) => {
          localStorage.setItem("accessToken", response.data.accessToken);
        })
        .catch((error) => {
          console.error("Failed to refresh token", error);
        });
    }, 50 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);
};

export default useTokenRefresh;
