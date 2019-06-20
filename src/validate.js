/* eslint-disable complexity */
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

/* eslint-disable no-unused-expressions */

export function validate(values) {
	const errors = {};
	if (!values.name) {
		errors.name = 'Name is Required!!';
	} else if (!/^[a-zA-Z\s]{3,20}$/i.test(values.name)) {
		errors.name = 'Name should contains only 3-20 alphabets';
	}

	if (!values.username) {
		errors.username = 'Name is Required!!';
	} else if (!/^[a-zA-Z]{3,20}$/i.test(values.username)) {
		errors.username = 'Name should contains only 3-20 alphabets';
	}

	if (!values.password) {
		errors.password = 'Password Required';
	}

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.publisherEmail)) {
		errors.publisherEmail = 'Invalid e-mail address';
	}

	if (!values.publicationEstimate) {
		errors.publicationEstimate = 'This Field cannot be left empty!!';
	} else if (!/[0-9]/i.test(values.publicationEstimate)) {
		errors.publicationEstimate = 'Numbers only!!!';
	}

	// If (!values.website) {
	// 	errors.website = 'The Field cannot be left empty';
	// }

	if (values.primaryContact && values.primaryContact.length > 0) {
		// ValidateContact();
	} else {
		validateContact();
		errors.primaryContact = {_error: 'At least one member must be enter'};
	}

	function validateContact() {
		if (!values.givenName) {
			errors.givenName = 'Required';
		} else if (!/^[a-zA-Z]{3,20}$/i.test(values.givenName)) {
			errors.givenName = '3-20 Alphabets Only';
		}

		if (!values.familyName) {
			errors.familyName = 'Required';
		} else if (!/^[a-zA-Z]{3,20}$/i.test(values.familyName)) {
			errors.familyName = '3-20 Alphabets Only';
		}

		if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid e-mail address';
		}
	}

	if (!values.address) {
		errors.address = 'Required';
	} else if (!/\w{2,}/i.test(values.address)) {
		errors.address = 'Value must be between more than 2 characters';
	}

	if (!values.city) {
		errors.city = 'Please specify a city';
	} else if (!/\w{2,}/i.test(values.city)) {
		errors.city = 'Value must be between more than 2 characters';
	}

	if (!values.zip) {
		errors.zip = 'Zip code cannot be empty';
	} else if (!/^\d{3,}$/i.test(values.zip)) {
		errors.zip = 'Value must be numbers';
	}

	return errors;
}
