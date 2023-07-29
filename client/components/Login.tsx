import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Navbar from "./Navbar";

interface LoginCredentials {
  username: string;
  password: string;
}

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(credentials: LoginCredentials) {
    const response = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    return data;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await loginUser({ username, password });
    localStorage.setItem("token", response.token);
    router.push("/userview");
  }

  return (
    <div className="h-screen flex flex-col items-center bg-image">

      <Navbar />

      <form className="flex flex-col items-center form-bg p-12 rounded-2xl my-auto" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="username"
          className="p-4 my-4 rounded-xl outline-none text-black bg-white"
          onChange={(e) => { setUsername(e.target.value) }}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="p-4 my-4 rounded-xl outline-none text-black bg-white"
          onChange={(e) => { setPassword(e.target.value) }}
        />
        <button
          type="submit"
          className="w-1/2 p-2 px-4 my-4 bg-blue-300 rounded-xl bg-gradient text-black font-medium"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;