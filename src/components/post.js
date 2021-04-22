import React from 'react';
import { withRouter } from 'react-router';
import { Row, Col, Image, Typography , Card, Table} from 'antd';

const { Title, Paragraph } = Typography;

class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          post: undefined,
          videos: [],
          video_playing: false
        }
      }

    async getModuleInfo(){
      const id = this.props.match.params.id;
      const response = await fetch(`http://localhost:3030/modules/${id}`);
      const json = await response.json();
      this.setState({ post: json });
    }

    async getModuleVideos(){
      const id = this.props.match.params.id;
      const response = await fetch(`http://localhost:3030/module_videos/${id}`);
      const json = await response.json();
      this.setState({ videos: json });
    }

    loadVideo(video_id){
      this.props.history.push(`/video/${video_id}`);
    }

    async componentDidMount() {
      this.getModuleInfo();
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

        if (!this.state.post) {
            return <h3>Loading post...</h3>
        }
        const post = this.state.post;
        return (
          <div>
            <Card>
              <Row align="middle">
                <Col style={{paddingRight:'50px'}}>
                    <Image width={180} preview={false} style={{marginTop: 5, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}} alt="Post" src={post.imgURL} />
                </Col>
                <Col span={18}>
                    <Title>{post.title}</Title>
                    <Paragraph>{post.summary}</Paragraph>
                    <Paragraph style={{fontWeight:"bold"}}>{post.leader}</Paragraph>
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

export default withRouter(Post);