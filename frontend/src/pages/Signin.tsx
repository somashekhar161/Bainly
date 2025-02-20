import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { API } from "../api/utils";
import { useEffect, useState } from "react";

import { useUserStore } from "../store";

function Signin() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const user = useUserStore((state) => state.username);
  const addUser = useUserStore((state) => state.addUser);
  const singin = async () => {
    try {
      const res = await API.post("/signin", {
        username: username,
        password: password,
      });

      if (res.data && res.data.data.token) {
        const token: string = res.data.data.token as string;
        localStorage.setItem(
          "profile",
          JSON.stringify({
            username: res.data.data.user.username,
            accessToken: token,
          }),
        );
      }
      addUser(res.data.data.user.username);

      navigate("/dash");
    } catch {
      alert("failed to singin");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dash");
    }
  }, []);
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="min-w-sm rounded-md bg-white p-2">
        <h1 className="text-center text-2xl">Sign In</h1>
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
              singin();
            }}
            variant={"primary"}
            content="Sign In"
          ></Button>
          <Button
            onClick={() => {
              navigate("/signup");
            }}
            variant={"secondary"}
            content="Sign Up"
          ></Button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
