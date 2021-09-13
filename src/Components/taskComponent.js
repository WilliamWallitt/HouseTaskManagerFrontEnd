import React from "react";
import {Button, Card, Col, Row} from "react-bootstrap";
import TaskEditComponent from "./taskEditComponent";

export default function TaskComponent(props) {

    // const [editTask, updateEditTask] = React.useState(false)

    async function createLogHandler() {
        const log = {
            userId: props.userId,
            taskId: props.data._id,
            pointId: props.data.point._id
        }
        const result = await fetch("http://localhost:3000/logs", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify(log)
        })

        console.log(result)


    }

    return (
        <Card className="bg-transparent border-light m-3 p-2 w-25">
            <Card.Title><h1 className="h3 bg-light p-2 rounded-3" style={{color: "#282c34"}}><code>[Task]: </code>{props.data.name}</h1></Card.Title>
            <Card.Text><h1 className="lead border border-light p-1"><code>[Description]: </code>{props.data.description}</h1></Card.Text>
            <Row>
                <Col>
                    <Button variant="outline-light p-1 py-2" onClick={() => createLogHandler()}><code>[Points]: </code>{props.data.point.point}</Button>
                </Col>

                {parseInt(props.authorization.$numberDecimal) >= 0 &&
                    <Col>
                        <Button variant="outline-light p-1 py-2" onClick={() => {
                            props.updateEditTaskData(props.data)
                            props.updateEditTask(true)}}
                        >&#8249; Edit this task &#8250;</Button>
                    </Col>}
            </Row>
        </Card>
    )


}