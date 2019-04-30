import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Card, Form } from 'react-bootstrap';

import { addVote } from "../actions/questions";

class Question extends Component {
	state = {
		vote: 'one'
	}

	handleVote = (event) => {
		event.preventDefault();
		const { authedUser, dispatch, question } = this.props;
		dispatch(addVote(authedUser, question.id, this.state.vote));
	}

	handleChange = (event) => {
		console.log(event.currentTarget.id);
		this.setState({ vote: event.currentTarget.id })
	}

	render() {
		const { author, question } = this.props;

		return (
			<Card style={{ width: '18rem' }}>
				<Card.Header>{author.name} asks:</Card.Header>
				<Card.Body>
					<Card.Title>Would You Rather?</Card.Title>
					<Form
						 onSubmit={event => this.handleVote(event)}>

						<Form.Check 
							type='radio'
							name='answer'
							id='optionOne'
							onChange={event => this.handleChange(event)}
							label={question.optionOne.text} />
						<Form.Check 
							type='radio'
							name='answer'
							id='optionTwo'
							onChange={event => this.handleChange(event)}
							label={question.optionTwo.text} />
						<Button variant="primary" type="submit">
							Vote
						</Button>
					</Form>
				</Card.Body>
			</Card>
		);
	}
}

function mapStateToProps({ authedUser, questions, users }, { match }) {
	const question = questions[match.params.id];
	const author = users[question.author];

	return {
		authedUser,
		question,
		author
	}
}

export default connect(mapStateToProps)(Question);