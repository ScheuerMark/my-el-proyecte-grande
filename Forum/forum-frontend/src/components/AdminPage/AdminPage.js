import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllUser } from '../ApiRequest';
import './AdminPage.css';


export function AdminPage () {
    const [users, setUsers] = useState(null);

    useEffect(()=>{
        getAllUser().then(x=> setUsers(x))
    },[])

    return (
        <>
    <div className='section rounded p-5'> 
    <h1 className='text-center'>Admin Page</h1>
    <a className='text-dark' data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="true" aria-controls="collapseExample"><h1>User List</h1></a>
        <div className='collapse show' id="collapseExample">
    <table className="table table-light table-striped text-center">
    <thead>
    <tr>
      <th scope="col">User Name</th>
      <th scope="col">Email</th>
      <th scope="col">Roles</th>
      <th scope="col" >Actions</th>
    </tr>
    </thead>
    <tbody>
    {users?.map((user, index) => {
    return (
        <tr key={index}>
        <td>{user.userName}</td>
        <td>{user.email}</td>
        <td>{}</td>
        <td>
        <button type="button" class="btn btn-secondary me-1 btn-sm">Add Role</button>
        <button type="button" class="btn btn-secondary btn-sm">Delete</button>
        </td>
      </tr>
        )  
    })}
    </tbody>
    </table>
    </div>

    <a className='text-dark' data-bs-toggle="collapse" href="#collapseRoles" role="button" aria-expanded="true" aria-controls="collapseExample"><h1>Roles List</h1></a>
        <div className='collapse show' id="collapseRoles">
    <table className="table table-light table-striped text-center">
    <thead>
    <tr>
      <th scope="col">Role Name</th>
      <th scope="col">Delete</th>
      <th scope="col">Edit</th>
      <th scope="col">Change Role</th>
      <th scope="col">Ban</th>
    </tr>
    </thead>
    <tbody>
    {users?.map((user, index) => {
    return (
        <tr key={index}>
        <td>{user.userName}</td>
        <td>{user.email}</td>
        <td>{}</td>
        <td>
        <button type="button" class="btn btn-secondary me-1 btn-sm">Add Role</button>
        <button type="button" class="btn btn-secondary btn-sm">Delete</button>
        </td>
      </tr>
        )  
    })}
    </tbody>
    </table>
    </div>

    


    </div>
    </>
    );
}