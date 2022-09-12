import styles from "./styles.module.css";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect, useMemo } from "react";
import {Container, Image} from "react-bootstrap";
import { useHistory, useNavigate } from "react-router-dom";

const Main = () => {

	
	const[photos,setPhotos]=useState([]);
	const [file, setFile] = useState(null);
	const[pathName,setPathName]=useState("");
	const navigate = useNavigate()

	function handleView(e) {
        console.log(e);
		const path=e;
        alert("File Approved!");
		setPathName(path);
		const url = "http://localhost:8080/api/post/displayimage";

		axios.post("http://localhost:8080/api/post/reset")

		axios.post(url, {path:path})
		  .then(function (response) {
			console.log("Posted on display");
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		
		navigate('/display',{state:{paths:path}});
    }

	function handleDelete(e) {
        console.log(e);
		const path=e;
		const url = "http://localhost:8080/api/post/deletepost";


		axios.post(url, {pathDelete:path})
		  .then(function (response) {
			console.log("Posted on display");
			
		  })
		  .catch(function (error) {
			console.log(error);
		  });

		  window.location.reload();
		
    }


	function handleViewNew(e) {
        console.log(e);
		const path=e;
		setPathName(path);
		
		navigate('/view',{state:{paths:path}});
    }

	const getuploads=()=>{
		axios.get('http://localhost:8080/api/get/upload')
		.then((response)=>{
			const data=response.data;
			setPhotos(data);
			console.log('Data received')
		})
		.catch(()=>{
			alert('Error!');
		})
	}

	useEffect(()=>{
		getuploads();
	},[]);

	console.log(photos);

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	const handleUpload=()=>{
		window.location = "/upload";
	}

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>NOTICE BOARD</h1>
				
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<button className={styles.upload_btn} onClick={handleUpload}>
					Upload
			</button>


			<Table striped bordered hover size="sm">
				<thead>
					<tr>
						<th>#</th>
						<th>Date</th>
						<th>File Name</th>
						<th>View</th>
						<th>Approve</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>

				{
						photos.map((item, index) => (
							<tr key={item}>
								<td className={styles.tdum}>{index + 1}</td>
								<td className={styles.tdum}>{item.date}</td>
								<td className={styles.tdum}>{item.photo}</td>
								<td className={styles.tdum}>

									<button className={styles.view_btn} onClick={() => handleViewNew(item.photo)}>
										View
									</button>
								</td>
								<td className={styles.tdum}>

									<button className={styles.approve_btn} onClick={() => handleView(item.photo)}>
										Approve✓
									</button>
								</td>
								<td>
									<button onClick={() => handleDelete(item.photo)} type="button" class="close" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</td>
							</tr>
					))
				}
					
					
				</tbody>
			</Table>

		</div>
	);
};

export default Main;


