import { FormEvent, ReactElement, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "./Navbar";

interface RegisterCredentials {
  username: string,
  password: string
}

interface RegisterResponse {
  token: string,
  message: string
}

/**
 * Asynchronously register a new user using user credentials.
 * @async
 * @function RegisterUser
 * @param {RegisterCredentials} credentials - The registration credentials of the new user.
 * @returns {Promise<RegisterResponse>} A promise that resolves to the response data or an error message.
 */
async function RegisterUser(credentials: RegisterCredentials): Promise<RegisterResponse> {
  const response = await fetch('http://localhost:8080/user/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  const data = await response.json();
  return data;
}

export default function Register(): ReactElement {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Asynchronously handle the form submission for user registration.
   * @async
   * @function handleSubmit
   * @param {FormEvent<HTMLFormElement>} event - The form submission event.
   * @returns {Promise<void>} A promise that resolves after handling the form submission or an error message.
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const response = await RegisterUser({ username, password });
    localStorage.setItem("token", response.token);
    router.push('/userview');
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-image">

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
          Register
        </button>
      </form>
    </div>
  )
}