import {Container, Row, Dropdown, Col, Form, Button} from 'react-bootstrap';
import { PencilSquare, Trash, PersonSquare } from 'react-bootstrap-icons';
import {useState} from 'react'
import list from "./TaskList"



function MainContent(props) {

    const [active, setActive] = useState("All");

    const updateActive = (filter) => setActive(filter);


    let newList = [];

    switch(active){
        case "All":
            newList=list.tasks;
            break;
        case "Important":
            newList=list.urgentFilter();
            break;
        case "Today":
            newList=list.todayFilter();
            break;
        case "Next 7 Days":
            newList=list.nextDaysFilter();
            break;
        case "Private":
            newList=list.personalFilter();
            break;
        default:
            break;
    }


    return (
        <Container fluid>
            <Row>
                <FilterList active={active} updateActive={updateActive}/>
                <Col xs = {12} md={7} className="tasks">
                <h1 className = "taskhead"><strong>Filter: </strong> {active}</h1>
                <Dropdown.Divider/>
                {(newList !== undefined) ? newList.map((task => <TaskRow task={task} key={task.id}/>)) :undefined}
                
                </Col>

                <Button type="button" className="fixed-right-bottom" size="lg" variant="success">&#43;</Button>
            </Row>
        
        
        </Container>
    );
}

export default MainContent;

function FilterList(props){

    return(
        <Col xs = {12} md={4} className="aside">

            <MyButton name="All" active={"All"===props.active} updateActive={props.updateActive}/>
            <Dropdown.Divider className="filter-divider" />
            <MyButton name="Important" active={"Important"===props.active} updateActive={props.updateActive}/>
            <Dropdown.Divider className="filter-divider" />
            <MyButton name="Today" active={"Today"===props.active} updateActive={props.updateActive}/>
            <Dropdown.Divider className="filter-divider" />
            <MyButton name="Next 7 Days" active={"Next 7 Days"===props.active} updateActive={props.updateActive}/>
            <Dropdown.Divider className="filter-divider" />
            <MyButton name="Private" active={"Private"===props.active} updateActive={props.updateActive}/>
            <Dropdown.Divider className="filter-divider" />

        </Col>
    )
}

function MyButton(props){
    if(props.active)
        return (<Button variant="success" href="#" className="filter-button" size="lg" onClick={()=> props.updateActive(props.name)} >{props.name}</Button>)
    else
        return (<Button variant="light" href="#" className="filter-button" size="lg" onClick={()=> props.updateActive(props.name)}>{props.name}</Button>)
}

function TaskRow(props){
    const trash_icon =  <Trash/>;
    const modify_icon = <PencilSquare/>;
    const private_icon =  <PersonSquare/>;

    return(
    <>
        <Row>
            <Col xs = {{ span: 3, offset: 1 }} className={(props.task.urgent) ? "urgent" : undefined}>
                <Form.Check type="checkbox" label={props.task.desc}/>
            </Col>
            <Col xs = {{span: 1, offset: 1}}>
                {(props.task.personal) ? private_icon : undefined}
            </Col>
            <Col xs = {{ span: 4, offset: 0 }} className="date">
                {(props.task.date !== undefined) ? props.task.date.format("HH:MM DD MMM YYYY") : undefined}
            </Col>
            <Col xs = {1}>
                {modify_icon}
            </Col>
            <Col xs ={1}>
                {trash_icon}
            </Col>

        </Row>
        <Dropdown.Divider/>
    </>
    );
}