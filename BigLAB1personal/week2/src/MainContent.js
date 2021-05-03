import {Container, Row, Dropdown, Col, Form, Button, Modal} from 'react-bootstrap';
import { PencilSquare, Trash, PersonSquare } from 'react-bootstrap-icons';
import {useState} from 'react'
import {list, filters} from "./TaskList"
import Task from "./TaskList"
import dayjs from 'dayjs';




function MainContent(props) {

    const [active, setActive] = useState("All");
    const updateActive = (filter) => setActive(filter);


    const [newList, setNewList] = useState(list.tasks);
    const updateList = (newTask) => {
        setNewList(oldTasks => [...oldTasks, newTask]);
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setDescription("");
        setDate("");
        setError("");
        setIsUrgent(false);
        setIsPrivate(false);
    };
    const handleShow = () => setShow(true);

    const [description, setDescription] = useState("");
    const [isUrgent, setIsUrgent] =useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [date, setDate] = useState("");
    const [error, setError] = useState("");

    let activeFilter = undefined;
    activeFilter = filters.filter((e)=>(e.name === active)).pop().filter;

    const handleSubmit = (event) => {
        let valid = true;
        event.preventDefault();

        if(date === "" || dayjs(date).diff(dayjs(), 'day') < 0){
            valid = false;
            setError("Invalid date!");
        }

        if(description.length === 0){
            valid = false;
            setError("Insert a correct description!");
        }

        if(valid){
            setError("");
            let tmp = new Task(newList.length, description, isUrgent, isPrivate, dayjs(date));
            updateList(tmp);
            setShow(false);
            setDescription("");
            setDate("");
            setIsUrgent(false);
            setIsPrivate(false);
        }
    };



    return (
        <Container fluid>
            <Row>
                <FilterList active={active} updateActive={updateActive}/>
                <Col xs = {12} md={7} className="tasks">
                <h1 className = "taskhead"><strong>Filter: </strong> {active}</h1>
                <Dropdown.Divider/>
                {(newList !== undefined) ? newList.filter(activeFilter).map((task => <TaskRow task={task} key={task.id}/>)) :undefined}
                
                </Col>

                <Button type="button" className="fixed-right-bottom" size="lg" variant="success" onClick={handleShow}>&#43;</Button>

                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                    <Modal.Title>Insert a new Task</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Form.Group controlId="formDescription">
                                 <Form.Label>Insert Task description</Form.Label>
                                 <Form.Control
                                  value={description} 
                                  as="textarea" 
                                  rows={1} 
                                  placeholder="Type here..."
                                  onChange={(ev)=>{setDescription(ev.target.value)}}
                                  />
                            </Form.Group>
                                <Form.Group>
                                    <Form.Check 
                                    value={isPrivate} 
                                    type="checkbox" 
                                    id={"private-checbox"}
                                    label="Private"
                                    onChange={(ev)=>{setIsPrivate(ev.target.value)}}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check 
                                    value={isUrgent} 
                                    type={"checkbox"} 
                                    id={"urgent-checbox"}
                                    label="Urgent"
                                    onChange={(ev)=>{setIsUrgent(ev.target.value)}}
                                    />
                                </Form.Group>
                            <Form.Group>
                                <Form.Label>Select the date</Form.Label>
                                <Form.Control 
                                type="date" 
                                value={date}
                                onChange={(ev)=>{setDate(ev.target.value)}}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <span className='urgent'>{error}</span>
                            <Button type="submit" variant="success" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
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