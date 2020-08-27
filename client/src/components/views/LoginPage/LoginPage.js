import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {loginUser} from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';


const LoginPage=(props)=>{
    const dispatch = useDispatch();

    const[form, setForm] = useState({
        email:'',
        password:''
    });

    const {email,password} = form;
    const onChange = e => {
        const nextForm={
            ...form,
            [e.target.name]:e.target.value
        }
        setForm(nextForm)
    }
    const onSubmitHandler = e =>{
        e.preventDefault();

        let body = {
            email:email,
            password:password
        }

        dispatch(loginUser(body))
        .then(response => {
            if (response.payload.loginSuccess) {
                props.history.push("/")
            } else {
                alert('Error')
            }
        })



    }

    return(
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
        <form style={{display:'flex',flexDirection:'column'}}
            onSubmit={onSubmitHandler}>
            <label>Email</label>
            <input type="email" name='email' value={email} onChange={onChange} />
            <label>Password</label>
            <input type="password" name='password' value={password} onChange={onChange} />
            <br />
            <button type="submit">Login</button>

        </form>
    </div>
    )
}

export default withRouter(LoginPage)