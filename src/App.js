import React, { useState } from 'react'
import {useHistory } from 'react-router-dom'
import Auth from './Auth'
const Login = () => {
    let history = useHistory();
    const [user, setUser] = useState('');
    const userList=[{id:1, email:'test1@gmail.com'}, 
    {id:2, email:'test2@gmail.com'}, {id:3, email:'test3@gmail.com'}, 
    {id:4, email:'test4@gmail.com'}]
    const [userEmail, SetuserEmail]= useState(userList)
    const handleEvent = async () => {

        await localStorage.setItem('user', user);

        await Auth.authenticate();
        switch (user) {
            case 'test1@gmail.com':
                localStorage.setItem('sender_id', 1);
                break;
            case 'test2@gmail.com':
                localStorage.setItem('sender_id', 2);
                break;
            case 'test3@gmail.com':
                localStorage.setItem('sender_id', 3);
                break;
            case 'test4@gmail.com':
                localStorage.setItem('sender_id', 4);
                break;
            default:
                console.log(`no user find`)
        }
        history.push('/users', { state: user })
    }
    return (
        <div style={container}>
            <div style={inputFieldContainer}>
                <div style={{
                    color: '#fff', fontSize: 20,
                    textAlign: 'center', marginBottom: 10
                }}>Welcome</div>
                <input
                    type="text"
                    style={inputStyle}
                    placeholder="Please enter user name"
                    value={user}
                    onChange={e => setUser(e.target.value)}
                />
                {user !== '' &&
                    <button style={buttonStyles}
                        onClick={handleEvent}>
                        Continue
                </button>}
                <div>
                <h3 style={{color:'#fff'}}>Please type any userId for login</h3>
                {userEmail.map((item)=>{
                
                    return <p style={{cursor:'pointer', color:'#fff'}}>{item.email}</p>
                
                
            })

            }
            </div>
            </div>
       
        </div>
    )
}
const container = {
    alignItems: 'center',
    background: '#282c34',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
};
const inputFieldContainer = {
    display: 'flex',
    flexDirection: 'column',
    height: '50vh',
    width: '50%',
};

const inputStyle = {
    height: '20px',
    marginBottom: 10,
    fontSize: '16px',
    padding: '5px 10px',
};
const buttonStyles = {
    fontSize: '1.1rem',
    padding: '10px 15px',

};
export default Login
