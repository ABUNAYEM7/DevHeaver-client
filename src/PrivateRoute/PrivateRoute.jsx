import React, { useContext } from 'react'
import AuthContext from '../AuthContext/AuthContext'
import { Navigate, useLocation } from 'react-router'
import { ThreeCircles } from 'react-loader-spinner'

const PrivateRoute = ({children}) => {
    const {pathname} = useLocation()
    const {user,loading} = useContext(AuthContext)
    
    if(loading){
        return <div className='my-3 w-full flex items-center justify-center'>
        <h3 className="my-8 text-highlight font-bold text-center text-4xl">
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </h3>
      </div>
    }

    if(user){
        return children
    }
  return <Navigate state={pathname} to={'/Login'}/>
}

export default PrivateRoute
