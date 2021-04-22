import React from 'react';
import { PushpinOutlined, PushpinFilled } from '@ant-design/icons';
import UserContext from '../context/user'

/**
 * @typedef {"filled" | "outlined"} theme
 * @typedef { "pushpin" } iconType
 */
         
/**
 * Determine the icon to be displayed
 * 
 * @param {theme} theme - design of icon
 * @param {iconType} iconType - icon to show
 * @returns {Object} - the correct Ant Design icon component
 */

function getIcon (theme, iconType) {
    let Icon;
    if (theme === 'filled') {
        if (iconType === 'pushpin') {
            Icon = PushpinFilled
        } 
    } else if (theme === 'outlined') {
        if (iconType === 'pushpin') {
            Icon = PushpinOutlined
        }
    }
    return Icon;
}

class PostIcon extends React.Component {
    static contextType = UserContext
    constructor(props){
        super(props);
        this.state = {
          selected: this.props.selected,
        };
    }

    async onClick(){
        this.setState({selected: !this.state.selected});
        if(!this.state.selected){
            await fetch(`http://localhost:3030/modules/${this.props.id}/pin`,{
                method: 'POST',
                headers: {
                  'Authorization': 'Basic ' + btoa( this.context.user.user_name + ":" + this.context.user.user_password),
                  'Content-Type': 'application/json'}
            })
        } else if(this.state.selected){
            await fetch(`http://localhost:3030/modules/${this.props.id}/pin`,{
                method: 'DELETE',
                headers: {
                  'Authorization': 'Basic ' + btoa( this.context.user.user_name + ":" + this.context.user.user_password),
                  'Content-Type': 'application/json'}
            })
        }
        this.context.getModules();
    }

    componentDidUpdate(prevProps, prevState){
      if (prevState.selected !== this.state.selected) {
        //run the handler passed in by the parent component
        this.props.handleToggle(this.state.selected);
      }
    }

    render(){
        const theme = this.state.selected ? 'filled' : 'outlined';
        const iconType = this.props.type;
        const Icon = getIcon(theme, iconType);
        this.onClick = this.onClick.bind(this);
        return (        
            <span>       
            <Icon onClick={() => this.onClick()} style={{color:'steelblue', paddingRight:'5px'}}/>        
            </span>        
        );       
    }
}

    
export default PostIcon;