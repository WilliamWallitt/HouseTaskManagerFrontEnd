import React, {useEffect} from "react";
import {Button, Container, Form} from "react-bootstrap";
import TaskComponent from "./taskComponent";
import TaskEditComponent from "./taskEditComponent";

export default function TasksPageComponent(props) {
    const [taskData, updateTaskData] = React.useState({})
    const [editTask, updateEditTask] = React.useState(false)
    const [editTaskData, updateEditTaskData] = React.useState({})
    const [newTask, updateNewTask] = React.useState({name: "", description: "", point: ""})
    const [addedANewTask, updateAddedANewTask] = React.useState(false)

    const taskReq = async () => {

        const data = await fetch("http://localhost:3000/tasks").then(res => res.json()).then(data => data).catch(err => err)
        // updateTaskData(data)
        if (JSON.stringify(taskData) === JSON.stringify({}) || addedANewTask) {
            updateAddedANewTask(false)
            updateTaskData(data)
        }
    }

    useEffect(() => {

        taskReq().then(_ => console.log("req made"))

    }, [taskReq])



    function addTaskHandler(key, event) {
        let t = newTask
        t[key] = event.target.value
        updateNewTask(t)
    }

    async function addTaskSubmitHandler() {

        Object.keys(newTask).map(k => newTask[k] === null || newTask[k] === undefined ? newTask[k] = "" : newTask[k])

        const _ = await fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },

            body: JSON.stringify(newTask)
        })
        updateAddedANewTask(true)
    }

    return (

        // <TaskEditComponent data={props.data} updateEditTask={updateEditTask}/>
        !editTask ?
        <div className="App">
            <header className="App-header">

                <Button variant="outline-light" onClick={() => props.updateNextPage(false)} style={{top: "25px", left: "25px", position: "fixed"}}>&#8592;</Button>

                <h1>Welcome: <code className="h1">[{props.name}]</code></h1>
                <h1>Select a task </h1>
                <h1>&#8595;</h1>

                {/*{JSON.stringify(taskData) !== JSON.stringify({}) ? <h1>{taskData[0].name}</h1> : <h1>Loading...</h1>}*/}
                <Container className="d-flex justify-content-center flex-wrap w-100">
                    {JSON.stringify(taskData) !== JSON.stringify({}) ? taskData.map(task => {
                        return <TaskComponent data={task} updateEditTaskData={updateEditTaskData} updateEditTask={updateEditTask}
                                              userId={props.userId}
                                              authorization={props.authorization}/>
                    }) : <h1>Loading tasks...</h1>}

                </Container>

                <h1 className="my-3">Add a task </h1>
                <h1>&#8595;</h1>

                <Container>
                    <Form className="w-50 mx-auto bg-light rounded my-3">
                        <Form.Label>
                            <code>[Task]: </code>
                        </Form.Label>
                        <Form.Control type="text" className="w-75 mx-auto m-3"
                                      onChange={addTaskHandler.bind(this, "name")}
                        />
                        <Form.Label>
                            <code>[Description]: </code>
                        </Form.Label>
                        <Form.Control type="text" className="w-75 mx-auto m-3"
                                      onChange={addTaskHandler.bind(this, "description")}
                        />
                        <Form.Label>
                            <code>[Points]: </code>
                        </Form.Label>
                        <Form.Control type="text" className="w-75 mx-auto m-3"
                                      onChange={addTaskHandler.bind(this, "point")}
                        />

                        <Button variant="outline-dark" className="m-2" onClick={() => addTaskSubmitHandler()}>
                            Add new task
                        </Button>

                    </Form>
                </Container>

            </header>
        </div> : <TaskEditComponent data={editTaskData} updateEditTask={updateEditTask}/>


    )

}