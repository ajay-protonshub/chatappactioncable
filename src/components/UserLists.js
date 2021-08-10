import React,{useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
function UserLists({location}) {
    let history = useHistory();
    const sender=location.state.state
    const userList=[{id:1, email:'test1@gmail.com'}, 
    {id:2, email:'test2@gmail.com'}, {id:3, email:'test3@gmail.com'}, 
    {id:4, email:'test4@gmail.com'}]
    const [users, Setusers]= useState(userList)
    const handleEvent=async(item)=>{
      
         await localStorage.setItem('user', sender);
        // await  Auth.authenticate();
        history.push('/chat',{state: item.id, current_user:sender })
    }
    return (
        <div style={{margin:40}}>
            <h1>Choose any user for sending a message</h1>
            {users.map((item)=>{
                if(sender!=item.email){
                    return <p style={{cursor:'pointer'}} onClick={()=>handleEvent(item)} >{item.email}</p>
                }
                
            })

            }
        </div>
    )
}

export default UserLists
