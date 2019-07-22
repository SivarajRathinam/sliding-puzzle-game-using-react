import React from 'react';

class Score extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <div className="Score">Score : {this.props.total}</div>
	}
}

export default Score;