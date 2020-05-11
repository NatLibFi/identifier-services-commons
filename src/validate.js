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

function isEmpty(obj) {
  for(var key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

function validate(values) {
	const errors = {
		publicationDetails: {},
		postalAddress: {},
		affiliateOf: {},
		distributorOf: {},
		distributor: {},
		formatDetails: {}
	};
	const {
		publicationDetails = {},
		postalAddress = {},
		affiliateOf = {},
		distributorOf = {},
		distributor = {},
		formatDetails = {}
	} = values;
	const requiredFields = ['name', 'publisherEmail', 'title', 'publicationTime', 'authorGivenName', 'authorFamilyName', 'role', 'selectFormat', 'type'];
	requiredFields.forEach(field => {
		if (!values[field]) {
			errors[field] = 'Required';
		}
	});

	if (!values.contactEmail) {
    errors.contactEmail = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.contactEmail)) {
    errors.contactEmail = 'Invalid e-mail address';
  }

	if (!formatDetails.fileFormat) {
		errors.formatDetails.fileFormat = 'Required';
	} else if (formatDetails.fileFormat.value === '') {
		errors.formatDetails.fileFormat = 'Required';
	}

	if (!formatDetails.printFormat) {
		errors.formatDetails.printFormat = 'Required';
	}

	if (!publicationDetails.frequency) {
		errors.publicationDetails.frequency = 'Required';
	} else if (!/[0-9]/i.test(publicationDetails.frequency)) {
		errors.publicationDetails.frequency = 'Must be a number';
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

	if (!/^[a-zA-Z\s]{3,20}$/i.test(values.name)) {
		errors.name = 'Name should contains only 3-20 alphabets';
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

	return errors;
}
