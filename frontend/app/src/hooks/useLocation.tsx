import axios from "axios";
import { useEnv } from "./useEnv";

const useLocation = () => {
  const env = useEnv();

  const getLocation = async (query: string) => {
    try {
      const URL = `${env.REACT_APP_API_URL}/${env.REACT_APP_LOCATION_API}/${query}`;

      const response = await axios.get(URL, {
        params: {
          access_token: env.REACT_APP_MAP_BOX_ACCESS_TOKEN,
        },
      });

      return response?.data;
    } catch (error) {
      throw new Error(JSON.stringify(error));
    }
  };

  return {
    getLocation: getLocation,
  };
};

export default useLocation;
