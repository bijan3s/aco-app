import InputLabel from "../../components/InputLabel";
import TextInput from "../../components/TextInput";
import PrimaryButton from "../../components/PrimaryButton";
import { useState } from "react";
import Checkbox from "../../components/Checkbox";
interface FormData {
  username: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
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
    console.log("Form data:", formData);
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="w-1/4 shadow-lg border-2 border-gray-200 rounded-lg ">
          <form onSubmit={handleSubmit} className="p-10 ">
            <div>
              <InputLabel htmlFor="username" value="نام کاربری" />
              <TextInput
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full my-1"
                autoComplete="username"
                isFocused={true}
              />
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
            </div>
            <div className="flex py-2">
              <Checkbox />
              <span className="mr-2 text-sm text-gray-600 ">
                مرا به خاطر بسپار.
              </span>
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
