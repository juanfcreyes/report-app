import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../context/socket-context";

export const Election = () => {
	const { on } = useContext(SocketContext);

	const [elections, setElection] = useState([0, 0, 0]);
	const [percents, setPrecents] = useState([0, 0, 0]);

	const setData = (payload) => {
		setElection(payload);
		const total = payload.reduce((a, b) => a + b);
		setPrecents(payload.map((a) => (a / ( total > 0 ? total : 1)) * 100));
	};

	useEffect(() => {
		const fetchFunction = async () => {
			const response = await fetch(" http://localhost:4000/elections/");
			const payload = await response.json();
			setData(payload);
		};
		fetchFunction();
	}, []);

	useEffect(() => {
		on("elections", (payload) => {
			setData(payload);
		});
	}, [on]);

	return (
		<div>
			<h1 className='text-center text-uppercase'>The best meal</h1>
			{elections.map((election, index) => (
				<div key={index} className='d-flex flex-row align-items-center mt-3'>
					<div className='p-2 mr-2'>
						<img
							src={require(`../assets/img/${index + 1}.jpg`).default}
							alt={index}
							width='250'
						/>
					</div>
					<div className='bg'>
						<div
							className='p-2 election '
							style={{ width: `${percents[index]}%` }}
						></div>
						<div className='text-center text-white nm-50'>
							<h1>{election} Votos</h1>
							<p>{percents[index].toPrecision(3)}%</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
