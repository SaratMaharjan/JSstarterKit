import './index.css';

import {getUsers, deleteUser} from './api/userApi';

// import numeral from 'numeral';
// const courseValue = numeral(1000).format('$0,0.00');
// debugger;
// console.log(`I would pay ${courseValue}`);

getUsers().then(result => {
	let userBody = "";

	result.forEach(user => {
		userBody += ` </tr>
			<td><a href="#" data-id="${user.id}" class="deleteUser">Delete</a></td>
			<td>${user.id}</td>
			<td>${user.firstName}</td>
			</tr>
		`;
	});

	global.document.getElementById('users').innerHTML = userBody;

	const deleteLinks = global.document.getElementsByClassName('deleteUser');

	Array.from(deleteLinks, link => {
		link.onclick = function(event) {
			const element = event.target;
			event.preventDefault();
			deleteUser(element.attributes["data-id"].value);
			const row = element.parentNode.parentNode;
			row.parentNode.removeChild(row);
		};
	});

});
