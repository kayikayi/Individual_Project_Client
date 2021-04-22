import React from 'react';
import { withRouter } from 'react-router';
import { Row, Col, Typography , Card, Table , Popconfirm , message} from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import UserContext from '../context/user';
import axios from 'axios';

const { Title } = Typography;

class Playlist extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
          playlist: undefined,
          videos: [],
          video_playing: false,
          isModalVisible: false
        }
      }

    async getPlaylistInfo(){
      const id = this.props.match.params.id;
      const response = await fetch(`http://localhost:3030/playlist/${id}`);
      if(response.status === 200){
        const json = await response.json();
        this.setState({ playlist: json });
      }
      if(response.status === 404){
        message.error("This playlist is no loger available")
      }
    }

    async getModuleVideos(){
      const id = this.props.match.params.id;
      const response = await axios.get(`http://localhost:3030/playlist/${id}/videos`);
      this.setState({ videos: response.data });
    }

    loadVideo(video_id){
      this.props.history.push(`/video/${video_id}`);
    }

    async confirm() {
      const id = this.props.match.params.id;
      fetch(`http://localhost:3030/playlist/${id}`,{
        method: 'DELETE'
      })
      .then(res => res.json())
      this.props.history.push("/");
      message.success('The playlist was deleted')
      this.context.getPlaylists();
    }

    componentDidMount() {
      this.getPlaylistInfo();
      this.getModuleVideos();
    }

    render() {
        const columns = [
          {
            title:"video_id",
            dataIndex:"video_id",
            key:"video_id",
            width:10,
            align: "center"
          },
          {
            title: 'Week',
            dataIndex: 'week_number',
            key: 'week_number',
            width: 50,
            align: "center",
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            align: "center",
          },
          {
            title: 'Topics',
            dataIndex: 'topic',
            key: 'topic',
            align: "center",
          },
          {
            title: 'Date Added',
            dataIndex:'video_added_at',
            key: 'video_added_at',
            align: "center",
          },
        ];

        if (!this.state.playlist) {
            return <h3>Loading playlist...</h3>
        }
        return (
          <div>
            <Card>
            <Row align="middle">
                <Col span={23} style={{paddingRight:'50px'}}>
                  <Title>{this.state.playlist.playlist_name}</Title>
                </Col>
                <Col span={1}>
                <Popconfirm
                  title="Are you sure to delete this playlist?"
                  placement="bottomLeft"
                  onConfirm={this.confirm.bind(this)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteFilled style={{color:"red", marginBottom:"20px", fontSize:"30px"}}/>
                </Popconfirm>
                </Col>
              </Row>
            </Card>
            <Table columns={columns} dataSource={this.state.videos} pagination={{ defaultPageSize: 4 }} onRow={(r) => ({
              onClick: () => (this.loadVideo(r.video_id))
            })} />
          </div>
        );
    }
}

export default withRouter(Playlist);