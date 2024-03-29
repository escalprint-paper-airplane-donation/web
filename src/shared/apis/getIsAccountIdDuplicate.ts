import axios, { AxiosError } from "axios";

interface GetIsAccountIdDuplicateProps {
  accountId: string;
}

const getIsAccountIdDuplicate = async (props: GetIsAccountIdDuplicateProps) => {
  try {
    const API_URI = process.env.REACT_APP_API_URI;
    const res = await axios.get(
      `${API_URI}/duplication/account-id/${props.accountId}`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    return { result: true, data: res.data as { isDuplicate: boolean } };
  } catch (e) {
    const error = e as AxiosError;
    const statusCode = error.response?.status;

    return { result: false, statusCode };
  }
};

export default getIsAccountIdDuplicate;
