import React from 'react';
import Style from './ProtectedRoute.module.css';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute(props) {
  if((localStorage.getItem('userToken')!==null)&& (localStorage.getItem('userRole')!=='admin')){
    return props.children
  }else if((localStorage.getItem('userToken')!==null)&& (localStorage.getItem('userRole')!=='worker')){
    return props.children
  }else if((localStorage.getItem('userToken')!==null)&& (localStorage.getItem('userRole')!=='user')){
    return props.children
  }
  else {
    return <Navigate to={'/login'}></Navigate>
  }
}
