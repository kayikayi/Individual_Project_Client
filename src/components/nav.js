import React from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { SearchOutlined, AppstoreOutlined, SettingOutlined, CloudUploadOutlined, FolderAddOutlined} from '@ant-design/icons';
import UserContext from '../context/user'

class Nav extends React.Component {
  static contextType = UserContext
  constructor(props) {
    super(props);
    this.state = {
      playlists: []
    }
  }

  async getPlaylists(){
    await fetch(this.context.links.playlists,{
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa( this.context.user_name + ":" + this.context.user_password),
        'Content-Type': 'application/json'}
    })
    .then(res=>res.json())
    .then(res => {
      this.setState({ playlists : res.playlists })
    })
    .catch(error => {
      console.log(error)
    });
  }

  async componentDidMount() {
    this.context.getPlaylists();
  }

  render(){
    let playlists = [];
    if(this.context.playlists){ 
      playlists = this.context.playlists.map((playlist,index) => {
      return (
        <Menu.Item key={index+6}><Link to={`/playlist/${playlist.playlist_id}`}>{playlist.playlist_name}</Link></Menu.Item>
      )});
    }
    return (
      <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']}>
        <Menu.Item key="1" icon={<SearchOutlined />}><Link to="/">Browse</Link></Menu.Item> 
        <Menu.Item key="2" icon={<AppstoreOutlined />}><Link to="/modules">Modules</Link></Menu.Item>
        {this.props.user_type === 'admin' && <Menu.Item key="3" icon={<SettingOutlined />}><Link to="/settings">Settings</Link></Menu.Item>}
        {this.props.user_type === 'admin' && <Menu.Item key="4" icon={<CloudUploadOutlined />}><Link to="/upload">Upload</Link></Menu.Item>}
        <Menu.Item key="5" icon={<FolderAddOutlined />}><Link to="/create_playlist">Create Playlist</Link></Menu.Item>
        <div style={{color:"white", padding:"15px", marginLeft:"40px", fontWeight:"bold", fontSize:"15px", letterSpacing:"3px"}}>Playlists</div>
        <hr style={{color:"white", height:"2px"}}/>
        {playlists}
      </Menu>      
    );
  }
}

export default Nav;