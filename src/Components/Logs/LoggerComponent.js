import React, {useEffect} from "react";
import {Button, Card, Col, Container, ListGroup, ListGroupItem, Row} from "react-bootstrap";
import LogsDataHandler from "./LogsDataHandler";

export default function LoggerComponent (props) {

    // make req
    // recharts?
    // display info - freq of time v task
    // total points?

    const [logs, updateLogs] = React.useState({})
    const [data, updateData] = React.useState(null)

    async function getLogData() {
        const result = (await fetch("http://localhost:3000/logs")).json()
        return await result
    }

    useEffect(() => {
        if (JSON.stringify(logs) === JSON.stringify({})) {
            getLogData().then(r => {
                updateLogs(r)
                const dateProcessing = new LogsDataHandler(r)
                dateProcessing.preProcess()
                dateProcessing.getSumOfTotalPoints()
                updateData(dateProcessing)
            })
        }

    })


    return(

        <div className="App">
            <header className="App-header">
                <Button variant="outline-light" onClick={() => props.updateShowLogPage(false)}
                        style={{top: "25px", left: "25px", position: "fixed"}}>&#8592;</Button>

                <h1>User info</h1>

                <Container className="my-4">
                    {data !== null &&
                        <Row>
                            {data.users.map((user, index) => {
                                return (<Col>
                                    <Card>
                                        <Card.Title className="bg-dark text-white p-2">{user}</Card.Title>
                                        <Card.Text className="text-dark lead p-2 border border-dark border-3"><code>Top task: </code> {
                                            data.tasks[data.taskCount[index].indexOf(Math.max(...data.taskCount[index]))]}

                                        </Card.Text>
                                        <Card.Text className="text-dark lead p-2 border border-dark border-3"><code>Total points: </code> {data.points[index]}</Card.Text>
                                        <Card.Text className="text-dark lead p-2 border border-dark border-3"><code>Total tasks: </code>
                                            {data.taskCount[index].reduce((curr, prev) => curr + prev)}</Card.Text>

                                    </Card>
                                </Col>)
                            })}
                        </Row>

                    }
                </Container>

                <h1>Current logs</h1>

                <Container>

                    {JSON.stringify(logs) !== JSON.stringify({}) ? <div>

                            <Row className="w-100 mx-auto">
                                <ListGroup horizontal className="d-flex justify-content-center m-2">
                                    <ListGroup.Item className="m-2 rounded" style={{backgroundColor: "#eeff1f"}}><code>[User]</code></ListGroup.Item>
                                    <ListGroup.Item className="m-2 rounded" style={{backgroundColor: "#eeff1f"}}><code>[Task]</code></ListGroup.Item>
                                    <ListGroup.Item className="m-2 rounded" style={{backgroundColor: "#eeff1f"}}><code>[Points]</code></ListGroup.Item>
                                    <ListGroup.Item className="m-2 rounded" style={{backgroundColor: "#eeff1f"}}><code>[Time submitted]</code></ListGroup.Item>
                                </ListGroup>
                            </Row>

                            {logs.map((log, logIndex) => {

                                const date = new Date(Date.parse(log.timeLogged));
                                const year = date.toDateString()
                                const hours = date.getHours();
                                const minutes = "0" + date.getMinutes();
                                const seconds = "0" + date.getSeconds();
                                const formattedTime = hours + ':' + minutes.substr(-2) + ':' +
                                    seconds.substr(-2) + " @ " + year.substr(0, 10)

                                return (

                                    <ListGroup horizontal className="d-flex justify-content-center m-2">
                                        <ListGroupItem className="lead bg-dark text-white m-2">
                                            {log.user.userName}
                                        </ListGroupItem>
                                        <ListGroupItem className="lead m-2">
                                            {log.task.name}
                                        </ListGroupItem>
                                        <ListGroupItem className="lead m-2">
                                            <code>[{log.point.point}]</code>
                                        </ListGroupItem>
                                        <ListGroupItem className="lead m-2">
                                            {formattedTime}
                                        </ListGroupItem>
                                    </ListGroup>
                                )
                            })
                            }</div>


                        :<h1>Loading logs...</h1>
                    }

                </Container>


            </header>
        </div>
    )



}
