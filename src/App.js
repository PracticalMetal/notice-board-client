import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import "./App.css";
import './index.css';
import Login from "./components/Login";
import Display from "./components/Display";
import View from "./components/View";
import Uploading from "./components/Uploading";
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import WebPage from "./components/WebPage";

function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/upload" exact element={<Uploading />} />
			<Route path="/display" exact element={<Display />} />
			<Route path="/view" exact element={<View />} />
			<Route path="/webpage" exact element={<WebPage />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
		</Routes>
	);
}

export default App;
