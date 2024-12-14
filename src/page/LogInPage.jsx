import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogIn from "../components/LogIn";
import { toast } from "react-toastify";
const LogInPage = () => {
  const [isSending, setIsSending] = useState(false);
  const [badresponseText, setBadResponseText] = useState("");
  const navigate = useNavigate();

  const onSubmit = (formData) => {
    const url = `https://my-app-backend-dusky.vercel.app/fb/select-client?email=${encodeURIComponent(
      formData.email
    )}&password=${encodeURIComponent(formData.password)}`;
    setIsSending(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((errorData) => {
            setBadResponseText(errorData.error || "An unknow error occured!!");
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
        toast(`Welcome back ${data.first_name}`);
        console.log("Address fetched successfully:", data);
      })
      .catch((error) => {
        setIsSending(false);
        console.error("Error with fetching Address:", error);
      });
  };

  return (
    <LogIn
      onSubmit={onSubmit}
      isSending={isSending}
      badresponseText={badresponseText}
    />
  );
};

export default LogInPage;
