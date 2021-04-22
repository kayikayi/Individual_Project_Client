import React from "react";
import { Layout , Button , Dropdown , Menu , Avatar } from 'antd';
import '../App.css';

import Nav from './nav';
import Home from './home';
import Modules from './modules';
import Account from './account'; 
import Post from './post';
import Settings from './settings';
import UploadPage from './upload';
import CreatePlaylist from './createPlaylist';
import PostUpload from './post_upload';
import Playlist from './playlist_page';

import UserContext from '../context/user';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined , LeftCircleOutlined , DownOutlined, UserOutlined, LogoutOutlined} from '@ant-design/icons';

const { Header, Content, Footer , Sider } = Layout;

class App extends React.Component {
  state = {
    collapsed: false,
    playlists: [],
    modules: [],
    modulesArr: []
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  async getPlaylists(){
      await fetch(this.props.user.links.playlists,{
        method: 'GET',
        headers: {
          'Authorization': 'Basic ' + btoa( this.props.user.user_name + ":" + this.props.user.user_password),
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

  async getModules(){
    await fetch(this.props.user.links.modules,{
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa( this.props.user.user_name + ":" + this.props.user.user_password),
        'Content-Type': 'application/json'}
    })
    .then(res=>res.json())
    .then(res => {
      this.setState({ modulesArr : res.modulesArr})
      this.setState({ modules : res.modules })
    })
    .catch(error => {
      console.log(error)
    });
  }

  render() {

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}><Link to="/account">Profile</Link></Menu.Item>
      <Menu.Item key="2" icon={<LogoutOutlined />}><Link to="/logout" onClick={handleLogout}>Log out</Link></Menu.Item>
    </Menu>
  );

  const context = {
    user : this.props.user,
    playlists : this.state.playlists,
    modules : this.state.modules,
    modulesArr: this.state.modulesArr,
    getPlaylists : this.getPlaylists.bind(this),
    getModules: this.getModules.bind(this)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <UserContext.Provider value={context}>
      <Router>
      <Sider trigger={null} collapsible collapsed={this.state.collapsed} style={{ backgroundColor:"#040404" }}>
        <Link to="/">
          <div className="logo">
            <svg height="480pt" viewBox="0 -80 480 480" width="480pt" xmlns="http://www.w3.org/2000/svg"><path d="m16 176h32c8.835938 0 16-7.164062 16-16s-7.164062-16-16-16h-32c-8.835938 0-16 7.164062-16 16s7.164062 16 16 16zm0 0"/><path d="m128 192v-64c0-8.835938-7.164062-16-16-16s-16 7.164062-16 16v64c0 8.835938 7.164062 16 16 16s16-7.164062 16-16zm0 0"/><path d="m160 272c0 8.835938 7.164062 16 16 16s16-7.164062 16-16v-32c0-8.835938-7.164062-16-16-16s-16 7.164062-16 16zm0 0"/><path d="m176 192c8.835938 0 16-7.164062 16-16v-128c0-8.835938-7.164062-16-16-16s-16 7.164062-16 16v128c0 8.835938 7.164062 16 16 16zm0 0"/><path d="m464 144h-32c-8.835938 0-16 7.164062-16 16s7.164062 16 16 16h32c8.835938 0 16-7.164062 16-16s-7.164062-16-16-16zm0 0"/><path d="m256 224v-128c0-8.835938-7.164062-16-16-16s-16 7.164062-16 16v128c0 8.835938 7.164062 16 16 16s16-7.164062 16-16zm0 0"/><path d="m320 208v-80c0-8.835938-7.164062-16-16-16s-16 7.164062-16 16v80c0 8.835938 7.164062 16 16 16s16-7.164062 16-16zm0 0"/><path d="m352 304c0 8.835938 7.164062 16 16 16s16-7.164062 16-16v-192c0-8.835938-7.164062-16-16-16s-16 7.164062-16 16zm0 0"/><path d="m368 64c8.835938 0 16-7.164062 16-16v-32c0-8.835938-7.164062-16-16-16s-16 7.164062-16 16v32c0 8.835938 7.164062 16 16 16zm0 0"/></svg>
            <h1>CU Voice</h1>
          </div>
        </Link>
        <Nav user_type = { this.props.user.role }/>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ background:"#090909" , padding: 0 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
          })}
            <LeftCircleOutlined className='nav_arrow' onClick={() => window.history.back()}/>
            
            <Dropdown overlay={menu}>
            <Button shape="round" size="large" style={{ position: 'absolute',top: '0.8rem',right: '1rem'}}>
              <Avatar style={{ right: '15px', bottom: '4px'}}  src={ this.props.user.imageURL }/>
              {this.props.user.user_name}
              <DownOutlined />
            </Button>
          </Dropdown>
        </Header>
        <Content>
            <Switch>
              <Route path="/account" children={<Account user_id = {this.props.user.user_id} user_name = {this.props.user.user_name} user_email = {this.props.user.user_email} student_id = {this.props.user.user_student_id} user_avatar = {this.props.user.imageURL} />} /> 
              <Route path="/post/:id" children={<Post />} />
              <Route path="/modules" children={<Modules />} />
              <Route path="/settings" children={<Settings />} />
              <Route path="/upload" children={<UploadPage />} />
              <Route path="/create_playlist" children={<CreatePlaylist />} />
              <Route path="/video/:id" children={<PostUpload />} />
              <Route path="/playlist/:id" children={<Playlist />} />
              <Route path="/" children={<Home />} />
            </Switch>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Created for 6001CEM</Footer>
      </Layout>
      </Router>
      </UserContext.Provider>
    </Layout>
  )
}}

export default App;