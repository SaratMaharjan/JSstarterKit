/*
function getQueryStringParameterByName(name, url = window.location.href) {
	// eslint-disable-next-line
	const nameUpdated = name.replace(/[\[\]]/g, '\\$&');
	const regex = new RegExp(`[?&] ${nameUpdated} (=([^&#]*)|&|#|$)`);
	const results = regex.exec(url);

	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default function getBaseUrl() {
	// return getQueryStringParameterByName('useMockApi') ? 'http://localhost:3001/' : 'https://vast-meadow-41938.herokuapp.com/';
}
*/

export default function getBaseUrl() {
	const useMockApi = true;
	return useMockApi ? 'http://localhost:3001/' : 'http://localhost:3000/';
}

