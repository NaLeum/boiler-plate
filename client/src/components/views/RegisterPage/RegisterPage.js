import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {registerUser} from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom';

const RegisterPage=(props)=>{
    const dispatch = useDispatch();

    const[form, setForm] = useState({
        email:'',
        password:'',
        name:'',
        confirmPassword:''
    });

    const {email,password,name,confirmPassword} = form;
    const onChange = e => {
        const nextForm={
            ...form,
            [e.target.name]:e.target.value
        }
        setForm(nextForm)
    }
    const onSubmitHandler = e => {
        e.preventDefault();

        if(password !== confirmPassword){
            return alert('비밀번호와 비밀번호혹인은 같아야 합니다.')
        }

        let body = {
            email:email,
            password:password,
            name:name
        }

        dispatch(registerUser(body))
        .then(response => {
            if (response.payload.success) {
                props.history.push("/login")
            } else {
                alert('Failed to Sign Up')
            }
        })



    }
    return(
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>
        <form style={{display:'flex',flexDirection:'column'}}
            onSubmit={onSubmitHandler}>
            <label>Email</label>
            <input type="email" name='email' value={email} onChange={onChange} />

            <label>Name</label>
            <input type="text" name='name' value={name} onChange={onChange} />

            <label>Password</label>
            <input type="password" name='password' value={password} onChange={onChange} />

            <label>Confirm Password</label>
            <input type="password" name='confirmPassword' value={confirmPassword} onChange={onChange} />
            <br />
            <button type="submit">회원가입</button>

        </form>
    </div>
    )
}

export default withRouter(RegisterPage);