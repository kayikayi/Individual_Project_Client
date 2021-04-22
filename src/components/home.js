import React from 'react';
import { Row, Col, Card } from 'antd';
import PostCard from './postcard';
import Filter from './filter';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      filter: {
        name : undefined,
        year : undefined
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(name, val) {
    this.setState({
      filter: {
        ...this.state.filter,
        [name]: val
      }
    });
  }

  async componentDidMount() {
    const response = await fetch(`http://localhost:3030/modules`);
    const json = await response.json();
    this.setState({ posts: json });
  }
  
  render() {
    
    const dataFilter = function (dataArr, filterArr) {
      let data = dataArr;
      if (filterArr.name) {
        data = data.filter(i => i.title.includes(filterArr.name));
      }
      if (filterArr.year) {
        data = data.filter(i => i.year === parseInt(filterArr.year));
      }
      return data;
    };

    var filteredData = dataFilter(this.state.posts, this.state.filter);

    if (!this.state.posts.length) {
      return <h3>Loading posts...</h3>
    }
    
    // the next line does the Array.map() operation on the posts
    // to create an array of React elements to be rendered
    const cardList = filteredData.map(post => {
    return (
      <div style={{padding:"20px"}} key={post.id}>
        <Col span={6}>
          <PostCard {...post}/>
        </Col>
      </div>
    )});
    return (
      <div>
      <Card style={{margin:"25px"}}>
         <Filter
          onChange={this.handleChange}
          filter={this.state.filter}
          />
      </Card>
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
      </div>
    );
  }
}
export default Home;
