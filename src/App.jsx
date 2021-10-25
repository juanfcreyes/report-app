import { Form } from "./pages/Form";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Greeting } from "./pages/Greeting";
import { Election } from "./pages/Election";
import { Chat } from "./pages/Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
	return (
		<>
			<Router>
				<Navbar></Navbar>
				<div className='container mt-5'>
					<Switch>
						<Route path='/greeting'>
							<Greeting />
						</Route>
						<Route path='/form'>
							<Form />
						</Route>
						<Route path='/chat'>
							<Chat />
						</Route>
						<Route path='/election'>
							<Election />
						</Route>
						<Route path='/'>
							<Greeting />
						</Route>
					</Switch>
				</div>
			</Router>
			<Footer></Footer>
		</>
	);
};

export default App;
