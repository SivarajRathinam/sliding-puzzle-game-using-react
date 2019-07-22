import React from 'react';
import background from './images/background.png'
import Game from './components/game'
import Instructions from './components/instructions'
import orange from './images/orange.png';
import apple from './images/apple.png';
import berry from './images/berry.png';
import cherry from './images/cherry.png';
import grapes from './images/grapes.png';
import mango from './images/mango.png';

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {fruitCollection:[{"url":orange,"points":1},
							{"url":apple,"points":1},
							{"url":berry,"points":2},
							{"url":cherry,"points":2},
							{"url":grapes,"points":3},
							{"url":mango,"points":5}]}
	}
	render(){
		return(
			<div style={{backgroundImage:`url(${background})`,height:"100%"}}>
				<Game/>
				<Instructions fruitsCollection={this.state.fruitCollection}/>
			</div>
			)
	}
}

export default App