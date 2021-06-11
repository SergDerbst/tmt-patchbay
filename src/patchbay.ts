import {Observable} from "rxjs";

export enum SocketType {
	Auth = 'auth',
	Data = 'data',
	Error = 'error',
	Logic = 'logic',
	Router = 'router',
	Store = 'store',
}

export interface PatchCord<Input, Output> {
	(input?: Input, callback?: (v?: any) => Observable<Output>): Observable<Output>;
}

export interface Socket {
	[key: string]: PatchCord<any, any>;
}

export interface AuthSocket extends Socket {}
export interface DataSocket extends Socket {}
export interface ErrorSocket extends Socket {}
export interface LogicSocket extends Socket {}
export interface RouteSocket extends Socket {}
export interface StoreSocket extends Socket {}

export abstract class Patchbay<
	A extends AuthSocket,
	D extends DataSocket,
	E extends ErrorSocket,
	L extends LogicSocket,
	R extends RouteSocket,
	S extends StoreSocket> {
	protected readonly sockets: { [key: string]: Socket };

	protected constructor() {
		this.sockets = {};
	}

	protected addSocket = (name: string, socket: Socket): void => {
		this.sockets[name] = socket;
	}

	protected connect = (name: string): Socket => {
		return this.sockets[name];
	}

	auth = (socket?: A): A => {
		if (socket) {
			this.sockets[SocketType.Auth] = socket;
		}
		return this.sockets[SocketType.Auth] as A;
	}

	data = (socket?: D): D => {
		if (socket) {
			this.sockets[SocketType.Data] = socket;
		}
		return this.sockets[SocketType.Data] as D;
	}

	error = (socket?:E): E => {
		if (socket) {
			this.sockets[SocketType.Error] = socket;
		}
		return this.sockets[SocketType.Error] as E;
	}

	logic = (socket?: L): L => {
		if (socket) {
			this.sockets[SocketType.Logic] = socket;
		}
		return this.sockets[SocketType.Logic] as L;
	}

	route = (socket?: R): R => {
		if (socket) {
			this.sockets[SocketType.Router] = socket;
		}
		return this.sockets[SocketType.Router] as R;
	}

	store = (socket?: S): S => {
		if (socket) {
			this.sockets[SocketType.Store] = socket;
		}
		return this.sockets[SocketType.Store] as S;
	}
}
