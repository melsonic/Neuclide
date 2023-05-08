import Userview from "@/components/Userview";
import { useEffect, useState } from "react";

interface LoginCredentials {
  username: string;
  password: string;
}

async function LoginUser(credentials: LoginCredentials) {
  return fetch('http://localhost:8080/user/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  }).then(response => response.json());
}

export default function Login() {
  const [authorized, setAuthorized] = useState(false);
  const [sessionToken, setSessionToken] = useState("");

  async function isAuthorized(sessionToken : string) {
    return await fetch("http://localhost:8080/user/getuser", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      }
    })
      .then(response => response.json())
      .then(data => setAuthorized(data.authorized));
  }

  useEffect(() => {
    let tempToken = localStorage.getItem("token");
    tempToken = tempToken ? tempToken : "";
    setSessionToken(tempToken);
    isAuthorized(tempToken);
  }, [])

  const handleLogin = async (credentials: LoginCredentials) => {
    const token = await LoginUser(credentials);
    localStorage.setItem("token", token.token);
    setSessionToken(token.token);
    isAuthorized(token.token);
  }

  return (
    <>
      {authorized ? (
        <Userview />
      ) : (
        <LoginComponent onLogin={handleLogin} />
      )}
    </>
  );
}

interface LoginComponentProps {
  onLogin: (credentials: LoginCredentials) => void;
}

export function LoginComponent({ onLogin }: LoginComponentProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-image">
      <form className="flex flex-col items-center form-bg p-12 rounded-2xl" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          className="p-4 my-4 rounded-xl outline-none text-black"
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="p-4 my-4 rounded-xl outline-none text-black"
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button
          type="submit"
          className="w-1/2 p-2 px-4 my-4 bg-blue-300 rounded-xl bg-gradient text-black font-medium"
        >
          LOGIN
        </button>
      </form>
    </div>
  )
}
