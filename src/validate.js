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

export const validate = values => {
	const errors = {};

	if (!values.name) {
		errors.name = 'Name is Required!!';
	} else if (values.length < 2 && values.length > 20) {
		errors.name = 'Name length must be between 2-20';
	} else if (/[0-9]/i.test(values.name)) {
		errors.name = 'Name should not have numbers';
	}

	if (!values.givenName) {
		errors.givenName = 'Given Name is Required!!';
	} else if (values.length < 2 && values.length > 20) {
		errors.givenName = 'Given Name length must be between 2-20';
	} else if (/[0-9]/i.test(values.givenName)) {
		errors.givenName = 'Given Name should not have numbers';
	}

	if (!values.familyName) {
		errors.familyName = 'Family Name is Required!!';
	} else if (values.length < 2 && values.length > 20) {
		errors.familyName = 'Family Name length must be between 2-20';
	} else if (/[0-9]/i.test(values.familyName)) {
		errors.familyName = 'Family Name should not have numbers';
	}

	if (!values.email) {
		errors.email = 'Email is Required!!!';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
		errors.email = 'Invalid e-mail address';
	}

	if (!values.publisherEmail) {
		errors.publisherEmail = 'Publisher\'s Email is required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.publisherEmail)) {
		errors.email = 'Invalid e-mail address';
	}

	if (!values.publicationEstimate) {
		errors.publicationEstimate = 'This Field cannot be left empty!!';
	} else if (!/[0-9]/i.test(values.publicationEstimate)) {
		errors.publicationEstimate = 'Numbers only!!!';
	}

	if (!values.website) {
		errors.website = 'The Field cannot be left empty';
	}

	if (values.aliases === {}) {
		errors.aliases = 'Aliases cannot be empty';
	}

	if (!values.streetAddress) {
		errors.streetAddress = 'Street Address cannot be empty.';
	} else if (values.streetAddress.lenght < 2) {
		errors.streetAddress = 'Value must be between more than 2 characters';
	}

	if (!values.city) {
		errors.city = 'Please specify a city';
	} else if (values.city.lenght < 2) {
		errors.city = 'Value must be between more than 2 characters';
	}

	if (!values.zip) {
		errors.zip = 'Zip code cannot be empty';
	} else if (!/[0-9]/i.test(values.zip)) {
		errors.streetAddress = 'Value must be numbers';
	}

	return errors;
};
