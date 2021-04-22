import React from 'react';
import { Redirect } from "react-router-dom"
import { Transfer, Input, Table, Tag , Button, Form, message} from 'antd';
import difference from 'lodash/difference';
import axios from 'axios';
import UserContext from '../context/user';
import '../Css/playlist.css';

// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
  
        const rowSelection = {
            getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
            onSelectAll(selected, selectedRows) {
                const treeSelectedKeys = selectedRows
                    .filter(item => !item.disabled)
                    .map(({ key }) => key);
                const diffKeys = selected
                    ? difference(treeSelectedKeys, listSelectedKeys)
                    : difference(listSelectedKeys, treeSelectedKeys);
                onItemSelectAll(diffKeys, selected);
            },
            onSelect({ key }, selected) {
                onItemSelect(key, selected);
            },
            selectedRowKeys: listSelectedKeys,
        };
  
        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? 'none' : null }}
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled || listDisabled) return;
                onItemSelect(key, !listSelectedKeys.includes(key));
              },
            })}
          />
        );
      }}
    </Transfer>
);
  
  const leftTableColumns = [
    {
        dataIndex: 'title',
        title: 'Video Name',
    },
    {
        dataIndex: 'week',
        title: 'Week',
        width: "40px",
        align: "center"
    },
    {
        dataIndex: 'tag',
        title: 'Module',
        align: "center",
        width: "60px",
        render: tag => <Tag>{tag}</Tag>,
    },
    {
        dataIndex: 'description',
        title: 'Description',
    },
  ];
  const rightTableColumns = [
    {
        dataIndex: 'title',
        title: 'Video Name',
    },
    {
        dataIndex: 'tag',
        title: 'Module',
        align: "center",
        width: "60px",
        render: tag => <Tag>{tag}</Tag>,
    }
  ];

class CreatePlaylist extends React.Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            mockData: [],
            targetKeys: [],
            created: false,
            playlist_id: null
        };
    }

    async getVideoList(){
        const res = await axios.get('http://localhost:3030/video_list')
        const data = res.data.video_list
        const options = data.map((d,index) => ({
            "key" : d.video_id,
            "title" : d.video_name,
            "tag" : d.module_name,
            "week" : d.week_number,
            "description": d.description

        }))
        this.setState({ mockData: options })
    }

    async handleUpload(){
        if(document.getElementById('name').value.length === 0){
            message.error('Please give a name to the playlist');
            return;
        }
        if(this.state.targetKeys.length === 0){
            message.error('You need at least one video in the playlist in order to create it');
            return;
        }
        var playlist = {
            selected_videos : this.state.targetKeys,
            playlist_name : document.getElementById('name').value
        }
        const data = new FormData();
        data.append('user', localStorage.getItem('user'));
        data.append('playlist', JSON.stringify(playlist));
        const respone = await axios.post('http://localhost:3030/create_playlist', data)
        if(respone.data.success){
            message.success(respone.data.message);
            this.context.getPlaylists();
            this.setState({ playlist_id : respone.data.id})
            this.setState({ created : true })
        }
        else
            message.error(respone.data.error.message);
    }
    
    onChange = nextTargetKeys => {
        this.setState({ targetKeys: nextTargetKeys });
    };
    componentDidMount(){
        this.getVideoList();
    }
    render() {
    const { targetKeys } = this.state;
    if( this.state.created === true )
        return <Redirect to={`/playlist/${this.state.playlist_id}`} />
    return (
        <div style={{type:"flex" ,justify:"center", align:"middle"}}>
            <TableTransfer
                dataSource={this.state.mockData}
                targetKeys={targetKeys}
                onChange={this.onChange.bind(this)}
                leftColumns={leftTableColumns}
                rightColumns={rightTableColumns}
            />
            <Form style={{marginLeft:"400px", width:"500px"}}>
                <Input style={{marginBottom: 10}} placeholder="Playlist name" className="inputfile" id="name" type="text" name="name" />
                <Button style={{marginLeft:"180px", marginBottom: 10}} onClick={this.handleUpload.bind(this)}>Create Playlist</Button>
            </Form>
        </div>
    );
    }
}

export default CreatePlaylist;