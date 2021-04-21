const apiKey = 'AIzaSyBKSWuGdwmN3RaH01U0N3mi5PhRtCyr7Xo';
const registerUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;
const loginUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;


export async function login(email, password) {
	const response = await fetch(loginUrl, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ email, password })
	});
    if (response.ok==false) {
        const error = await response.json();
        throw new Error(error.message);
    }
	const data = await response.json();
	sessionStorage.setItem('userEmail', data.email);
	sessionStorage.setItem('token', data.idToken);
	sessionStorage.setItem('userId', data.localId);
	return data;
}

export async function register(email, password) {
	const response = await fetch(registerUrl, {
		method: 'post',
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({ email, password })
	});

    if (response.ok==false) {
        const error = await response.json();
        throw new Error(error.message);
    }

	const data = await response.json();
	sessionStorage.setItem('userEmail', data.email);
	sessionStorage.setItem('userId', data.localId);
	sessionStorage.setItem('token', data.idToken);
	return data;
}

export async function logout() {
    sessionStorage.removeItem('userEmail');
	sessionStorage.removeItem('userId');
    sessionStorage.removeItem('token');
    return;
}