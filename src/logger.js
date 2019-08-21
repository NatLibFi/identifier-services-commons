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

import moment from 'moment';
import winston from 'winston';
import expressWinstonLogger from 'express-winston';

const LOGLEVEL = process.env.NODE_ENV === 'debug' ? 'debug' : 'info';

export const logger = new (winston.Logger)({
	transports: [
		new (winston.transports.Console)({
			timestamp: () => moment().format(),
			level: LOGLEVEL
		})
	]
});

export const expressWinston = expressWinstonLogger.logger({
	transports: [
		new winston.transports.Console({
			timestamp: () => moment().format(),
			level: LOGLEVEL
		})
	],
	meta: true // Optional: control whether you want to log the meta data about the request (default to true)
// msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
// expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
// colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
});
