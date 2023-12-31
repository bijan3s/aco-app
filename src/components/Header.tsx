import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { useContext } from "react";
interface HeaderProps {
  className: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const AuthUser = useContext(AuthContext)?.authUser;
  return (
    <>
      <div
        className={
          "absolute z-10 top-0 left-1/2 transform -translate-x-1/2 rounded-b-lg p-4 border-2 border-gray-200 w-3/5 mx-auto bg-white" +
          className
        }
      >
        {!AuthUser && (
          <Link
            to="/login"
            className="hover:opacity-70 px-5 pb-3 transition-all duration-300 border-b-2 border-gray-400 border-opacity-0 hover:border-opacity-100"
          >
            ورود
          </Link>
        )}

        <Link
          to="/chat"
          className="hover:opacity-70 px-5 pb-3 transition-all duration-300 border-b-2 border-gray-400 border-opacity-0 hover:border-opacity-100"
        >
          چت
        </Link>
      </div>
    </>
  );
}
