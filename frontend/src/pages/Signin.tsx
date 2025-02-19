import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

function Signin() {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen items-center justify-center bg-gray-200">
      <div className="min-w-sm rounded-md bg-white p-2">
        <h1 className="text-center text-2xl">Sign In</h1>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            label="username"
            onChange={(e) => e}
            placeholder="username"
          />
          <Input
            type="password"
            label="password"
            onChange={(e) => e}
            placeholder="pass"
          />
        </div>
        <div className="space-y-2 divide-y py-2">
          <Button
            onClick={() => {
              navigate("/dash");
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
