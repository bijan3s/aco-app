import { Link } from "react-router-dom";
import { connect } from "react-redux";
interface HeaderProps {
  className: string;
  isAuthenticated: Boolean;
}

const Header = ({ className = "", isAuthenticated }: HeaderProps) => {
  return (
    <>
      <div
        className={
          "absolute z-10 top-0 left-1/2 transform -translate-x-1/2 rounded-b-lg p-4 border-2 border-gray-200 w-3/5 mx-auto bg-white" +
          className
        }
      >
        {isAuthenticated == false && (
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
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Header);
