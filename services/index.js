'use strict';

const { positions, names } = require('../constants/values');
const initUsersService = require('./users');
const initPromptService = require('./prompt');

const { createUser, moveUsr, winnerExists, getWinners, getQuestion } = initUsersService(positions);
const { askExistingUsrs, askPosition, askQuestion } = initPromptService(names);

module.exports = {
	createUser,
	moveUsr,
	winnerExists,
	getWinners,
	getQuestion,

	askExistingUsrs,
	askPosition,
	askQuestion,
};
