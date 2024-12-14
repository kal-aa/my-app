import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";
import { useRef, useState } from "react";

const LogIn = ({
  onSubmit,
  isSending,
  badresponseText,
  
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const timeoutRef = useRef(null);
  const buttonStyle = `bg-pink-500 p-1 w-56 md:w-80 rounded-xl text-white hover:bg-pink-400 active:bg-pink-600`;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const passwordEye = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShowPassword(true);
    timeoutRef.current = setTimeout(() => {
      setShowPassword(false);
    }, 3000);
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <>
      <h1 className="text-center text-4xl font-bold mt-5 text-pink-600">
        Log In
      </h1>
      <div className="flex items-center justify-center">
        <form
          onSubmit={submit}
          className="mt-5 signup-form bg-stone-50 p-10 rounded-md drop-shadow-2xl max-w-sm md:max-w-lg"
        >
          <div>
            <label htmlFor="Email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Sample: John Doe"
              required
              className="signup-input md:ml-[83px]"
            />
          </div>
          <div className="relative">
            <label htmlFor="password">Password: </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="signup-input md:ml-14"
            />
            {showPassword ? (
              <FaEyeSlash
                onClick={() => {
                  setShowPassword(false);
                }}
                className="show-password"
              />
            ) : (
              <FaEye onClick={passwordEye} className="show-password" />
            )}
          </div>
          <div className="justify-self-center">
            <p className="md:ml-4 md:max-w-72 md:px-0 text-red-600 max-w-60 px-4 break-words text-center leading-4 mt-2">
              {badresponseText || "\u00A0"}
            </p>
            <button type="submit" className={buttonStyle} disabled={isSending}>
              {isSending ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

LogIn.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  badresponseText: PropTypes.string.isRequired,
};

export default LogIn;
