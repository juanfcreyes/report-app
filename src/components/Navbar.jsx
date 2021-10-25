import { useContext } from "react";
import { SocketContext } from "../context/socket-context";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
	const { connected, disconnect, connect } = useContext(SocketContext);
	if (connected === undefined) {
		return <></>;
	}
	const handleClickButton = () => {
		if (connected) {
			disconnect();
		} else {
			connect();
		}
	};

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
			<div className='container-fluid'>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<ul className='navbar-nav '>
						<li className='navbar-brand'>Socket IO</li>
						<li className='nav-item'>
							<NavLink activeClassName='active' className='nav-link' to='/greeting'>
								Greeting
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink activeClassName='active' className='nav-link' to='/form'>
								Form
							</NavLink>
						</li>
            <li className='nav-item'>
							<NavLink activeClassName='active' className='nav-link' to='/chat'>
								Chat
							</NavLink>
						</li>
            <li className='nav-item'>
							<NavLink activeClassName='active' className='nav-link' to='/election'>
								Election
							</NavLink>
						</li>
					</ul>
				</div>
				<form className='d-flex'>
					<div className='form-check form-switch'>
						<input
							checked={connected}
							onChange={handleClickButton}
							className='form-check-input  form-check-input-checked-success form-check-input-checked-bg-success'
							type='checkbox'
						/>
					</div>
				</form>
			</div>
		</nav>
	);
};
