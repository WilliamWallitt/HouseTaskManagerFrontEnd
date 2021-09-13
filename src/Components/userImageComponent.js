import {Button, Card, CardImg} from "react-bootstrap";

export default function UserImageComponent(props) {

    return (
        <Card style={{ width: '18rem' }} className="bg-transparent border-light border-5 m-2">
            <CardImg className="rounded-circle" src={props.image}/>
            <Card.Title><Button variant="outline-light" className="lead m-1 p-2 rounded-2" onClick={() => {
                props.updateNextPage(true)
                props.updateClickedUser(props.clickedUser)
            }}>{props.name}</Button></Card.Title>
        </Card>
    )

}