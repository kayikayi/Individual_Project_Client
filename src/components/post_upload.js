import React, { Component } from 'react'
import { withRouter } from 'react-router';
import { Card } from 'antd';
import '../Css/markers.css'

class Player extends Component {
  render () {
    const id = this.props.match.params.id;
    return (
      <Card style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <video width="720" height="420" controls>
        <source src={`http://localhost:3030/video/${id}`} type="video/mp4"/>
      </video>
      </Card>
    )
  }
}

export default withRouter(Player)