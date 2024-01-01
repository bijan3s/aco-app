import InputLabel from "../../components/common/InputLabel";
import TextInput from "../../components/common/TextInput";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputError from "../../components/common/InputError";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { urlConfig } from "../../urlConfig";

interface FormData {
  mobile: null | string;
  password: null | string;
}
interface FormError {
  mobile: null | string;
  password: null | string;
}

interface LoginProps {
  login: (userData: { userId: number; userName: string }) => void;
}

const Login: React.FC<LoginProps> = ({ login }) => {
  const naviagte = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    mobile: null,
    password: null,
  });
  const [formError, setFormError] = useState<FormError>({
    mobile: null,
    password: null,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();
    let newFormErrors: FormError = { mobile: null, password: null };
    let hasError = false;
    if (formData.mobile == "") {
      newFormErrors.mobile = "لطفا شماره تلفن خود را وارد کنید.";
      hasError = true;
    }
    if (formData.password == "") {
      newFormErrors.password = "لطفا رمز عبور خود را وارد کنید.";

      hasError = true;
    }
    setFormError(newFormErrors);
    if (!hasError) {
      handleSubmit();
    }
  };
  const handleSubmit = async () => {
    let newFormErrors: FormError = { mobile: null, password: null };
    try {
      const domainUrl = urlConfig;
      const response = await axios.post(
        `https://${domainUrl}/api/admin/auth/login`,
        { mobile: formData.mobile, password: formData.password }
      );

      if (response.data.accessToken) {
        const token = response.data.accessToken;
        const userId = response.data.user.id;
        const userName = response.data.user.full_name;
        login({ userId, userName });
        Cookies.set("bearerToken", token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });

        naviagte("/chat");
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ?? "خطا در ارتباط با سرور!";

      if (errorMessage === "Unauthorized") {
        newFormErrors.password = "اطلاعات وارد شده صحیح نمی باشد.";
      } else {
        newFormErrors.password = errorMessage;
      }
    }
    setFormError(newFormErrors);
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/4 shadow-lg border-2 border-gray-200 rounded-lg ">
          <form onSubmit={validateForm} className="p-10 ">
            <div>
              <InputLabel htmlFor="mobile" value="شماره همراه" />
              <TextInput
                id="mobile"
                type="text"
                name="mobile"
                value={formData.mobile ?? ""}
                onChange={handleChange}
                className="mt-1 block w-full my-1"
                autoComplete="mobile"
                isFocused={true}
              />
              <InputError message={formError.mobile} className="" />
            </div>
            <div>
              <InputLabel htmlFor="password" value="رمز عبور" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={formData.password ?? ""}
                onChange={handleChange}
                className="mt-1 block w-full my-1"
                autoComplete="password"
                isFocused={true}
              />
              <InputError message={formError.password} className="" />
            </div>

            <div className="flex items-center justify-end mt-4">
              <PrimaryButton className="mr-4">ورود</PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const mapDispatchToProps = {
  login,
};

export default connect(null, mapDispatchToProps)(Login);
