import React from 'react';

import './game-page.css';

import Bar from '../../bar';

import { Provider } from '../../context';

const questions = require("./questions.json");


export default class GamePage extends React.Component {

	state = {
		pos: 0,
		choose: true,
		answer: false,
		answers: questions[0].answers,
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
			}, () => {
				this.setState({
					answers: questions[this.state.pos].answers
				})
			})	

		}, 1000);
	}

	callTip50 = () => {
		let arr = this.state.answers.slice();
		let { pos } = this.state;
		let right = questions[pos].right;
		
		// let random = Math.random() >= 0.5;

		let mount = true

		arr = arr.map((el,idx) => {
			if(el === right)
				return el

			if(mount) 
				el = ''
			
			mount = !mount

			return el

		})

		this.setState({ answers: arr })
	}
	
	render() {
		const { pos, answer, res, answers } = this.state,
				item = questions[pos];

		return (
			<Provider value={this.callTip50}>
				<div className="game">
					<div className="game_main">

						<Bar pos={pos} />

						<div className="game_main_bg"></div>
					</div>
					
					<div className="game_footer">
						<div className="game_content">
							<div className="game_content_question">{item.question}</div>
							<div className="game_content_answers" onClick={this.clickItem}>
								{ 
									answers.map((el, idx) => {
										let className = "game_content_answer";

										if(!res && el === answer) 
											className += " answer_choose";

										if(res && el === item.right) 
											className += " answer_right";

										if(res && answer !== item.right && answer === el) 
											className += " answer_false";
										
										return <div key={idx} className={className}>
												{el}
											</div>
									})
								}
							</div>
						</div>
					</div>
				</div>
			</Provider>
		)
	}
}