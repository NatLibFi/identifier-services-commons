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
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports.validate = validate;

function validate(values) {
	const errors = {
		publicationDetails: {frequency: {}},
		previousPublication: {},
		postalAddress: {},
		formatDetails: {},
		university: {}
	};
	const {
		publicationDetails = {frequency: {}},
		previousPublication = {},
		postalAddress = {},
		formatDetails = {},
		university = {},
		frequency = {},
		issnFormatDetails = [],
		type = {}
	} = values;

	const requiredFields = [
		'name',
		'contactPerson',
		'publisherEmail',
		'title',
		'publicationTime',
		'authorGivenName',
		'authorFamilyName',
		'role',
		'selectFormat',
		'publisherType',
		'firstName',
		'lastName',
		'address',
		'postCode',
		'city',
		'country',
		'contactEmail',
		'firstNumber',
		'firstYear',
		'prefix',
		'langGroup',
		'category',
		'rangeStart',
		'rangeEnd'
	];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = 'Required';
		}
	});

	if (values.langGroup) {
		if (!/^\d{3}$/.test(values.langGroup)) {
			errors.langGroup = 'Invalid Value';
		}
	}

	if (values.rangeStart) {
		if (!/^\d{1,7}$/.test(values.rangeStart)) {
			errors.rangeStart = 'Invalid Value';
		}
	}

	if (values.rangeEnd) {
		if (!/^\d{1,7}$/.test(values.rangeEnd)) {
			errors.rangeEnd = 'Invalid Value';
		}
	}

	if (!values.selectUniversity) {
		errors.selectUniversity = 'Required';
	}

	if (!university.name) {
		errors.university.name = 'Required';
	}

	if (!university.city) {
		errors.university.city = 'Required';
	}

	if (!values.contactEmail) {
		errors.contactEmail = 'Required';
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contactEmail)) {
		errors.contactEmail = 'Invalid e-mail address';
	}

	if (!formatDetails.format) {
		errors.formatDetails.format = 'Required';
	} else if (formatDetails.format.value === '') {
		errors.formatDetails.format = 'Required';
	}

	if (!formatDetails.fileFormat) {
		errors.formatDetails.fileFormat = 'Required';
	} else if (formatDetails.fileFormat.value === '') {
		errors.formatDetails.fileFormat = 'Required';
	}

	if (!formatDetails.printFormat) {
		errors.formatDetails.printFormat = 'Required';
	}

	if (formatDetails.run && !/^[0-9]*$/gm.test(formatDetails.run)) {
		errors.formatDetails.run = 'Must be a number [0-9]';
	}

	if (publicationDetails.frequency) {
		if (!publicationDetails.frequency.currentYear) {
			errors.publicationDetails.frequency.currentYear = 'Required';
		} else if (!/^([0-9]|([MDCLXVI]))*$/gm.test(publicationDetails.frequency.currentYear)) {
			errors.publicationDetails.frequency.currentYear = 'Must be a number [0-9] or Roman';
		}

		if (!publicationDetails.frequency.nextYear) {
			errors.publicationDetails.frequency.nextYear = 'Required';
		} else if (!/^([0-9]|([MDCLXVI]))*$/gm.test(publicationDetails.frequency.nextYear)) {
			errors.publicationDetails.frequency.nextYear = 'Must be a number [0-9] or Roman';
		}
	} else {
		errors.publicationDetails.frequency.nextYear = 'Required';
		errors.publicationDetails.frequency.currentYear = 'Required';
	}

	if (previousPublication.lastYear && !/^([0-9]|([MDCLXVI]))*$/gm.test(previousPublication.lastYear)) {
		errors.previousPublication.lastYear = 'Must be a number [0-9] or Roman';
	}

	if (previousPublication.lastNumber && !/^([0-9]|([MDCLXVI]))*$/gm.test(previousPublication.lastNumber)) {
		errors.previousPublication.lastNumber = 'Must be a number [0-9] or Roman';
	}

	if (!publicationDetails.previouslyPublished) {
		errors.publicationDetails.previouslyPublished = 'Required';
	}

	if (!publicationDetails.publishingActivities) {
		errors.publicationDetails.publishingActivities = 'Required';
	}

	if (isNaN(Date.parse(values.publicationTime))) {
		errors.publicationTime = 'Not Valid date';
	}

	if (!postalAddress.address) {
		errors.postalAddress.address = 'Required';
	}

	if (!postalAddress.city) {
		errors.postalAddress.city = 'Required';
	}

	if (!postalAddress.zip) {
		errors.postalAddress.zip = 'Required';
	}

	// If (!/^[a-zA-ZÀ-ÿ\s@~`!@#$%^&*()_=+\\';:"\/?>.<,-]{3,256}$/i.test(values.name)) {
	// 	errors.name = 'Name should contains only 3-256 alphabets';
	// }

	if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.publisherEmail)) {
		errors.publisherEmail = 'Invalid e-mail address';
	}

	if (values.primaryContact && values.primaryContact.length > 0) {// Empty
	} else {
		validateContact();
		errors.primaryContact = {
			_error: 'At least one member must be enter'
		};
	}

	function validateContact() {
		if (!values.email) {
			errors.email = 'Required';
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
			errors.email = 'Invalid e-mail address';
		}
	}

	if (!/\w{2,}/i.test(values.streetAddress)) {
		errors.streetAddress = 'Value must be between more than 2 characters';
	}

	if (!/\w{2,}/i.test(values.city)) {
		errors.city = 'Value must be between more than 2 characters';
	}

	if (!/^\d{3,}$/i.test(values.zip)) {
		errors.zip = 'Value must be numbers';
	}

	if (values.authors && values.authors.length > 0) { // Empty
		delete errors.authorGivenName;
		delete errors.authorFamilyName;
		delete errors.role;
	} else {
		validateAuthor();
		errors.authors = {
			_error: 'At least one member must be enter'
		};
	}

	function validateAuthor() {
		if (!values.authorGivenName) {
			errors.authorGivenName = 'Required';
		} else if (!values.authorFamilyName) {
			errors.authorFamilyName = 'Required';
		} else if (!values.role) {
			errors.role = 'Required';
		}
	}

	if (values.emails && values.emails.length > 0) {
		return;
	}

	errors.emails = {
		_error: 'At least one email must be enter'
	};

	if (!values.classification) {
		errors.classification = 'Required';
	}

	if (!values._id && !frequency.value) {
		errors.frequency = 'Required';
	}

	if (!values._id && !type.value) {
		errors.type = 'Required';
	}

	if (issnFormatDetails === null || issnFormatDetails.length === 0) {
		errors.issnFormatDetails = 'Required';
	} else if (issnFormatDetails.length > 0) {
		if (issnFormatDetails.some(item => item.value === 'online') && !formatDetails.url) {
			errors.formatDetails.url = 'Required';
		}
	}

	return errors;
}
