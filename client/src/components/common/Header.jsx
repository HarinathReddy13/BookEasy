import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useClerk,useUser} from '@clerk/clerk-react'
import { userAdminContextObj } from '../../contexts/UserAdminContext'

function Header() {
  const {signOut}=useClerk()
  const {isLoaded,isSignedIn,user}=useUser()
  const {currentUser,setCurrentUser}=useContext(userAdminContextObj)
  const navigate=useNavigate()

  async function handleSignout(){
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
          <ul className="menu menu-horizontal px-1 text-xl">
            <li><Link to=''>Home</Link></li>
            {
              !isSignedIn===true?
              <>
                <li><Link to='signin'>SignIn</Link></li>
                <li><Link to='signup'>SignUp</Link></li>
              </>:
              <>
                <button className="btn btn-ghost text-xl" onClick={handleSignout}>SignOut</button>
              </>
            }
            
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header