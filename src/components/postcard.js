import React from 'react';
import PostIcon from './posticon';
import NavImage from './navimage';
import { Card } from 'antd';
import UserContext from '../context/user'

const { Meta } = Card;
class PostCard extends React.Component {
    static contextType = UserContext
    constructor(props) {
        super(props);
        this.state = {
        }
        this.togglePinned = this.togglePinned.bind(this);
    }
    togglePinned(isSelected) {
        console.log(`toggle PINNED on post ${this.props.id}`);
        console.log(`new value ${isSelected}`);
        // code can be added here to update the API with new pinned status
    }

    componentDidMount() {
        this.context.getModules();
    }

    render() {
        return (
            <Card style={{ width: 280 }} cover={<NavImage alt={`Post`} src={this.props.imgURL} to={`/post/${this.props.id}`} />} hoverable={true}
            actions={[
                <PostIcon type="pushpin" handleToggle={this.togglePinned} key={this.props.id} id={this.props.id} selected={this.context.modulesArr.includes(this.props.id)}/> 
            ]}>
            <Meta title={this.props.title} description={this.props.summary} style={{whiteSpace:"nowrap", fontWeight:"bold"}} />
            </Card>
        );
    }
}

export default PostCard;