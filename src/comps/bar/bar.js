import React from 'react';

import './bar.css';

const amounts = require("./amounts.json");


export default class Bar extends React.Component {

	render() {

		const { pos } = this.props; 

		return (
			<div className="bar">
				<div className="tips">
					<div className="tips_item tips_item_50"></div>
					<div className="tips_item tips_item_audi"></div>
					<div className="tips_item tips_item_call"></div>
				</div>
				<div className="bar_levels">
					{amounts.map(el => {
						let className = "bar_level "

						if(el.fire)
							className += ' bar_level_fire'

						if(el.id === pos) 
							className += ' bar_level_active'

						return <div key={el.id} className={className}>
									<div className="bar_level_content">
										<div className="bar_level_number">{el.id + 1}</div>
										<div className="bar_level_amount">
											{el.amount}
										</div>
									</div>
								</div>
					})}
				</div>			
			</div>
		)
	}
}

