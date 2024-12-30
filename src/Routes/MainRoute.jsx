import React from 'react'
import { Route, Routes } from 'react-router'
import MainLayout from '../MainLayout/MainLayout'
import Home from '../Pages/Home/Home'
import Jobs from '../Pages/Jobs/Jobs'
import AddNewJob from '../Pages/Jobs/AddNewJob'
import Login from '../Pages/Registration/Login'
import Register from '../Pages/Registration/Register'
import AllJobs from '../Pages/Jobs/AllJobs'
import Design from '../Pages/Jobs/Designer'
import Development from '../Pages/Jobs/Development'
import JobDetails from '../shared/jonDetails/JobDetails'
import JobApply from '../Pages/JobbApply/JobApply'
import MyApplications from '../Components/MyApplications/MyApplications'
import UpdateApplication from '../Pages/UpdateMyApplication/UpdateApplication'
import MyPostedJobs from '../Pages/MyPostedJob/MyPostedJobs'
import ViewCandidate from '../Pages/viewCandidate/ViewCandidate'
import UpdateMyPost from '../Pages/updateMyPost/UpdateMyPost'
import PrivateRoute from '../PrivateRoute/PrivateRoute'

const MainRoute = () => {
  return (
    <Routes>
      <Route  path='' element={<MainLayout/>}>
        <Route path='/' element={<Home/>}/>
        {/* Job routes */}
        <Route path='AllJobs' element={<AllJobs/>}/>
        <Route path='Designer' element={<Design/>}/>
        <Route path='Development' element={<Development/>}/>
        <Route path='AddNewJob' element={
          <PrivateRoute><AddNewJob/></PrivateRoute>}/>
        <Route path='MyApplications' element={
          <PrivateRoute><MyApplications/></PrivateRoute>
        }/>
        {/* my-posted-jobs */}
        <Route path='MyPostedJobs' element={
          <PrivateRoute><MyPostedJobs/></PrivateRoute>
        }/>
        {/* Registration Routes */}
        <Route path='Login' element={<Login/>}/>
        <Route path='Register' element={<Register/>}/>
        {/* dynamic-routes */}
        <Route path='/Details/:id' element={
          <PrivateRoute><JobDetails/></PrivateRoute>
        }/>
        <Route path='/apply/:id' element={
          <PrivateRoute><JobApply/></PrivateRoute>
        }/>
        <Route path='/UpdateApplication/:id' element={
          <PrivateRoute><UpdateApplication/></PrivateRoute>
        }/>
        <Route path='/UpdateMyPost/:id' element={
          <PrivateRoute><UpdateMyPost/></PrivateRoute>
        }/>
        <Route path='/ViewCandidate/jobs/:jobId' element={
          <PrivateRoute><ViewCandidate/></PrivateRoute>
        }/>
      </Route>
    </Routes>
  )
}

export default MainRoute
