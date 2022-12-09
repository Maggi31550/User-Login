
import './App.css';
import SignIn from './page/SignIn'
import Profile from './page/Profile'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';

function App() {
	const token = localStorage.getItem("accessToken");
	if (!token){
		return <SignIn />
	}
	return (
		<div >
			<Router>
				<Routes>
					<Route path='/' element={<SignIn/>} exact/>
					<Route path='/profile' element={<Profile/>} exact/>
						
				</Routes>
			</Router>
		</div>
	);
}

export default App;
