import React from 'react';
import Tile from './tile';
import KeyboardManager from './keyboardManager';
import orange from '../images/orange.png';
import apple from '../images/apple.png';
import berry from '../images/berry.png';
import cherry from '../images/cherry.png';
import grapes from '../images/grapes.png';
import mango from '../images/mango.png';
import '../styles/grid.css';

class Grid extends React.Component{
	constructor(props){
		super(props)
		this.fruit_timer = 0
		this.state = {
			human:{},
			fruit:{},
			fruitCollection:[{"url":orange,"points":1},
							{"url":apple,"points":1},
							{"url":berry,"points":2},
							{"url":cherry,"points":2},
							{"url":grapes,"points":3},
							{"url":mango,"points":5}],
			tiles:[],
			allSpaces:[]
		}
	}
	componentDidMount(){
		this.updateHumanPosition()
		this.updateFruitPosition()
	}
	createTiles(){
		let tiles = []
		for(let row=0;row<this.props.rowCount;row++){
			let rows = []
			for(let col=0;col<this.props.colCount;col++ ){
				let isHuman=false
				let isFruit=false
				let fruitUrl = ""
				if(this.state.human && this.state.human.position && this.state.human.position.row == row && this.state.human.position.col == col){
					isHuman = true
				}
				else if(this.state.fruit && this.state.fruit.position && this.state.fruit.position.row == row && this.state.fruit.position.col == col){
					isFruit = true
				}
				rows.push(<Tile isHuman={isHuman} isFruit={isFruit} fruit={this.state.fruit}  row={row} col={col}/>)
			}
			tiles.push(<div className="grid-row">{rows}</div>)
		}
		return tiles
	}
	updateHumanPosition(position){
		if(!position)
			position = this.findEmptySpace()
		this.setState({"human":{"position":position}})
	}
	updateFruitPosition(position){
		if(!position)
			position = this.findEmptySpace()
		this.setState({"fruit":{"position":position}},()=>{
			this.updateSelectedFruit()
		})
	}
	startFruitTimertoUpdateFruit(){
		clearInterval(this.fruit_timer)
		this.fruit_timer = setInterval(this.updateFruitPosition.bind(this), 3000);
	}
	updateSelectedFruit(){
		if (this.state.fruitCollection.length>0){
			let randomFruit = this.state.fruitCollection[Math.floor(Math.random()*(this.state.fruitCollection.length))]
			let fruitState = Object.assign({},this.state.fruit)
			fruitState["selectedFruit"] = randomFruit
			this.setState({
				fruit:fruitState
			},()=>{
				this.startFruitTimertoUpdateFruit()
			})
		}
	}
	findEmptySpace(){
		let tiles = []
		if(this.state.allSpaces.length == 0){
			for(let row=0;row<this.props.rowCount;row++){
				for(let col=0;col<this.props.colCount;col++ ){
					tiles.push({
						"row":row,
						"col":col
					})
					
				}
			}
			this.setState({
				tiles:tiles
			})
		}else{
			tiles = this.state.allSpaces
		}
		let occupiedSpace = []
		if(this.state.human && this.state.human.position){
			occupiedSpace.push(this.state.human.position)
		}
		if(this.state.fruit && this.state.fruit.position){
			occupiedSpace.push(this.state.human.position)
		}
		let emptyTiles = tiles.filter((tile)=>{
			for(let space in occupiedSpace){
				if(tile.row == space.row && tile.col==space.col){
					return false
				}
			}
			return true
		})
		return emptyTiles[Math.floor(Math.random()*(emptyTiles.length))]
	}
	componentDidUpdate(){
		if (this.state.human && this.state.human.position && this.state.fruit && this.state.fruit.position){
			if(this.props.total && this.props.total >= 100){
						
			}
			if (this.state.human.position.row == this.state.fruit.position.row && this.state.human.position.col == this.state.fruit.position.col && this.state.fruit.selectedFruit){
					this.props.updateTotal(this.state.fruit.selectedFruit.points)
					this.updateFruitPosition()
			}

		}
	}

	handleKeyboardEvent(direction){
		if (this.state.human && this.state.human.position && this.state.fruit && this.state.fruit.position && !this.props.disableKeyboard){
				if (direction == "left" && this.state.human.position.col>0){
						let position = Object.assign({},this.state.human.position)
						position.col = position.col-1
						this.updateHumanPosition(position)
					}
				else if(direction == "right" && this.state.human.position.col<this.props.colCount-1){
						let position = Object.assign({},this.state.human.position)
						position.col = position.col+1
						this.updateHumanPosition(position)
					}
				else if(direction == "up" && this.state.human.position.row>0){
						let position = Object.assign({},this.state.human.position)
						position.row = position.row-1
						this.updateHumanPosition(position)
					}
				else if(direction == "down" && this.state.human.position.row<this.props.rowCount-1){
						let position = Object.assign({},this.state.human.position)
						position.row = position.row+1
						this.updateHumanPosition(position)
					}
				
			}
	}
	render(){
		return <KeyboardManager updateKeyboardEvent={this.handleKeyboardEvent.bind(this)}><div className={"grid"}>{this.createTiles()}</div></KeyboardManager>
	}
}

export default Grid;