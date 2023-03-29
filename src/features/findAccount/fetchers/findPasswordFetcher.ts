import axios, { AxiosError } from "axios";

interface FindPasswordFetcherProps {
  nickname: string;
  accountId: string;
}

const findPasswordFetcher = async (props: FindPasswordFetcherProps) => {
  try {
    const API_URI = process.env.REACT_APP_API_URI;
    const res = await axios.get(
      `${API_URI}/account/${props.nickname}/${props.accountId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return { result: true, data: res.data as { password: string } };
  } catch (e) {
    const error = e as AxiosError;
    const statusCode = error.response?.status;

    return { result: false, statusCode };
  }
};

export default findPasswordFetcher;
