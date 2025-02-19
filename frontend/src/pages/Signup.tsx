import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { API } from "../api/utils";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await API.post("/signup", {
        username: username,
        password: password,
      });

      navigate("/signin");
    } catch {
      alert("failed to signup");
    }
  };
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="min-w-sm rounded-md bg-white p-2">
        <h1 className="text-center text-2xl">Sign Up</h1>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            label="username"
            onChange={(e) => setusername(e.target.value)}
            placeholder="username"
          />
          <Input
            type="password"
            label="password"
            onChange={(e) => setpassword(e.target.value)}
            placeholder="pass"
          />
        </div>
        <div className="space-y-2 divide-y py-2">
          <Button
            onClick={() => {
              signup();
            }}
            variant={"primary"}
            content="Sign Up"
          ></Button>
          <Button
            onClick={() => {
              navigate("/signin");
            }}
            variant={"secondary"}
            content="Sign In"
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
