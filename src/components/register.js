import React from 'react';
import { Form, Input, Button, Layout , Image, Alert} from 'antd';
import axios from 'axios';
import logo from '../assets/coventry_phoenix_blue.png'
import Tilt from 'react-tilt'
import { MailOutlined, LockOutlined , LeftOutlined , UserOutlined , IdcardOutlined} from '@ant-design/icons';
import '../Css/login.css'
const { Content } = Layout;
/*
* Registration form component for app signup.
*/

const nameRules = [
    { required: true, message: 'Please input your name!', whitespace: true }
]
const emailRules = [
    {type: 'email', message: 'The input is not valid E-mail!'},
    {required: true, message: 'Please input your E-mail!' }
];
const studentIDRules = [
    { required: true, message: 'Please input your student ID!', whitespace: true },
    ({
        validator(rule, value) {
            if ( value.length === 7)
                return Promise.resolve();
            return Promise.reject('Not a valid student ID');
        }
    })
]
const passwordRules = [
    {   required: true, message: 'Please input your password!' },
    ({ getFieldValue }) => ({
        validator(rule, value){
            if(!/\d/.test(getFieldValue('password'))){
                return Promise.reject('Mush have a digit');
            }
            if(!/[A-Z]/.test(getFieldValue('password'))){
                return Promise.reject('Mush have a capital letter');
            }
            if(!/[a-z]/.test(getFieldValue('password'))){
                return Promise.reject('Mush have a letter');
            }
            if(!getFieldValue('password').length >= 3){
                return Promise.reject('Mush be at least 3 characters long');
            }
            return Promise.resolve();
        }
    })
];
const confirmRules = [
    { required: true, message: 'Please confirm your password!' },
    // rules can include function handlers in which you can apply additional logic
    ({ getFieldValue }) => ({
        validator(rule, value) {
            if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
            }
            return Promise.reject('The passwords that you entered do not match!');
        }
    })
];

class Register extends React.Component {

    state = {
        errorMessage: ''
    }

    onFinish = async (values) => {
        const data = values; // ignore the 'confirm' value
        const response = await axios.post(
          "http://localhost:3030/register",
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
              <Content style={{width: "100%" ,minHeight: "85vh", display: "flex" ,flexWrap: "wrap", justifyContent: "center", alignItems: "center"}}>
                <div className="wrap-login">
                  <Tilt className="Tilt">
                    <a href='/'>
                        <Image src={logo} alt="logo" className="register-pic"  style={{width: "316px", marginTop: "80px"}} preview={false}/>
                        <span className="coventry-text">Coventry University</span>
                    </a>
                  </Tilt>
                  <Form className="login-form" onFinish={this.onFinish} name="Register">
                    <span className="login-form-title">Register</span>
                    <Form.Item name="name" rules={nameRules}>
                        <Input className="input100" size="large" placeholder="Full Name" prefix={<UserOutlined style={{fontSize: "20px",display: "flex", position: "absolute",bottom: 0, left: 0, paddingLeft:"30px", paddingBottom: "15px"}}/>}/>
                    </Form.Item>
                    <Form.Item name="email" rules={emailRules}>
                        <Input className="input100" size="large" placeholder="Email" prefix={<MailOutlined style={{fontSize: "20px",display: "flex", position: "absolute",bottom: 0, left: 0, paddingLeft:"30px", paddingBottom: "15px"}}/>}/>
                    </Form.Item>
                    <Form.Item name="student_id" rules={studentIDRules}>
                        <Input className="input100"  onKeyPress={(event) => {if (!/[0-9]/.test(event.key)) {event.preventDefault();}}} size="large" placeholder="Student ID" prefix={<IdcardOutlined style={{fontSize: "20px",display: "flex", position: "absolute",bottom: 0, left: 0, paddingLeft:"30px", paddingBottom: "15px"}}/>}/>
                    </Form.Item>
                    <Form.Item name="password"  rules={passwordRules}>
                        <Input.Password className="input100" size="large" placeholder="Password" prefix={<LockOutlined style={{fontSize: "20px",display: "flex", position: "absolute",bottom: 0, left: 0, paddingLeft:"30px", paddingBottom: "15px"}}/>}/>
                    </Form.Item>
                    <Form.Item name="confirm_password" rules={confirmRules}>
                        <Input.Password className="input100" size="large" placeholder="Confirm Password" prefix={<LockOutlined style={{fontSize: "20px",display: "flex", position: "absolute",bottom: 0, left: 0, paddingLeft:"30px", paddingBottom: "15px"}}/>}/>
                    </Form.Item>
                    <Form.Item className="container-login100-form-btn">
                        <Button className="login100-form-btn" type="primary" htmlType="submit">
                            Register
                        </Button>
                    </Form.Item>
                    <div style={{textAlign: 'center', padding:0}}>
                        <a className="txt2" href="/">
                            Back to login <LeftOutlined />
                        </a>
                    </div>
                  </Form>
              </div>
              </Content>
        </div>
        );
    };
};

export default Register;