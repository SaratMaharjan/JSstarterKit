import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();
console.log(baseUrl); // eslint-disable-line

function onSuccess(response) {
	return response.json();
}

function onError(error) {
	console.log(error); // eslint-disable-line no-console
}

function get(url) {
	return fetch(baseUrl + url).then(onSuccess, onError);
}

function del(url) {
	const request = new Request(baseUrl + url, {
		method: 'DELETE'
	});

	return fetch(request).then(onSuccess, onError);
}

export function getUsers() {
	return get('users');
}

export function deleteUser(id) {
	return del(`users/${id}`);
}
