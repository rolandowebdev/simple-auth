import {
	User,
	UserLoginResponse,
	SingleUserResponse,
	AllUsersResponse
} from '@/types'

const SERVER_ENDPOINT = process.env.SERVER_ENDPOINT || 'http://localhost:3000'

async function handleResponse<T>(response: Response): Promise<T> {
	const contentType = response.headers.get('Content-Type') || ''
	const isJson = contentType.includes('application/json')
	const data = isJson ? await response.json() : await response.text()

	if (!response.ok) {
		if (isJson && data.errors !== null) {
			throw new Error(JSON.stringify(data.errors))
		}

		throw new Error(data.message || response.statusText)
	}

	return data as T
}

export async function registerUser(credentials: string): Promise<User> {
	const response = await fetch(`${SERVER_ENDPOINT}/api/auth/register`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: credentials
	})

	return handleResponse<SingleUserResponse>(response).then(
		(data) => data.data.user
	)
}

export async function loginUser(credentials: string): Promise<string> {
	const response = await fetch(`${SERVER_ENDPOINT}/api/auth/login`, {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		},
		body: credentials
	})

	return handleResponse<UserLoginResponse>(response).then((data) => data.token)
}

export async function logoutUser(): Promise<void> {
	const response = await fetch(`${SERVER_ENDPOINT}/api/auth/logout`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return handleResponse<void>(response)
}

export async function authUser(token?: string): Promise<User> {
	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	}

	if (token) {
		headers['Authorization'] = `Bearer ${token}`
	}
	const response = await fetch(`${SERVER_ENDPOINT}/api/users/me`, {
		method: 'GET',
		credentials: 'include',
		headers
	})

	return handleResponse<SingleUserResponse>(response).then(
		(data) => data.data.user
	)
}

export async function getAllUsers(): Promise<User[]> {
	const response = await fetch(`${SERVER_ENDPOINT}/api/users`, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json'
		}
	})

	return handleResponse<AllUsersResponse>(response).then(
		(data) => data.data.users
	)
}
