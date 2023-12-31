export type User = {
	id: string
	name: string
	email: string
	photo?: string
	createdAt: string
	updatedAt: string
}

export type SingleUserResponse = {
	status: string
	data: { user: User }
}

export type AllUsersResponse = {
	status: string
	data: { users: User[] }
}

export interface UserLoginResponse {
	status: string
	token: string
}
