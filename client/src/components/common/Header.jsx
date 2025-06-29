import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/clerk-react'
import { userAdminContextObj } from '../../contexts/UserAdminContext'

function Header() {
  const { signOut } = useClerk()
  const { isLoaded, isSignedIn, user } = useUser()
  const { currentUser, setCurrentUser } = useContext(userAdminContextObj)
  const navigate = useNavigate()
  const usp=`user-profile/${user?.emailAddresses[0].emailAddress}`

  async function handleSignout() {
    await signOut();
    setCurrentUser(null)
    navigate('/')
  }

  return (
    <div>
      <nav className="navbar bg-base-100 shadow-sm justify-between bg-zinc-950 ">
        <div className="flex">
          <a className="text-3xl mx-5">BookEasy</a>
        </div>
        <div className="flex-none ">
          <ul className="menu menu-horizontal px-1 text-lg">
            <li><Link to=''>Home</Link></li>
            <li><Link to='aboutus'>About Us</Link></li>
            {
              !isSignedIn === true ?
                <>
                  <li><Link to='signin'>SignIn</Link></li>
                  <li><Link to='signup'>SignUp</Link></li>
                </> :
                <>
                  
                  <div className="mx-3 dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt="Tailwind CSS Navbar component"
                          src={user.imageUrl} />
                      </div>
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                      <li >
                        <Link to={usp} className='text-sm'>Profile</Link>
                      </li>
                      <button className="btn btn-ghost justify-between" onClick={handleSignout}>SignOut</button>
                    </ul>
                  </div>
                </>
            }

          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header