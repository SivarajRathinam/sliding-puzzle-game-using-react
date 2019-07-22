import React from 'react';
import Player from './player';
import Fruit from './fruit';

class Tile extends React.Component{
	constructor(props){
		super(props)
	}
	showImage(){
		if (this.props.isHuman){
			return <Player />
		}else if(this.props.isFruit){
			if(this.props.fruit.selectedFruit){
				return <Fruit url={this.props.fruit.selectedFruit.url} />
			}
		}
		return null
	}
	render(){
		return <div className={"tile"}>
				{this.showImage()}
				</div>
	}
}

export default Tile;