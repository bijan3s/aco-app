import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { useSubmitLoginForm } from "../../hooks/auth/useSubmitLoginForm";
import InputLabel from "../../components/common/InputLabel";
import TextInput from "../../components/common/TextInput";
import PrimaryButton from "../../components/common/PrimaryButton";
import InputError from "../../components/common/InputError";

interface FormData {
  mobile: string;
  password: string;
}

interface FormError {
  mobile: string;
  password: string;
}

interface LoginProps {
  login: (userData: { userId: number; userName: string }) => void;
}

const Login: React.FC<LoginProps> = ({ login }) => {
  const handleSubmitForm = useSubmitLoginForm(login);
  const [formData, setFormData] = useState<FormData>({
    mobile: "",
    password: "",
  });
  const [formError, setFormError] = useState<FormError>({
    mobile: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let newFormErrors: FormError = { mobile: "", password: "" };
    let hasError = false;

    if (!formData.mobile) {
      newFormErrors.mobile = "لطفا شماره تلفن خود را وارد کنید.";
      hasError = true;
    }

    if (!formData.password) {
      newFormErrors.password = "لطفا رمز عبور خود را وارد کنید.";
      hasError = true;
    }

    setFormError(newFormErrors);

    if (!hasError) {
      handleSubmitForm(formData, setFormError);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/4 shadow-lg border-2 border-gray-200 rounded-lg ">
          <form onSubmit={handleSubmit} className="p-10 ">
            <div>
              <InputLabel htmlFor="mobile" value="شماره همراه" />
              <TextInput
                id="mobile"
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="mt-1 block w-full my-1"
                autoComplete="mobile"
                isFocused={true}
              />
              <InputError message={formError.mobile} />
            </div>
            <div>
              <InputLabel htmlFor="password" value="رمز عبور" />
              <TextInput
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full my-1"
                autoComplete="password"
                isFocused={true}
              />
              <InputError message={formError.password} />
            </div>
            <div className="flex items-center justify-end mt-4">
              <PrimaryButton type="submit" className="mr-4">
                ورود
              </PrimaryButton>
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
