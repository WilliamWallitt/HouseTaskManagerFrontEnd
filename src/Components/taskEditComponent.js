import React from "react";
import {Button, Card, Col, Form, Row} from "react-bootstrap";



export default function TaskEditComponent(props) {

    function updateData(key, event) {
        props.data[key] = event.target.value
    }

    async function submit() {

        const result = await fetch("http://localhost:3000/tasks/" + props.data._id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify({
                name: props.data.name,
                description: props.data.description,
                _id: props.data.point._id,
                point: props.data.point.point
            })
        })
        console.log(result.json())
    }

    async function onDeleteHandler() {

        const deleteObj = {
            pointId: props.data.point._id
        }

        const result = await fetch("http://localhost:3000/tasks/" + props.data._id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(deleteObj)
        })
    }

    return (
        <div className="App">
            <header className="App-header">

                <Button variant="outline-light" onClick={() => props.updateEditTask(false)} style={{top: "25px", left: "25px", position: "absolute"}}>&#8592;</Button>

                <Row>
                    <h1>Edit this task</h1>

                    <Form className="bg-light rounded rounded-3 border-light m-3 p-2 text-center">
                        <Form.Label className="bg-light p-2 rounded-3" style={{color: "#282c34"}}>
                            <code>[Task]: </code>
                        </Form.Label>
                        <Form.Control type="text" className="w-75 mx-auto m-3" placeholder={props.data.name}
                                      onChange={updateData.bind(this, "name")}
                        />
                        <Form.Label>
                            <code>[Description]: </code>
                        </Form.Label>
                        <Form.Control type="text" className="w-75 mx-auto m-3" placeholder={props.data.description}
                                      onChange={updateData.bind(this, "description")}
                        />
                        <Form.Label>
                            <code>[Points]: </code>
                        </Form.Label>
                        <Form.Control type="text" className="w-75 mx-auto m-3" placeholder={props.data.point.point}
                                      onChange={(e) => props.data.point.point = e.target.value}
                        />

                        <Button variant="outline-dark" className="m-2" onClick={() => submit()}>Submit</Button>

                        <Button variant="outline-danger" className="m-2" onClick={() => onDeleteHandler()}>Delete task</Button>

                    </Form>


                </Row>

            </header>
        </div>
        )



}