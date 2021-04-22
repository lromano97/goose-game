'use strict';

/**
 * Initialize users service
 * @param {number} positions
 * @returns {{(name: string, questions: Array<string>) => void, (name: string, move: number) => number, () => boolean, () => Array<string> (name: string) => string}}
 */
const initUsersService = (positions) => {
	const users = {};

	/**
	 * Create user
	 * @param {string} name
	 * @param {Array<string>} questions
	 */
	const createUser = (name, questions) => {
		users[name] = {};
		users[name].position = 0;
		users[name].questions = [...questions];
	};

	/**
	 * Move user
	 * @param {string} name
	 * @param {number} move
	 * @returns {number} Actual position
	 */
	const moveUsr = (name, move) => {
		users[name].position += move;
		return users[name].position;
	};

	/**
	 * Check winner existance
	 * @returns {boolean} winner exists?
	 */
	const winnerExists = () => {
		const winner = getWinners();
		return winner.length !== 0;
	};

	/**
	 * Get the winners
	 * @returns {Array<string>}
	 */
	const getWinners = () => {
		return Object.entries(users)
			.filter(([_, { position, questions }]) => position === positions || questions.length === 0)
			.map(([name, _]) => name);
	};

	/**
	 * Get question for user
	 * @param {string} name
	 * @returns {string} question
	 */
	const getQuestion = (name) => {
		const questionsLength = users[name].questions.length;
		const questionPosition = Math.floor(Math.random() * questionsLength);
		const question = users[name].questions[questionPosition];
		users[name].questions.splice(questionPosition, 1);
		return question;
	};

	return { createUser, moveUsr, winnerExists, getWinners, getQuestion };
};

module.exports = initUsersService;
