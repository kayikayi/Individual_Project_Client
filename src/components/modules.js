import React from 'react';
import { Row, Col, Card } from 'antd';
import PostCard from './postcard';
import UserContext from '../context/user'
import Filter from './filter';

class Modules extends React.Component {
  static contextType = UserContext
  constructor(props) {
    super(props);
    this.state = {
      filter : {
        name : undefined,
        year : undefined
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }
  async componentDidMount() {
    this.context.getModules();
  }

  handleChange(name, val) {
    this.setState({
      filter: {
        ...this.state.filter,
        [name]: val
      }
    });
  }

  render() {
    //const modules = this.context.user_modules.split(",").map(Number)

    var filter = this.state.filter;

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

    if (!this.context.modules) {
      return <h3>Loading posts...</h3>
    }

    var filteredData = dataFilter(this.context.modules, filter);

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
export default Modules;
