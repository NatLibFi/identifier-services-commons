/**
 *
 * @licstart  The following is the entire license notice for the JavaScript code in this file.
 *
 * API microservice of Identifier Services
 *
 * Copyright (C) 2019 University Of Helsinki (The National Library Of Finland)
 *
 * This file is part of identifier-services-api
 *
 * identifier-services-api program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * identifier-services-api is distributed in the hauthenticationRouter(passportMiddlewares.credentials));pe that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
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

import winston from 'winston';
import moment from 'moment';

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
