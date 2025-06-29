import {createContext,useState} from 'react'
export const userAdminContextObj=createContext()

function UserAdminContext({children}) {

  let [currentUser,setCurrentUser]=useState({
    name:'',
    email:'',
    profileImageUrl:'',
    role:'',
    status:'pending',
    isActive:true,
    isProfileComplete:false,
    clubName:'',
    clubCategory:'',
    clubPosition:''
  })
  return (
    <userAdminContextObj.Provider value={{currentUser,setCurrentUser }}>
      {children}
    </userAdminContextObj.Provider>
  )
}

export default UserAdminContext