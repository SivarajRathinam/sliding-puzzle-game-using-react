import React from 'react'
import '../styles/instruction.css'

const Instructions = (props)=>{
	let pointsTable = null
	if(props.fruitsCollection){
		pointsTable = props.fruitsCollection.map((fruits)=>{
				return (<tr><td align="center">
							<img className="pointstable-image" src={fruits.url} />
						</td>
						<td align="center">
							<span>{fruits.points}</span>
						</td>
					</tr>)
		})
	}
	return (<div className="instruction-container">
				<h2>Instructions</h2>
				<ol>
					<li>use arrows to help the man to reach fruit</li>
					<li>fruits will disappear in some time, grab it before disappear</li>
					<li>Try to get 100 points before time goes out</li>
					<li>points for each fruit displayed below</li>
				</ol>
				<table>
					<thead>
						<th>
						Fruit image
						</th>
						<th>
						points
						</th>
					</thead>
					<tbody>
						{pointsTable}
					</tbody>
				</table>
			</div>)
}

export default Instructions;