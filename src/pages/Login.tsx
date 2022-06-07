import { LOGIN_URL } from "@api";
import { Button, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [ id, setId ] = useState('');
  const [ pw, setPw ] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const body = {
      email: id,
      password: pw
    };
    axios.post(LOGIN_URL, body).then(res => {
      if(res.data.token){
        localStorage.clear();
        localStorage.setItem('token', res.data.token);
        navigate('/');
      }
      else{
        message.error('일치하는 계정이 없습니다', 1);
        setPw('');
        localStorage.clear();
      }
    }).catch(e => console.log('POST Error'));
  }

  return (
    <>
      <div className="login_box">
        <Input value={id} onChange={e => setId(e.target.value)} />
        <Input value={pw} onChange={e => setPw(e.target.value)} type="password" />
        <Button onClick={handleLogin}>로그인</Button>
      </div>
    </>
  );
};

export default Login;