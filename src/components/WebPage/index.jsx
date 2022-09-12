import styles from "./styles.module.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
import { MDBFooter } from 'mdb-react-ui-kit';
import React, { useState } from 'react';
import { MDBRipple } from 'mdb-react-ui-kit';
import { useHistory, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBBtn } from 'mdb-react-ui-kit';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
  MDBCarouselCaption,
} from 'mdb-react-ui-kit';



function WebPage() {

  const [photos, setPhotos] = useState([]);
  const [pathName, setPathName] = useState("");
  const navigate = useNavigate()

  axios.get('http://localhost:8080/api/get/upload')
    .then((response) => {
      const data = response.data;
      setPhotos(data);
      console.log('Data received')
    })
    .catch(() => {
      console.log('Error!');
    })
  function handleViewNew(e) {
    console.log(e);
    const path = e;
    setPathName(path);

    navigate('/view', { state: { paths: path } });
  }


  const [url, setURL] = useState("");
  axios.get('http://localhost:8080/api/get/displayimage')
    .then((response) => {
      if (response) {


        const displayPath = "./img/" + response.data.photo;
        localStorage.setItem('localPath', displayPath);
      }
      else {
        console.log("No response!")
      }
    })
    .catch(() => {
      console.log("No active image!")
    })

  const setPath = localStorage.getItem('localPath')

  return (


    <div>
      <Container>
        <Navbar bg="light" variant="light">

          <Navbar.Brand className={styles.brand} href="#home"><img
            src="logo.png"
            height='80'
            width='80'
            alt=''
            loading='lazy'
          />School of Information Technology</Navbar.Brand>

          {/* <Nav className="ms-auto" >
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Academics</Nav.Link>
            <Nav.Link href="#pricing">News</Nav.Link>
          </Nav> */}

        </Navbar>
        <div >
          <MDBCarousel showControls showIndicators>
            <MDBCarouselInner height={500} >
              <MDBCarouselItem className='active'>
                <MDBCarouselElement className='img-fluid rounded' src='https://mdbootstrap.com/img/new/slides/042.webp' alt='...' />
                <MDBCarouselCaption>
                  <h5>First slide label</h5>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem>
                <MDBCarouselElement className='img-fluid rounded' src='https://mdbootstrap.com/img/new/slides/042.webp' alt='...' />
                <MDBCarouselCaption>
                  <h5>Second slide label</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem>
                <MDBCarouselElement className='img-fluid rounded' src='https://mdbootstrap.com/img/new/slides/043.webp' alt='...' />
                <MDBCarouselCaption>
                  <h5>Third slide label</h5>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </MDBCarouselCaption>
              </MDBCarouselItem>
            </MDBCarouselInner>
          </MDBCarousel>
        </div>

        <Row>
          <Col><Container className={styles.newsside}>
            <Table striped className={styles.tables}>
              <thead>
                <tr className={styles.heading}>
                  <th className={styles.item}>Announcement</th>
                  <th className={styles.item}>View</th>
                </tr>
              </thead>
              <tbody>
                {
                  photos.map((item, index) => (
                    <tr key={item}>

                      <td className={styles.tdum}>{item.photo}</td>
                      <td className={styles.tdum}>

                        <MDBBtn className={styles.view_btn} onClick={() => handleViewNew(item.photo)}>
                          View
                        </MDBBtn>
                      </td>

                    </tr>
                  ))
                }

              </tbody>
            </Table>


          </Container></Col>
          <Col><Container className={styles.photo}>

            <MDBRipple rippleTag='a'><img className='img-fluid rounded' src={setPath}></img></MDBRipple>

          </Container></Col>
        </Row>



        <MDBFooter bgColor='light' className='text-center text-lg-left'>
          <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
            &copy; {new Date().getFullYear()} Copyright:{' '}
            <a className='text-dark' href='https://mdbootstrap.com/'>
              Department of Computer Science and Engineering. All Rights Reserved.
            </a>
          </div>
        </MDBFooter>
      </Container>
  </div>

  );
}

export default WebPage;


// aspect-ratio: auto 930 / 411;