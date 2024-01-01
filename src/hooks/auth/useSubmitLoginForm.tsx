import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { urlConfig } from "../../urlConfig";

interface FormData {
  mobile: string;
  password: string;
}

interface FormError {
  mobile: string;
  password: string;
}

interface UserData {
  userId: number;
  userName: string;
}

export function useSubmitLoginForm(login: (userData: UserData) => void) {
  const navigate = useNavigate();

  const handleSubmit = async (
    formData: FormData,
    setFormError: React.Dispatch<React.SetStateAction<FormError>>
  ) => {
    try {
      const response = await axios.post(
        `https://${urlConfig}/api/admin/auth/login`,
        formData
      );

      if (response.data.accessToken) {
        const { accessToken, user } = response.data;
        login({ userId: user.id, userName: user.full_name });
        Cookies.set("bearerToken", accessToken, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });
        navigate("/chat");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ?? "خطا در ارتباط با سرور!";
      setFormError({ mobile: "", password: errorMessage });
    }
  };

  return handleSubmit;
}
