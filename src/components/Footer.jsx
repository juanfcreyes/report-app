import { useContext } from "react";
import { SocketContext } from "../context/socket-context";

export const Footer = () => {
	const {connected} = useContext(SocketContext);

  if (connected === undefined) {
    return <></>
  }


	return (
		<div className="fixed-bottom text-center bg-dark">
			<h3 className={`${connected ? "text-primary" : "text-danger"}`}> {connected ? "Online" : "Offline"} </h3>
		</div>
	);
};
