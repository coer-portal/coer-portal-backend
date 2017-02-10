const ValidateDeviceID = require('../../server/middlewares/ValidateDeviceID/ValidateDeviceID'),
	ValidateRequestData = require('../../server/middlewares/ValidateRequestData/ValidateRequestData');
// ValidateDeviceID
describe('Validate Device ID Module', () => {
	test('Should return an ID if nothing is provided', () => {
		expect(ValidateDeviceID()).toEqual(expect.any(String));
	});

	test('Should return the same ID if an ID is provided', () => {
		expect(ValidateDeviceID('COOLDEVICEID')).toBe('COOLDEVICEID');
	});

	test('Should return new Device ID if undefined or null is provided', () => {
		expect(ValidateDeviceID(undefined)).toEqual(expect.any(String));
		expect(ValidateDeviceID(null)).toEqual(expect.any(String));
		expect(ValidateDeviceID("null")).not.toBe("null");
		expect(ValidateDeviceID("null")).toEqual(expect.any(String));
		expect(ValidateDeviceID("undefined")).not.toBe('undefined');
		expect(ValidateDeviceID("undefined")).toEqual(expect.any(String));
	});

});


// ValidateRequestData
describe("Validate Request Data Module", () => {
	test("Should return true if all values are Valid", () => {
		expect(ValidateRequestData({
			_id: 15051019,
			phoneno: 7896451234,
			fatheno: 9874653145,
			_dob: 16102016,
			_apikey: "TESTING",
			password: "SUPERSECRETPASSWORD",
			location: "hostel"
		})).toBeTruthy();
		expect(ValidateRequestData({
			_id: 15051148,
			phoneno: 7896451234,
			fatheno: 9874653145,
			_dob: 16101999,
			_apikey: "TESTING",
			password: "SUPERSECRETPASSWORD",
			location: "dayscholar"
		})).toBeTruthy();
	});

	test("Should return an array containing all the Invalid Data if Some Data is Invalid", () => {
		expect(ValidateRequestData({
			_id: 15051019,
			phoneno: 7896451234,
			fatherno: 9874653145,
			_dob: 16102016,
			_apikey: "TESTING",
			password: "SUPERSECRETPASSWORD",
			location: "hostelle"
		})).toEqual(expect.arrayContaining(['location']));
		expect(ValidateRequestData({
			_id: 15051019,
			phoneno: 7896451234,
			fatherno: 9874653145,
			_dob: 16102016,
			_apikey: "TESTING",
			password: "",
			location: "hostel"
		})).toEqual(expect.arrayContaining(['password']));
		expect(ValidateRequestData({
			_id: 15051019,
			phoneno: 7896451234,
			fatherno: 9874653145,
			_dob: 16102016,
			_apikey: "",
			password: "SUPERSECRETPASSWORD",
			location: "hostel"
		})).toEqual(expect.arrayContaining(['_apikey']));
		expect(ValidateRequestData({
			_id: 1505109,
			phoneno: 789451234,
			fatherno: 987653145,
			_dob: 29022016,
			_apikey: "TESTING",
			password: "SUPERSECRETPASSWORD",
			location: "hostel"
		})).toEqual(expect.arrayContaining(['_id', 'phoneno', 'fatherno']));
	});

	test("Should return false if No data is provided", () => {
		expect(ValidateRequestData()).toBeFalsy();
	});
});