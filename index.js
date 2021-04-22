'use strict';

const chalk = require('chalk');
const fs = require('fs');
const { promisify } = require('util');
const { positions } = require('./constants/values');
const {
	createUser,
	getQuestion,
	getWinners,
	moveUsr,
	winnerExists,
	askExistingUsrs,
	askPosition,
	askQuestion,
} = require('./services');

const readFileAsync = promisify(fs.readFile);

/*
    1. Cargar las preguntas
    2. Crear los usuarios con las preguntas
    3. Obtener el listado de usuarios
    4. Crear usuarios con instancia de preguntas
    5. Iterar hasta que haya un ganador
        a. Iterar sobre cada usuario
        b. Si en la iteracion hay un ganador => break
        c. Realizar pregunta (ver como implementar el random)
        d. Remover pregunta que se hizo
    6. Hay ganador => Se imprime por consola
*/

const main = async () => {
	const questions = await loadQuestions();
	const existingUsrs = await askExistingUsrs();
	createUsers(existingUsrs, Object.values(questions));
	while (!winnerExists()) {
		for (const usr of existingUsrs) {
			const newMove = await askPosition(usr);
			await askQuestion(usr, getQuestion(usr));
			const newPosition = moveUsr(usr, +newMove[usr]);
			console.log(chalk.greenBright(`\n${usr} está en la posición ${newPosition}\n`));
			if (newPosition === positions) {
				break;
			}
		}
	}
	console.log(chalk.red(`El ganador es ${getWinners()[0]}`));
};

/**
 * Create users
 * @param {Array<string>} arrOfUsr
 * @param {Array<string>} questions
 */
const createUsers = (arrOfUsr, questions) => {
	for (const usr of arrOfUsr) {
		createUser(usr, questions);
	}
};

/**
 * Loads questions from file
 * @returns {Promise<Array<string>>} questions
 */
const loadQuestions = async () => {
	try {
		const questions = await readFileAsync('./questions.json');
		return JSON.parse(questions.toString());
	} catch (err) {
		throw new Error('cannot read questions file.');
	}
};

(async () => main())();
