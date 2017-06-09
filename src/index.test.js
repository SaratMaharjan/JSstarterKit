const { describe, it } = require('mocha');
const { expect } = require('chai');
// cosnt jsdom = require('jsdom');
// const fs = require('fs');

describe('first test', () => {
	it('should pass', () => {
		expect(true).to.equal(true);
	});
});

/* describe('index.html', () => {
	it('should have h1 with users', (done) => {
		const index = fs.readFileSync('./src/index.html', 'utf-8');
		jsdom.env(index, (err, window) => {
			const h1 = window.document.getElementsByTagName('h1')[0];
			expect(h1.innerHTML).to.equal("Users");
			done();
			window.close();
		});
	});
}); */
