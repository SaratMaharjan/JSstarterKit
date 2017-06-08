
export default function getBaseUrl() {
	const useMockApi = true;
	return useMockApi ? 'http://localhost:3001/' : 'http://localhost:3000/';
}
