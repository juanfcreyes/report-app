import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/socket-context";
import "./pages.css";

const id = new Date().getTime().toString + Math.floor(Math.random() * 999999);

export const Chat = () => {

	const [messages, setMessages] = useState([]);
	const { emit, on } = useContext(SocketContext);
	const [message, setMesage] = useState("");

  useEffect(() => {
		const chatContainer = document.getElementById("chat_contianer");
		chatContainer.scrollTop = chatContainer.scrollHeight;
	}, [messages]);

	useEffect(() => {
		const fetchFunction = async () => {
			const response = await fetch("https://report-socket-server.herokuapp.com/messages/");
			const payload = await response.json();
			setMessages(payload);
		};
		fetchFunction();
	}, []);

	useEffect(() => {
		on("broadcast-message", (payload) => {
			setMessages(payload);
		});
	}, [on]);

	const sendMessage = () => {
		emit("chat-message", { message, id });
		setMesage("");
	};

	const onChangeHandle = (event) => {
		setMesage(event.target.value);
	};

	const onEnter = (event) => {
		if (event.key === "Enter") {
			sendMessage();
		}
	};

	return (
		<div>
			<div className='card card-size'>
				<div className='card-header'>WebSocket chat</div>
				<div id='chat_contianer' className='card-body chat-container'>
					{messages.map((item, index) => (
						<div key={index} className='d-flex justify-content-end my-2'>
							<span
								className={`badge rounded-pill ${
									id === item.id ? "bg-dark" : "bg-secondary"
								} `}
							>
								{item.message}
							</span>
						</div>
					))}
				</div>
				<ul className='list-group list-group-flush'>
					<li className='list-group-item'>
						<div className='row g-3'>
							<div className='col-10'>
								<input
									onChange={onChangeHandle}
									onKeyDown={onEnter}
									value={message}
									type='text'
									className='form-control'
									id='name'
									aria-describedby='name'
									placeholder='Put your message here'
								/>
							</div>
							<div className='col-2'>
								<button onClick={sendMessage} className='btn btn-dark btn-block'>
									Send
								</button>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
};
