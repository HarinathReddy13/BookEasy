import { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { userAdminContextObj } from '../../contexts/UserAdminContext'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'

function Home() {
  const { currentUser, setCurrentUser } = useContext(userAdminContextObj)
  const [userData, setUserData] = useState(null);
  //console.log(data)
  const { isSignedIn, user, isLoaded } = useUser()
  //console.log(isSignedIn, user, isLoaded)
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [clubName, setClubName] = useState("");
  const [category, setCategory] = useState("");
  const [clubPosition, setClubPosition] = useState("");
  const [showForm,setShowForm]=useState(true)

  async function check() {
    let res = await axios.get(`http://localhost:3000/user-api/user/${user.emailAddresses[0].emailAddress}`)
    let { message, payload } = res.data
    //console.log(message)
    setUserData(payload)
    if(payload?.isProfileComplete){
      setShowForm(false)
      setCurrentUser(prev => ({
        ...prev,
        ...payload
      }));
    }
    
    //console.log(userData)
  }

  useEffect(() => {
  if (isLoaded && user) {
    setCurrentUser(prev => ({
      ...prev,
      name: user.firstName,
      email: user.emailAddresses[0].emailAddress,
      profileImageUrl: user.imageUrl
    }));

    check();
  }
}, [isLoaded, user]);

  async function handleSubmit(e) {
    e.preventDefault(); // prevent page reload

    const updatedUser = {
      ...currentUser,
      clubName: clubName,
      clubCategory: category,
      clubPosition:clubPosition,
      role:"user",
      isProfileComplete: true // or any other flag
    };
    console.log(updatedUser)
    try {
      let res = await axios.post('http://localhost:3000/user-api/user', updatedUser);
      const { message, payload } = res.data;

      if (message === 'Inserted') {
        setCurrentUser({ ...currentUser, ...payload });
        localStorage.setItem("currentuser", JSON.stringify(payload));
        setShowForm(false)
      }
    } catch (err) {
      setError("Failed to submit user data.");
      console.error( error,err);
    }
    
  }

  
  return (
    <div>
      {
        (user && userData===null && !currentUser.isProfileComplete  && showForm )? 
        <>
          <form className="max-w-md mx-auto my-5" onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="clubName"
                name="clubName"
                id="clubName"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required value={clubName}
                onChange={(e) => setClubName(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Club Name</label>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm/6 font-medium text-gray-500">
                Category
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="category"
                  name="category"
                  autoComplete="category"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-800 py-1.5 pr-8 pl-3 text-base text-gray-500 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option></option>
                  <option>Student Chapter</option>
                  <option>Cultural Club</option>
                  <option>Technical Club</option>
                </select>

              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group my-5">
              <input
                type="clubPosition"
                name="clubPosition"
                id="clubPosition"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                required
                value={clubPosition}
                onChange={(e) => setClubPosition(e.target.value)}
              />
              <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your position in club</label>
            </div>

            <button 
              type="submit" 
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              
            >Submit</button>
          </form>
        </>:
        <>
          <Outlet />
        </>
      }
      
    </div>
  )
}

export default Home