const moment = require('moment');

module.exports = function (DataToValidate) {
	const ValidationScheme = {
		_id: ValidateNumbers(DataToValidate, "_id"),
		phoneno: ValidateNumbers(DataToValidate, "phoneno"),
		fatherno: ValidateNumbers(DataToValidate, "fatherno"),
		location: ValidateLocation(DataToValidate),
		password: ValidatePassword(DataToValidate),
		_apikey: ValidateApiKey(DataToValidate),
		_dob: ValidateDOB(DataToValidate)
	};
	let InvalidFieldArray = [];

	if (DataToValidate) {
		for (let key in DataToValidate) {
			if (DataToValidate.hasOwnProperty(key)) {

				let ValidationResult = ValidationScheme[key];

				if (!ValidationResult) {
					InvalidFieldArray.push(key);
				}
			}
		}
		return new Promise((resolve, reject) => {
			if (InvalidFieldArray.length == 0) {
				resolve({
					error: 0,
					invalidKeys: InvalidFieldArray
				});
			} else {
				reject({
					error: 'E101',
					invalidKeys: InvalidFieldArray
				});
			}
		});
	} else {
		return Promise.reject({
			error: 'E101',
			invalidKeys: InvalidFieldArray
		});
	}
};
function ValidateNumbers(DataToValidate, type) {
	if (DataToValidate && DataToValidate[type]) {
		let number = DataToValidate[type];
		if ((type == "_id" && parseInt(number).toString().length == 8) || ((type == "phoneno" || type == "fatherno") && parseInt(number).toString().length == 10)) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

function ValidateLocation(DataToValidate) {
	if (DataToValidate && DataToValidate['location'] && (DataToValidate['location'] == "hostel" || DataToValidate['location'] == "dayscholar")) {
		return true;
	} else {
		return false;
	}
}

function ValidatePassword(DataToValidate) {
	if (DataToValidate && DataToValidate['password']) {
		return true;
	} else {
		return false;
	}
}

function ValidateDOB(DataToValidate) {
	if (DataToValidate && DataToValidate['_dob'] && moment(DataToValidate['_dob'], "DDMMYYYY", true).isValid()) {
		return true;
	} else {
		return false;
	}
}

function ValidateApiKey(DataToValidate) {
	if (DataToValidate && DataToValidate['_apikey'] === "TESTING") {
		return true;
	} else {
		return false;
	}
}