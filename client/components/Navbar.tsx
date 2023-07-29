import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, ReactElement, useEffect, useState } from "react";

function Navbar(): ReactElement {

  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {

    /**
     * Asynchronously check if the user is authorized.
     * @async
     * @function isAuthorized
     */
    async function isAuthorized() {
      const sessionToken = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/user/getuser', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        }
      });
      if (response.ok)
        setAuthorized(true);
    }

    isAuthorized();

  }, []);

  /**
   * Asynchronously handle the user logout process.
   * @async
   * @function handleLogout
   * @param {MouseEvent<HTMLButtonElement>} event - The click event on the logout button.
   */
  async function handleLogout(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const sessionToken = localStorage.getItem('token');
    const response = await fetch('http://localhost:8080/user/logout', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionToken}`
      }
    });
    if(response.ok)
      setAuthorized(false);

    router.push('/');
  }

  return (
    <nav className="w-full flex justify-between px-20 pt-10">
      {/* logo */}
      <div>
        <Link href="/" className="text-gradient nav-item">NEUCLIDE</Link>
      </div>
      {/* nav items */}
      <div>

        {authorized ?
          (<>
            <Link href="/userview" className="nav-item" >Dashboard</Link>
            <Link href="#">
              <button className="nav-item" onClick={handleLogout}>Logout</button>
            </Link>
          </>)
          :
          (<>
            <Link href="/login" className="nav-item">Login</Link>
            <Link href="/register" className="nav-item">Register</Link>
          </>)
        }
      </div>
    </nav>
  );
}

export default Navbar;