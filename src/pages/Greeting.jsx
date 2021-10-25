import { useContext, useState, useEffect } from "react";
import { SocketContext } from "../context/socket-context";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

const input$ = new Subject();

export const Greeting = () => {
	const { emit, on } = useContext(SocketContext);
	const [greeting, setGreeting] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		const subscription = input$.pipe(debounceTime(1000)).subscribe((value) => {
			emit("greeting", value);
			setName(value);
		});
		return () => subscription.unsubscribe();
	}, [emit]);

	useEffect(() => {
		on("greetingMessage", (payload) => {
			setGreeting(payload.message);
		});
	}, [on, setGreeting]);

	const onChangeHandle = (event) => {
		input$.next(event.target.value);
	};

	return (
		<div>
			<div className='form-group'>
				<input
					onChange={onChangeHandle}
					type='text'
					className='form-control'
					id='name'
					aria-describedby='name'
					placeholder='Put your name here'
				/>
			</div>
			{name && (
				<div className='container text-center mt-5'>
					<div className='alert alert-dark' role='alert'>
						<h1 className='display-4'>{greeting}</h1>
					</div>
				</div>
			)}
		</div>
	);
};
