import {Container, Row, Dropdown, Col, Form, Button, Modal} from 'react-bootstrap';
import { PencilSquare, Trash, PersonSquare } from 'react-bootstrap-icons';
import {useState} from 'react'
import {list, filters} from "./TaskList"
import Task from "./TaskList"
import dayjs from 'dayjs';
import {Link} from 'react-router-dom'




function MainContent(props) {

    const [active, setActive] = useState("All");
    const updateActive = (filter) => setActive(filter);


    const [newList, setNewList] = useState(list.tasks);
    const addTask = (newTask) => {
        setNewList(oldTasks => [...oldTasks, newTask]);
    }

    const deleteTask = (task) => {
        setNewList(oldTasks => oldTasks.filter(
            curr => (curr.id !== task.id)
        ));
    }

    const updateTask = (newTask) => {
        setNewList(oldTasks => oldTasks.map(
            (task) => (task.id === newTask.id) ? newTask : task
        ));
    }

    const [show, setShow] = useState(false);


    const handleShow = () => setShow(true);

    const [error, setError] = useState("");

    let activeFilter = undefined;
    activeFilter = filters.filter((e)=>(e.name === props.filter)).pop().filter;

    


    return (
        <Container fluid>
            <Row>
                <FilterList active={props.filter} updateActive={updateActive}/>
                <Col xs = {12} md={7} className="tasks">
                <h1 className = "taskhead"><strong>Filter: </strong> {props.filter}</h1>
                <Dropdown.Divider/>
                {(newList !== undefined) ? newList.filter(activeFilter).map((task => <TaskRow task={task} key={task.id} deleteTask={deleteTask} updateTask={updateTask} newList={newList}/>)) :undefined}
                
                </Col>

                <Button type="button" className="fixed-right-bottom" size="lg" variant="success" onClick={handleShow}>&#43;</Button>

                <MyModal show={show} setShow={setShow} error={error} setError={setError} newList={newList} updateList={addTask}/>

            </Row>
        
        
        </Container>
    );
}

export default MainContent;

function MyModal(props){

    const [description, setDescription] = useState((props.task) ? props.task.desc : "");
    const [isUrgent, setIsUrgent] =useState((props.task) ? props.task.urgent : false);
    const [isPrivate, setIsPrivate] = useState((props.task) ? props.task.personal : false);
    const [date, setDate] = useState((props.task && props.task.date) ? props.task.date.format('YYYY-MM-DDTHH:mm') : "");

    const handleClose = () => {
        props.setShow(false);
        setDescription("");
        setDate("");
        props.setError("");
        setIsUrgent(false);
        setIsPrivate(false);
    };

    const handleSubmit = (event) => {
        let valid = true;
        event.preventDefault();

        if(date === "" || dayjs(date).isBefore(dayjs(), 'day')){
            valid = false;
            props.setError("Invalid date!");
        }

        if(description.length === 0 || (!props.task && props.newList.map((t)=>t.desc).includes(description))){
            valid = false;
            props.setError("Insert a correct description!");
        }

        if(valid){
            let tmp;
            props.setError("");
            if(props.task){
                tmp = new Task(props.task.id, description, isUrgent, isPrivate, dayjs(date));
                props.updateList(tmp);
            }
            else{
                tmp = new Task(props.newList.length+1, description, isUrgent, isPrivate, dayjs(date));
                props.updateList(tmp);
                setDescription("");
                setDate("");
                setIsUrgent(false);
                setIsPrivate(false);
            }
            props.setShow(false);
            
        }
    };



    return(
        <Modal show={props.show} onHide={handleClose} centered>
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
                                    checked={isPrivate}
                                    id={"private-checbox"}
                                    label="Private"
                                    onChange={(ev)=>{setIsPrivate(p=>!p)}}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check 
                                    value={isUrgent} 
                                    type="checkbox" 
                                    checked={isUrgent}
                                    id={"urgent-checbox"}
                                    label="Urgent"
                                    onChange={(ev)=>{setIsUrgent(p=>!p)}}
                                    />
                                </Form.Group>
                            <Form.Group>
                                <Form.Label>Select the date</Form.Label>
                                <Form.Control 
                                type="datetime-local" 
                                value={date}
                                onChange={(ev)=>{setDate(ev.target.value)}}
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <span className='urgent'>{props.error}</span>
                            <Button type="submit" variant="success" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
    )
}

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
        return (
        <Link to={"/"+props.name.toLowerCase().replace(/ /g, '')}>
            <Button variant="success" className="filter-button" size="lg" onClick={()=> props.updateActive(props.name)} >{props.name}</Button>
        </Link>)
    else
        return (
        <Link to={"/"+props.name.toLowerCase().replace(/ /g, '')}>
            <Button variant="light" className="filter-button" size="lg" onClick={()=> props.updateActive(props.name)}>{props.name}</Button>
        </Link>
            )
}

function TaskRow(props){
    const trash_icon =  <Trash/>;
    const modify_icon = <PencilSquare/>;
    const private_icon =  <PersonSquare/>;

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [error, setError] = useState("");

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
                {(props.task.date !== undefined) ? props.task.date.format("HH:mm DD MMM YYYY") : undefined}
            </Col>
            <Col xs = {1}>
                <Button variant='light' onClick={handleShow}>{modify_icon}</Button>
            </Col>
            <Col xs ={1}>
                <Button variant='light' onClick={() => props.deleteTask(props.task)}>{trash_icon}</Button>
            </Col>

        </Row>
        <Dropdown.Divider/>
        <MyModal show={show} setShow={setShow} error={error} 
                setError={setError} newList={props.newList} 
                updateList={props.updateTask} task={props.task}/>

    </>
    );
}