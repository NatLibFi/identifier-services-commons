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
		affiliateOf: {},
		distributorOf: {},
		distributor: {},
		formatDetails: {},
		university: {}
	};
	const {
		publicationDetails = {frequency: {}},
		previousPublication = {},
		postalAddress = {},
		affiliateOf = {},
		distributorOf = {},
		distributor = {},
		formatDetails = {},
		university = {},
		frequency = {},
		type = {}
	} = values;

	const requiredFields = [
		'name',
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

	if(values.langGroup) {
		if(!/^\d{3}$/.test(values.langGroup)) {
			errors.langGroup = 'Invalid Value'
		}
	}

	if(values.rangeStart) {
		if(!/^\d{1,5}$/.test(values.rangeStart)) {
			errors.rangeStart = 'Invalid Value'
		}
	}

	if(values.rangeEnd) {
		if(!/^\d{1,5}$/.test(values.rangeEnd)) {
			errors.rangeEnd = 'Invalid Value'
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
	
	if (formatDetails.run && !/^[0-9]/gm.test(publicationDetails.formatDetails.run)) {
		errors.formatDetails.run = 'Must between [0-9]'
	}

	if (formatDetails.run && !/^[0-9]|([MDCLXVI])/gm.test(publicationDetails.formatDetails.edition)) {
		errors.formatDetails.edition = 'Must between [0-9] or Roman'
	}

	if (publicationDetails.frequency) {
		if (!publicationDetails.frequency.currentYear) {
		  errors.publicationDetails.frequency.currentYear = 'Required';
		} else if (!/^[0-9]|([MDCLXVI])/gm.test(publicationDetails.frequency.currentYear)) {
		  errors.publicationDetails.frequency.currentYear = 'Must between [0-9] or Roman';
		}
	
		if (!publicationDetails.frequency.nextYear) {
		  errors.publicationDetails.frequency.nextYear = 'Required';
		} else if (!/^[0-9]|([MDCLXVI])/gm.test(publicationDetails.frequency.nextYear)) {
		  errors.publicationDetails.frequency.nextYear = 'Must between [0-9] or Roman';
		}
	} else {
		errors.publicationDetails.frequency.nextYear = 'Required';
		errors.publicationDetails.frequency.currentYear = 'Required';
	}

	if (previousPublication.lastYear && !/^[0-9]|([MDCLXVI])/gm.test(publicationDetails.frequency.lastYear)) {
		errors.previousPublication.lastYear = 'Must between [0-9] or Roman';
	}
	if (previousPublication.lastNumber && !/^[0-9]|([MDCLXVI])/gm.test(publicationDetails.frequency.lastNumber)) {
		errors.previousPublication.lastNumber = 'Must between [0-9] or Roman';
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

	if (!affiliateOf.affiliateOfAddress) {
		errors.affiliateOf.affiliateOfAddress = 'Required';
	}

	if (!affiliateOf.affiliateOfCity) {
		errors.affiliateOf.affiliateOfCity = 'Required';
	}

	if (!affiliateOf.affiliateOfZip) {
		errors.affiliateOf.affiliateOfZip = 'Required';
	}

	if (!affiliateOf.affiliateOfName) {
		errors.affiliateOf.affiliateOfName = 'Required';
	}

	if (!distributorOf.distributorOfAddress) {
		errors.distributorOf.distributorOfAddress = 'Required';
	}

	if (!distributorOf.distributorOfCity) {
		errors.distributorOf.distributorOfCity = 'Required';
	}

	if (!distributorOf.distributorOfZip) {
		errors.distributorOf.distributorOfZip = 'Required';
	}

	if (!distributorOf.distributorOfName) {
		errors.distributorOf.distributorOfName = 'Required';
	}

	if (!distributor.distributorAddress) {
		errors.distributor.distributorAddress = 'Required';
	}

	if (!distributor.distributorCity) {
		errors.distributor.distributorCity = 'Required';
	}

	if (!distributor.distributorZip) {
		errors.distributor.distributorZip = 'Required';
	}

	if (!distributor.distributorName) {
		errors.distributor.distributorName = 'Required';
	}

	if (!/^[a-zA-ZÀ-ÿ\s]{3,256}$/i.test(values.name)) {
		errors.name = 'Name should contains only 3-256 alphabets';
	}

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

	if (values.affiliates && values.affiliates.length > 0) {// Empty
	} else {
		validateAffiliate();
		errors.affiliates = {
			_error: 'At least one affiliate must be enter'
		};
	}

	function validateAffiliate() {
		if (!values.affiliatesAddress) {
			errors.affiliatesAddress = 'Required';
		}

		if (!values.affiliatesCity) {
			errors.affiliatesCity = 'Required';
		}

		if (!values.affiliatesZip) {
			errors.affiliatesZip = 'Required';
		}

		if (!values.affiliatesName) {
			errors.affiliatesName = 'Required';
		}
	}

	if (!values._id && !frequency.value) {
		errors.frequency = 'Required';
	}

	if (!values._id && !type.value) {
		errors.type = 'Required';
	}

	return errors;
}
