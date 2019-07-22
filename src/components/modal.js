import React from 'react'
import '../styles/modal.css'

class Modal extends React.Component{
	constructor(props){
		super(props)
		this.click = this.clickHandler.bind(this)
	}
	clickHandler(){
		this.props.restartHandler()
	}
	template(header,bodyContent,footerText){
		return <div className="backdrop">
						<div className="modal">
							<div className="modal-container">
								<div className="modal-header">
									{header}
								</div>
								<div className="modal-body">
									{bodyContent}
								</div>
								<div className="modal-footer">
									<span onClick={this.click} className="restart-button">{footerText}</span>
								</div>
							</div>
						</div>
					</div>
	}
	showStatus(){
		if (this.props.gameStatus =='win'){
			return this.template('congrats','you win','restart game')
		}else if(this.props.gameStatus =='loss'){
			return this.template('oops','you lost','try again')
		}
		return null
	}
	render(){
		return (<>{this.showStatus()}</>)
	}
}

export default Modal;