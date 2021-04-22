import React from 'react'; 
import { Card , Row, Col , Avatar, Divider} from 'antd';

function Account(props) { 
    return (
        <Row>
            <div style={{padding:"20px"}}>
            <Col type="flex" align="middle">
                <Card style={{ width: 400 }}>
                    <Avatar size={160} style={{ alignItems: "center"}} src={props.user_avatar} />
                    <Col style={{fontSize:"20px", paddingTop:"20px" ,fontWeight:"bold"}}>
                        {props.user_name}
                    </Col>
                </Card>
            </Col>
            </div>
            <div style={{padding:"20px"}}>
            <Col type="flex" align="middle">
                <Card style={{ width: 850 }}>
                    <Row>
                        <Col style={{paddingRight:"5rem" ,fontSize:"20px" ,fontWeight:"bold"}}>
                        Full Name
                        </Col>
                        <Col style={{fontSize:"20px"}}>
                        {props.user_name}
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col style={{paddingRight:"8rem" ,fontSize:"20px" ,fontWeight:"bold"}}>
                        Email
                        </Col>
                        <Col style={{fontSize:"20px"}}>
                        {props.user_email}
                        </Col>
                    </Row>
                    <Divider/>
                    <Row>
                        <Col style={{paddingRight:"5rem" ,fontSize:"20px" ,fontWeight:"bold"}}>
                        Student_id
                        </Col>
                        <Col style={{fontSize:"20px"}}>
                        {props.student_id}
                        </Col>
                    </Row>
                </Card>
            </Col>
            </div>
        </Row>
    ); 
}

export default Account;