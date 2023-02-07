import React, { useState } from 'react';

import './SignupForm.scss'


const SignupForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')

    const handleCreateAcount = () => {
        //Call API

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
                        <div className='fieldGroup'>
                            <input
                                type='password'
                                name='passwordAgain'
                                placeholder='Nhập lại mật khẩu'
                                maxLength={500}
                                autoComplete='false'
                                value={passwordAgain}
                                onChange={e => {
                                    setPasswordAgain(e.target.value)
                                }}
                            />
                        </div>
                    </form>
                    <button
                        style={{ backgroundColor: '#e14938', fontSize: '17px' }}
                        onClick={handleCreateAcount}
                    >Tạo tài khoản
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;