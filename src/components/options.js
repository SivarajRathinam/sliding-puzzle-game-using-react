import React from 'react'
import '../styles/options.css'

class Options extends React.Component{
	constructor(props){
		super(props)
		this.handleClick = this.handleOptionClick.bind(this)
		this.state = {
			positionOptions:[{
				rowCount:3,
				colCount:3,
				text:'3X3'
			},{
				rowCount:4,
				colCount:4,
				text:'4X4'
			},{
				rowCount:5,
				colCount:5,
				text:'5X5'
			}],
			checked:'3X3'
		}
	}
	handleOptionClick(event){
		this.setState({
			checked:event.target.value
		},()=>{
			let val = this.state.positionOptions.find((position)=>position.text==this.state.checked)
			this.props.handleChange(val.rowCount,val.colCount)
			
		})
	}
	showOptions(){
		return this.state.positionOptions.map((position)=>{
			let isChecked = false
			if (position['text'] == this.state.checked)
				isChecked = true
			return (<label className="option-type-container">
						{position['text']}
						<input onClick={this.handleClick} type="radio" name='puzzleType' checked={isChecked} value={position['text']}/>
						<span className="checkmark"></span>
						</label>)
		})
	}
	render(){
		return(<div className="option-container">
				{this.showOptions()}
				</div>)
	}
}
export default Options