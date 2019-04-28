import React from 'react';

import { Link } from 'react-router-dom'

import './game-page.css';

const questions = require("./questions.json");
const amounts = require("./amounts.json");

export default class GamePage extends React.Component {

	state = {
		pos: 0,
		reject: false,
		time: '',
		right: false,
		noright: false
	}

	clickItem = e => {
		if(e.target.className != "game_content_answer")
			return;

		if(this.state.reject)
			return

		this.setState({
			reject: true,
			time: e.target.innerHTML
		})
	}

	noright = (el) => {

		this.setState({
			time: false,
			noright: el
		})
	}

	right = (el) => {
		if(this.state.right)
			return

		this.setState({
			right: el
		})
	}

	nextQuestion = () => {
		this.setState({
			right: false,
			reject: false,
			pos: this.state.pos + 1
		})
	}

	lose = () => {
		alert('Вы проебали!Можно начать заново!')

		this.setState({
			noright: false,
			right: false,
			reject: false,
			time: '',
			pos: 0
		})
	}
	
	render() {
		const { pos, time, right, noright } = this.state

		const item = questions[pos];

		return (
			<div className="game">
				<div className="game_bar bar">
					<Link to="/">назад</Link>
					<div className="game_bar_header">
						<div className="game_bar_header_content">
							Ситуация
						</div>
					</div>
					<div className="game_bar_tips tips">
						<div className="tips_header">
							Подсказки
						</div>
						<div className="tips_items">
							<div className="tips_item">50/50</div>
							<div className="tips_item">звонок</div>
							<div className="tips_item">зал</div>
						</div>
					</div>
					<div className="bar_levels">
						<div className="bar_levels_title">
		    				Прохождение
						</div>
						<div className="bar_levels_content">
							{amounts.map(el => {
								let className = "bar_level "

								if(el.fire)
									className += ' bar_level_fire'

								if(el.id == pos)
									className += ' bar_level_active'

								return <div key={el.id} className={className}>{el.amount}</div>
							})}
						</div>
					</div>			
				</div>
				<div className="game_content_wrapper">
					<div className="game_content">
						<div className="game_content_question">{item.question}</div>
						<div className="game_content_answers" onClick={this.clickItem}>
							{ 
								item.answers.map(el => {
								let className = "game_content_answer";

								if(time == el) {
									className += " answer_choose"

									console.log(time == item.right)
									if(time == item.right) {
										setTimeout(() => {
											this.right(el)
										}, 1000)
									} else {
										setTimeout(() => {
											this.noright(el)
										}, 1000)
									}
								}

								if(right == el) {
									className += " answer_right";

									setTimeout(this.nextQuestion
									, 2000)
								}

								if(noright == el) {
									className += " answer_false";								
									
								}

								if(noright) {
									if(el == item.right) {
										console.log(1)
										className += " answer_right";

										setTimeout(this.lose
										, 2000)	
									}

								}

								return (
									<div key={el} className={className}>
										{el}
									</div>
								)	
							})}
						</div>
					</div>
				</div>
			</div>
		)
	}
}