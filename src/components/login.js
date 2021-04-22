import React from 'react';
import { Form, Input, Button, Layout , Image, Alert} from 'antd';
import axios from 'axios';
import logo from '../assets/coventry_phoenix_blue.png'
import Tilt from 'react-tilt'
import { MailOutlined, LockOutlined , RightOutlined } from '@ant-design/icons';
import '../Css/login.css'
const { Content } = Layout;
/*
* Registration form component for app signup.
*/

const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' }
];
const passwordRules = [
{    required: true, message: 'Please input your password!' }
];

class Login extends React.Component {

  state = {
    errorMessage: ''
  }

  onFinish = async (values) => {
      const data = values; // ignore the 'confirm' value
      const response = await axios.post(
        "http://localhost:3030/login",
        data
      );
      if(response.data.error)
        this.setState({errorMessage: response.data.error.message})  
      else if (response.data){
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.reload();
      }
  };

  render() {
      return (
        <div className="background">
            { this.state.errorMessage && <h3 className="error"> <Alert message={this.state.errorMessage} type="error" showIcon /> </h3> }
            <Content style={{width: "100%" , maxWidth: "100%",minHeight: "85vh", display: "flex" ,flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
              <div className="wrap-login">
                <Tilt className="Tilt">
                  <a href='/'>
                    <Image src={logo} className="login-pic" alt="logo" style={{width: "316px"}} preview={false}/>
                    <span className="coventry-text">Coventry University</span>
                  </a>
                </Tilt>
                <Form className="login-form" onFinish={this.onFinish} name="Login">
                  <span className="login-form-title">Login</span>
                  <Form.Item name="email" rules={emailRules}>
                      <Input className="input100" autoComplete="off" size="large" placeholder="Email" prefix={<MailOutlined style={{fontSize: "20px",display: "flex", position: "absolute",bottom: 0, left: 0, paddingLeft:"30px", paddingBottom: "15px"}}/>}/>
                  </Form.Item>
                  <Form.Item name="password" rules={passwordRules}>
                      <Input.Password className="input100" autoComplete="off" size="large" placeholder="Password" prefix={<LockOutlined style={{fontSize: "20px",display: "flex", position: "absolute",bottom: 0, left: 0, paddingLeft:"30px", paddingBottom: "15px"}}/>}/>
                  </Form.Item>
                  <Form.Item className="container-login100-form-btn">
                      <Button className="login100-form-btn" type="primary" htmlType="submit">
                        Login
                      </Button>
                  </Form.Item>
                  <div style={{textAlign: 'center', padding:0}}>
                      <a className="txt2" href="/register">
                        Create your Account <RightOutlined />
                      </a>
                  </div>
                </Form>
            </div>
            </Content>
      </div>
      );
  };
};

export default Login;