/// <reference types="lucia" />
declare namespace Lucia {
	type Auth = import("./lucia.js").Auth;
	type DatabaseUserAttributes = {
		name: string;
        email: string;
	};
	type DatabaseSessionAttributes = {};
}