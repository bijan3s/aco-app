import InputLabel from "../../components/InputLabel";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputError from "../../components/InputError";
import Cookies from "js-cookie";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext } from "react";

interface FormData {
  mobile: null | string;
  password: null | string;
}
interface FormError {
  mobile: null | string;
  password: null | string;
}

export default function Login() {
  const useAuth = useContext(AuthContext);
  console.log(useAuth);
  const [formData, setFormData] = useState<FormData>({
    mobile: null,
    password: null,
  });
  const [formError, setFormError] = useState<FormError>({
    mobile: null,
    password: null,
  });
  const naviagte = useNavigate();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = (e: React.FormEvent) => {
    e.preventDefault();
    let newFormErrors: FormError = { mobile: null, password: null };
    let hasError = false;
    if (formData.mobile == "") {
      newFormErrors.mobile = "لطفا شماره تلفن خود را وارد کنید.";
      hasError = true;
    }
    if (formData.password == "") {
      newFormErrors.password = "لطفا رمز عبور خود را وارد کنید.";
      console.log(formError);
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
      const response = await axios.post(
        "http://192.168.1.129:8000/api/admin/auth/login",
        { mobile: formData.mobile, password: formData.password }
      );
      if (response.data.accessToken) {
        useAuth?.login(response.data);
        const token = response.data.accessToken;
        Cookies.set("bearerToken", token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        console.log(token);
        naviagte("/chat");
      } else if (response.data.message == "Unauthorized") {
        newFormErrors.password = "اطلاعات وارد شده صحیح نمی باشد.";
      }
    } catch (error) {
      newFormErrors.password = "ارتباط با سرور با مشکل مواجه شده است.";
    }
    setFormError(newFormErrors);
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/4 shadow-lg border-2 border-gray-200 rounded-lg ">
          <form onSubmit={validate} className="p-10 ">
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
}
