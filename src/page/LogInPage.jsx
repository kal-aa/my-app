import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LogIn from "../components/LogIn";
const LogInPage = () => {
  const [isSending, setIsSending] = useState(false);
  const [badresponseText, setBadResponseText] = useState("");
  const fullNameRef = useRef(null);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const fullName = params.get("fullName");
    const password = params.get("password");
    if (fullName && password) {
      const url = `https://my-app-backend-dusky.vercel.app/fb/select-client?full_name=${encodeURIComponent(
        fullName
      )}&password=${encodeURIComponent(password)}`;
      setIsSending(true);
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            return res.json().then((errorData) => {
              setBadResponseText(
                errorData.error || "An unknow error occured!!"
              );
              setTimeout(() => {
                setBadResponseText("");
              }, 3000);
              throw new Error(
                `Network response was not ok while fetching an Address: ${res.statusText}`
              );
            });
          }
          return res.json();
        })
        .then((data) => {
          setIsSending(false);
          navigate(`/home/${data.address_id}`);
          console.log("Address fetched successfully:", data);
        })
        .catch((error) => {
          setIsSending(false);
          console.error("Error with fetching Address:", error);
        });
    }
  }, [params, navigate]);

  const handleSetParams = (newParams) => {
    setParams(newParams);
  };

  return (
    <LogIn
      isSending={isSending}
      badresponseText={badresponseText}
      fullNameRef={fullNameRef}
      handleSetParams={handleSetParams}
    />
  );
};

export default LogInPage;
