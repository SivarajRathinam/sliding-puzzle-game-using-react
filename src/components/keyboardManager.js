import React from 'react';

class KeyboardManager extends React.Component{
	constructor(props){
		super(props)
	}
	handleEvent(event){
		let direction;
		if (event.keyCode==37)
			direction = 'left'
		else if (event.keyCode==38)
			direction = 'up'
		else if (event.keyCode==39)
			direction = 'right'
		else if (event.keyCode==40)
			direction = 'down'
		if (direction){
			this.props.updateKeyboardEvent(direction)
		}
		
	}
	componentDidMount(){
		document.addEventListener('keyup',this.handleEvent.bind(this),false)
	}
	componentWillUnmount(){
		document.removeEventListener('keyup',this.handleEvent.bind(this),false)
	}
	render(){
		return(<>{this.props.children}</>)
	}
}

export default KeyboardManager;