/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file.
 *
 * UI microservice of Identifier Services
 *
 * Copyright (C) 2019 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of identifier-services-ui
 *
 * identifier-services-ui program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * identifier-services-ui is distributed in the hope that it will be useful,
	console.log(values);
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
	console.log(values);
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this file.
 *
 */

import nodemailer from 'nodemailer';
import winston from 'winston';
import moment from 'moment';
import stringTemplate from 'string-template-js';
import {URL} from 'url';

const logger = createLogger();

export function generateAuthorizationHeader(username, password = '') {
	const encoded = Buffer.from(`${username}:${password}`).toString('base64');
	return `Basic ${encoded}`;
}

export function readEnvironmentVariable(name, {defaultValue = undefined, hideDefault = false, format = v => v} = {}) {
	if (process.env[name] === undefined) {
		if (defaultValue === undefined) {
			throw new Error(`Mandatory environment variable missing: ${name}`);
		}

		const defaultValuePrintable = typeof defaultValue === 'object' ? JSON.stringify(defaultValue) : defaultValue;

		console.error(`No environment variable set for ${name}, using default value: ${hideDefault ? '[hidden]' : defaultValuePrintable}`);
		return defaultValue;
	}

	return format(process.env[name]);
}

export function clone(o) {
	return JSON.parse(JSON.stringify(o));
}

// Const whitelist = JSON.parse(readEnvironmentVariable('CORS_WHITELIST', '["http://localhost:3000"]'));

// export const corsOptions = {
// 	origin: function (origin, callback) {
// 		if (origin === undefined) {
// 			callback(null, true);
// 		} else {
// 			var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
// 			if (!originIsWhitelisted) {
// 				logger.log('info', `Request from origin ${origin} is not whitelisted.`);
// 			}

// 			callback(originIsWhitelisted ? null : 'Bad Request', originIsWhitelisted);
// 		}
// 	},
// 	credentials: true
// };

export function createLogger(options = {}) {
	return winston.createLogger({...createLoggerOptions(), ...options});
}

function createLoggerOptions() {
	const debuggingEnabled = parseBoolean(process.env.DEBUG);
	const timestamp = winston.format(info => {
		info.timestamp = moment().format();
		return info;
	});

	return {
		format: winston.format.combine(timestamp(), winston.format.printf(formatMessage)),
		transports: [
			new winston.transports.Console({
				level: debuggingEnabled ? 'debug' : 'info',
				silent: process.env.NODE_ENV === 'test' && !debuggingEnabled
			})
		]
	};

	function formatMessage(i) {
		return `${i.timestamp} - ${i.level}: ${i.message}`;
	}
}

export function parseBoolean(value) {
	if (value === undefined) {
		return false;
	}

	if (Number.isNaN(Number(value))) {
		return value.length > 0 && value !== 'false';
	}

	return Boolean(Number(value));
}

export function sendEmail({name, args, getTemplate, SMTP_URL, API_EMAIL}) {
	return run();
	async function run() {
		const parseUrl = new URL(SMTP_URL);
		const templateCache = {};
		const query = {queries: [{query: {name: name}}], offset: null};
		const messageTemplate = await getTemplate(query, templateCache);
		let body = Buffer.from(messageTemplate[JSON.stringify(query)].body, 'base64').toString('utf8');
		const newBody = args ?
			stringTemplate.replace(body, {link: args.link, rejectionReason: args, username: args.id, password: args.password}) :
			stringTemplate.replace(body);

		let transporter = nodemailer.createTransport({
			host: parseUrl.hostname,
			port: parseUrl.port,
			secure: false
		});

		const result = await transporter.sendMail({
			from: 'test@test.com',
			to: API_EMAIL,
			replyTo: 'test@test.com',
			subject: messageTemplate.subject,
			text: newBody
		});

		if (result.error) {
			logger.log('error', `${result.error}`);
		} else {
			if (result.response) {
				logger.log('info', `${result.response}`);
			}

			return result;
		}
	}
}

export function handleInterrupt(arg) {
	if (arg instanceof Error) {
		console.error(`Uncaught Exception: ${arg.stack}`);
		// Signal
	} else {
		console.log(`Received ${arg}`);
	}

	process.exit(1);
}
