'use strict';

const inquirer = require('inquirer');

/**
 * Initialize prompt service
 * @param {Array<string>} names
 * @returns {{() => Promise<Array<string>>, (name: string) => Promise<void>, (name: string, question: string) => Promise<void>}}
 */
const initPromptService = (names) => {
	/**
	 * Ask user existance for every user
	 * @returns {Promise<Array<string>>}
	 */
	const askExistingUsrs = async () => {
		const res = await createExistsQuestions();
		const existingUsrs = Object.entries(res)
			.map(([usr, exists]) => {
				if (exists) return usr;
			})
			.filter((usr) => !!usr);

		return existingUsrs;
	};

	const createExistsQuestions = () => {
		const questions = names.reduce((questions, usr) => {
			const usrExists = {
				name: usr,
				type: 'confirm',
				message: `${usr}?`,
			};
			questions.push(usrExists);
			return questions;
		}, []);
		return inquirer.prompt(questions);
	};

	/**
	 * Asks the user a question
	 * @param {string} name
	 * @returns {Promise<number>}
	 */
	const askPosition = (name) => {
		const inquirerQuestion = {
			name: name,
			type: 'input',
			message: `Resultado de tirada para ${name}`,
		};
		return inquirer.prompt(inquirerQuestion);
	};

	/**
	 * Asks the user a question
	 * @param {string} name
	 * @param {number} position
	 * @returns {Promise<void>}
	 */
	const askQuestion = async (name, question) => {
		const inquirerQuestion = {
			name: name,
			type: 'input',
			message: question,
		};
		return inquirer.prompt(inquirerQuestion);
	};

	return { askExistingUsrs, askPosition, askQuestion };
};

module.exports = initPromptService;
