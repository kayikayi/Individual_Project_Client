import React, { Component } from 'react';
import { Input, Radio } from 'antd';
import '../Css/filter.css'

const { Search } = Input;

class Filter extends Component {
  
  onSearch = value => this.props.onChange( "name" , value );

  onChange(e) {
    if(parseInt(e.target.value) === 0)
        this.props.onChange( "year" , undefined);
    else this.props.onChange( "year" , e.target.value );
  }
  
  render() {
      return (
          <div className="filter">
              <div className="filter_element">
                  <label>Module Name</label>
                  <Search placeholder="Input search text" onSearch={this.onSearch.bind(this)} style={{ width: 200 }} />
              </div>
             <div className="filter_element">
                <label>Year</label>
                <Radio.Group onChange={this.onChange.bind(this)} defaultValue="a">
                    <Radio.Button value="1">First</Radio.Button>
                    <Radio.Button value="2">Second</Radio.Button>
                    <Radio.Button value="3">Third</Radio.Button>
                    <Radio.Button value="0">All</Radio.Button>
                </Radio.Group>
             </div>
         </div>
      )
  }
}

export default Filter;