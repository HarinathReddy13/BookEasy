import {useContext,useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import {userAdminContextObj} from '../../contexts/UserAdminContext'
import {useUser} from '@clerk/clerk-react'

function Home() {
  const {currentUser,setCurrentUser}=useContext(userAdminContextObj)
  //console.log(data)
  const {isSignedIn,user,isLoaded}=useUser()
  console.log(isSignedIn,user,isLoaded)

  useEffect(()=>{
    setCurrentUser({
      ...currentUser,
      name:user?.firstName,
      email:user?.emailAddresses[0].emailAddress,
      profileImageUrl:user?.imageUrl
    })
  },[isLoaded])
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default Home