import React from 'react'

class Fruit extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		return <img className={"tile-image"} src={this.props.url} />
	}
}

export default Fruit