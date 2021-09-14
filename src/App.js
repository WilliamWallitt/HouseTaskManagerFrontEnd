import logo from './logo.svg';
import './App.css';
import madsImage from "./images/madsbeingacunt.jpg"
import willsImage from "./images/williscool.jpg"
import {Button, Col, Container, Row} from "react-bootstrap";
import UserImageComponent from "./Components/userImageComponent";
import React, {useEffect} from "react";
import TasksPageComponent from "./Components/tasksPageComponent";
import LoggerComponent from "./Components/Logs/LoggerComponent";

function App() {

  const [nextPage, updateNextPage] = React.useState(false)
  const [showLogPage, updateShowLogPage] = React.useState(false)
  const [userData, updateUserData] = React.useState({})
  const [clickedUser, updateClickedUser] = React.useState({})

  useEffect(() => {

    fetch("http://localhost:3000/users").then(res => res.json()).then(data => {
      if (JSON.stringify(userData) === JSON.stringify({})) {
        updateUserData(data)
      }
    }).catch(err => console.log(err))
  })


  return (

      !showLogPage ?

      !nextPage ?
    <div className="App">
      <header className="App-header">


        <Button variant="outline-light" onClick={() => updateShowLogPage(true)} style={{top: "25px", left: "25px", position: "fixed"}}>View logs</Button>


        <p className="my-5">
          Welcome to <code>HouseTask.js</code> try not to have too much fun!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
        <Container className="text-center">
          <Row>
            <p className="bg-white w-50 mx-auto my-3 p-3 rounded-3" style={{color: "#282c34"}}>
              <code>[Select user]</code>
            </p>
          </Row>

          <p className="h1 mx-auto my-5 p-2">
            &#8595;
          </p>
          <Row className="d-flex justify-content-center">
            {JSON.stringify(userData) !== JSON.stringify({}) ? userData.map((user, index) => {
              return <UserImageComponent key={index} image={index === 1 ? willsImage : madsImage}
                                         name={user.userName}
                                         clickedUser={user}
                                         updateClickedUser={updateClickedUser}
                                         updateNextPage={updateNextPage}
              />
            }) : <h1>Loading users...</h1>}
            {/*<UserImageComponent name="William" image={willsImage} updateUser={updateUser} updateNextPage={updateNextPage}/>*/}
            {/*<UserImageComponent name="Madling" image={madsImage}  updateUser={updateUser} updateNextPage={updateNextPage}/>*/}
          </Row>
        </Container>
      </header>
    </div> : <TasksPageComponent name={clickedUser.userName} authorization={clickedUser.authorization} updateNextPage={updateNextPage} userId={clickedUser._id} />
  : <LoggerComponent updateShowLogPage={updateShowLogPage}/>);
}

export default App;
