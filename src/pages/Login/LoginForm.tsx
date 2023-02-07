import React, { useState } from 'react';
import { useRef } from 'react';

import './LoginForm.scss'


const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameRef = useRef()

    const handleLogin = () => {
        //Call API
    }

    const handleForgotPassword = () => {

    }

    const handleCreateAcount = () => {

    }

    return (
        <div className='login-page'>
            <h1 style={{
                paddingBottom: "20px",
                paddingLeft: "8%"
            }}>Quản lý thông tin nhân khẩu</h1>
            <div className='form-content'>
                <div className='content-main'>
                    <form >
                        <div className='fieldGroup'>
                            <input
                                type='text'
                                name='username'
                                placeholder='Tên đăng nhập hoặc email'
                                maxLength={5000}
                                autoComplete='false'
                                value={username}
                                onChange={e => {
                                    setUsername(e.target.value)
                                }}
                            />
                        </div>
                        <div className='fieldGroup'>
                            <input
                                type='password'
                                name='password'
                                placeholder='Mật khẩu'
                                maxLength={500}
                                autoComplete='false'
                                value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                }}
                            />
                        </div>
                        <button
                            type='submit'
                            style={{ color: 'white', fontSize: '17px' }}
                            onClick={handleLogin}
                        >Đăng nhập
                        </button>
                    </form>
                    <div className='content-middle'>
                        <p className='forgot-password'>
                            <span onClick={handleForgotPassword}>
                                Quên mật khẩu?
                            </span>
                        </p>
                    </div>
                    <button
                        style={{ backgroundColor: 'gray', fontSize: '17px' }}
                        onClick={handleCreateAcount}
                    >Tạo tài khoản
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;