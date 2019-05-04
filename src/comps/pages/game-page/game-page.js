import React from 'react';

import './game-page.css';

import Bar from '../../bar'

const questions = require("./questions.json");


export default class GamePage extends React.Component {

	state = {
		pos: 0,
		choose: true,
		answer: false,
		res: false
	}

	clickItem = e => {
		if(e.target.className !== "game_content_answer" || !this.state.choose)
			return;

		this.setState({
			choose: false,
			answer: e.target.innerHTML

		}, () => setTimeout(this.check, 1000))
	}

	check = () => {
		
		const {answer, pos } = this.state,
			   answer_right = questions[pos].right; 

		this.setState({res: true})
		
		setTimeout(() => {
			const condition = answer === answer_right;

			if(!condition)
				alert('Вы проебали!Можно начать заново!');

			this.setState({
				pos: condition ? this.state.pos + 1 : 0,
				choose: true,
				answer: false,
				res: false
			})	

		}, 1000);
	}
	
	render() {
		const { pos, answer, res } = this.state,
				item = questions[pos];

		return (
			<div className="game">
				<div className="game_main">
					
					<Bar pos={pos}/>

					<div className="game_main_bg"></div>
				</div>
				
				<div className="game_footer">
					<div className="game_content">
						<div className="game_content_question">{item.question}</div>
						<div className="game_content_answers" onClick={this.clickItem}>
							{ 
								item.answers.map(el => {
									let className = "game_content_answer";

									if(!res && el === answer) 
										className += " answer_choose";

									if(res && el === item.right) 
										className += " answer_right";

									if(res && answer !== item.right && answer === el) 
										className += " answer_false";
									
									return <div key={el} className={className}>
											{el}
										</div>
								})
							}
						</div>
					</div>
				</div>
			</div>
			
		)
	}
}