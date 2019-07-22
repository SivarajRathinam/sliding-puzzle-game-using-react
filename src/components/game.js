import React from 'react'
import Options from './options'
import Timer from './timer'
import Score from './score'
import Grid from './grid'
import Modal from './modal'

class Game extends React.Component{
	constructor(props){
		super(props);
		this.state={
			"rowCount":3,
			"colCount":3,
			"total":0,
			"isTimerRunning":true,
			"disableKeyboard":false,
			"resetTimer":false,
			"gameStatus":""
		}
	}
	updateTotal(count){
		let total = this.state.total + count
		if (total>=100)
			this.setState({
				"total":total,
				"isTimerRunning":false,
				"disableKeyboard":true,
				"gameStatus":"win"
			})
		else{
			this.setState({
				"total":total
			})
		}
	}
	updateRowCount(row,col){
		this.setState({
			"rowCount":row,
			"colCount":col,
			"total":0,
			"isTimerRunning":true,
			"disableKeyboard":false,
			"resetTimer":true,
			"gameStatus":""
		})
	}
	
	reset(){
		this.setState({
			"total":0,
			"isTimerRunning":true,
			"disableKeyboard":false,
			"resetTimer":true,
			"gameStatus":""	
		})
	}
	showModal(){
		if(this.state.gameStatus){
			return (<Modal restartHandler={()=>this.reset()} gameStatus={this.state.gameStatus}/>)
		}
		return null
	}
	updateGameStatus(status){
		this.setState({"gameStatus":status,"disableKeyboard":true})
	}
	disableReset(){
		this.setState({"resetTimer":false})
	}
	render(){
		return <>
				{this.showModal()}
				<Options handleChange={(row,col)=>this.updateRowCount(row,col)}/> 
				<div className={"game-container"}>
					<div className="header-container">
						<Timer resetTimer={this.state.resetTimer} updateGameStatus={(status)=>this.updateGameStatus(status)} disableReset={()=>this.disableReset()} updateTime={(timer)=>this.updateTime(timer)} isTimerRunning={this.state.isTimerRunning} />
						<Score total={this.state.total}/>
					</div>
					<Grid disableKeyboard={this.state.disableKeyboard} rowCount={this.state.rowCount} colCount={this.state.colCount} updateTotal={(count)=>this.updateTotal(count)} total={this.state.total}/>
				</div>
			</>
	}
}

export default Game