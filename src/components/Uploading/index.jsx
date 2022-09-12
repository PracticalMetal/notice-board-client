import React, { useState } from 'react'
import "./Uploading.css";




const Uploading=()=>{

    const [fileData, setFileData]= useState();
    const [nameData, setNameData]= useState();
    const [descriptionData, setDescriptionData]= useState();

    const fileChangeHandler = (e)=>{
        setFileData(e.target.files[0]);
    }
    
    const nameChangeHandler = (e)=>{
        setNameData(e.target.value);
    }

    const descriptionChangeHandler = (e)=>{
        setDescriptionData(e.target.value);
    }

    const onSubmitHandler=(e)=>{
        e.preventDefault();

        // Handle file data from the state before sending
        const data=new FormData();
        data.append('images',fileData);
        
        console.log(data);
        fetch("https://iit-notice-board-backend.herokuapp.com/api/upload",{
            method:"POST",
            body: data,
        })
        .then((result)=>{
            console.log("File Sent Successful")
            alert("Upload Successful!");
            // alert.onSubmit('Upload Successful');
        })
        .catch((err)=>{
            console.log(err.message);
        });
    };

    return (
        <div className="main">
            <h2>USER DASHBOARD</h2>
            <div className="container" id="container">

                <div className="form-container personal-in-container">
                    <form onSubmit={onSubmitHandler} >
                        <h1>File Details</h1>

                        <input type="text" onChange={nameChangeHandler} placeholder="Uploaded By" />
                        
                        <input type="file" onChange={fileChangeHandler} placeholder="Choose profile pic" />
                        <input type="text" onChange={descriptionChangeHandler} placeholder="Description" />

                        <button value="Save" >Upload</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">

                        <div className="overlay-panel overlay-right">
                            <h1>File Upload</h1>
                            <p>Upload all the necessary files here</p>

                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Uploading;
