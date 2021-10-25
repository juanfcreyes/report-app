import { createContext, useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("wss://report-socket-server.herokuapp.com");
const disconnectFunction = () => socket.disconnect();
const connectFunction = () => socket.connect();
const emitFunction = (event, value) => socket.emit(event, value);
const onFunction = (event, callback) => socket.on(event, callback);

export const SocketContext = createContext(null);
export const SocketProvider = ({ children }) => {
	const [value, setValue] = useState({
		on: () => {},
		emit: () => {},
		disconnect: () => {},
		connect: () => {},
	});

	useEffect(() => {
		socket.on("connect", () => {
			const { connected } = socket;
			setValue((_) => ({
				connected,
				on: onFunction,
				emit: emitFunction,
				disconnect: disconnectFunction,
				connect: connectFunction,
			}));
		});
		socket.on("disconnect", () => {
			const { connected } = socket;
			setValue((_) => ({
				connected,
				disconnect: disconnectFunction,
				connect: connectFunction,
			}));
		});
	}, []);

	return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
