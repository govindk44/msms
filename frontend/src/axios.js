import axios from "axios";

const apiUrl = "http://localhost:8000";
const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: {
    Authorization: sessionStorage.getItem("access_token")
      ? "Bearer " + sessionStorage.getItem("access_token")
      : null,
    accept: "application/json",
  },
});

// Function to refresh the token
const generateRefreshToken = async (error) => {
  let refresh = false;
  if (error.response.status === 401 && !refresh) {
    refresh = true;
    const response = await axios.post(
      `${apiUrl}/api/token/refresh/`,
      {
        refresh: sessionStorage.getItem("refresh_token"),
      },
      { withCredentials: false }
    );
    if (response.status === 200) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.access}`;
      //return axios(error.config);
    }
  }
  refresh = false;
  return error;
};

export { apiUrl, axiosInstance, generateRefreshToken };


