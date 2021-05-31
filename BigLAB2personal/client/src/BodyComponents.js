import {Col, Button} from 'react-bootstrap' ;
import {useState} from 'react' ;
import {Container, Row, Dropdown, Modal, Form} from 'react-bootstrap';
import "./App.css"
import TaskRow from './TaskComponents.js';
import {Task, TaskList} from './Task.js';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import {useEffect} from 'react'
import API from './API'

function MyBody(props){

    const [tasks, setTasks] = useState(new TaskList([]));
    const [reload, setReload] = useState(true);
   
    useEffect(()=>{
      console.log(reload);
      if(reload){
        API.loadTasks(props.apiFilter).then((newT) => {setTasks(newT)});
        setReload(false);
      }

    }, [reload, props.apiFilter]);

    useEffect(()=>{
      API.loadTasks(props.apiFilter).then((newT) => {setTasks(newT)});
    }, [props.selected, props.apiFilter]);
    
    const chooseFilter = (name) => {
      //setSelected(name);
    }

    const addTask = (task) => {
        API.myAdd(task);
        askReload();
    }
    
    const modifyTask = (task) =>{
      API.modifyTask(task);
      askReload();
    }
    const removeTask = (task) => {
      API.deleteTask(task);

     askReload();
    } 

    const setCompleted = (id, completed) =>{
      API.setCompleted(id, completed);

      askReload();
    }
     
    const askReload = () => {
      setReload(true);
    }
    

    return(
        <>
        <Container fluid>
        <Row>
            <MySide selected = {props.selected} filters = {props.filters} choose = {chooseFilter} reload={askReload}/>

            <MyMain selected = {props.selected} tasks = {tasks} filters = {props.filters} modify ={modifyTask} remove = {removeTask} setCompleted = {setCompleted}/> 
        
            <MyButton addTask = {addTask} tasks = {tasks}/>
        </Row>
        </Container>
        </>

    );
}

function MySide(props){
    return (
    <>
    <Col xs = {12} md={4} className="aside">
        {
            props.filters.map((f) => <FilterRow name = {f.name} selected = {props.selected} key = {f.name} choose = {props.choose} reload={props.reload}/>)
        }


    </Col>
    </>
    );
}

function FilterRow(props){
    let path = '/';
    path = path.concat(props.name);
    
    
    if(props.selected === props.name){
        return(
            <>
                <Button variant="success" className="filter-button" size="lg" onClick={() => props.reload()}>{props.name}</Button>
                <Dropdown.Divider className="filter-divider" />
            </>
        );
    }else{
        return(
            <>
                <Link to={{pathname : path}}>
                <Button onClick={() => props.reload()} variant="light" className="filter-button" size="lg" >{props.name}</Button>
                </Link>
                <Dropdown.Divider className="filter-divider" />
            </>
        );
    }
}



function MyMain(props){
  if(props.selected === undefined || props.selected === ''){
    return(
      <>
      </>
    );
  }else{
    
  let selected_filter = props.filters.filter((f) => f.name === props.selected).pop().filter;
    return(
        <>
        <Col xs = {12} md={7} className="tasks">
        <h1 className = "taskhead"><strong>Filter: </strong>{props.selected}</h1>
        <Dropdown.Divider/>
        {
          props.tasks.getList().filter((t)=>selected_filter(t)).map((t) => <TaskRow task = {t} key ={t.id} 
          modify = {props.modify} remove = {props.remove} tasks ={props.tasks} setCompleted = {props.setCompleted}/>)
        }
        </Col>
        </>

    );
  }
}
function MyButton(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return(
    
    <>
    
      <Button type="button" className="fixed-right-bottom" size="lg" variant="success" onClick={handleShow}>
        +
      </Button>

      <MyModal show = {show} handleClose = {handleClose} tasks = {props.tasks} functionTask={(task) => {props.addTask(task); handleClose()}}/>
      
    </>
    
    );
}

function MyModal(props){
  let desc_init= '';
  let important_init = false;
  let priv_init = false;
  let date_init = '';
  let hour_init = 0;
  let min_init = 0;

  if(props.task !== undefined){
    desc_init = props.task.desc;
    important_init = props.task.important;
    priv_init = props.task.private;
    date_init = dayjs(props.task.deadline).format("YYYY-MM-DD");
    hour_init = dayjs(props.task.deadline).format("hh");
    min_init = dayjs(props.task.deadline).format("mm");
      
  }


  const [description, setDescription] = useState(desc_init);
  const [important, setImportant] = useState(important_init);
  const [priv, setPriv] = useState(priv_init);
  const [date, setDate] = useState(date_init);
  const [hour, setHour] = useState(hour_init);
  const [minute, setMinute] = useState(min_init);
  const [error, setError] = useState("");

  
  const handleSubmit = (event) =>{
    //const form = event.currentTarget;
    let valid = true;
    let localerr = [];
    event.preventDefault();
    if(description === ""){
      valid = false;
      localerr.push("Missing description")
      //setError((old) => old.concat("-Missing Description-"));
      
    }

    if(props.tasks.getList().map((t) => t.description).includes(description) && props.task===undefined){
      valid = false;
      if(localerr!==[]){
        localerr.push(" ");
      }
      localerr.push("Description has to be unique");
      //setError((old) => old.concat("-description has to be unique-"));
    }

    if(dayjs().subtract(1, 'day').isAfter(date)){
      valid = false;
      if(localerr!==[]){
        localerr.push(" ");
      }
      localerr.push("Input date has expired already");
      //setError((old) => old.concat("-date has already expired-"));
    }
    if(hour >=24 || hour<0){
      valid = false;
      if(localerr!==[]){
        localerr.push(" ");
      }
      localerr.push("Invalid hour");
      //setError((old) => old.concat("-date has already expired-"));
    }
    if(minute >=60 || minute<0){
      valid = false;
      if(localerr!==[]){
        localerr.push(" ");
      }
      localerr.push("Invalid minute");
      //setError((old) => old.concat("-date has already expired-"));
    }
    setError(localerr);
    if(valid ===true){
      let sel_id;
      if(props.task===undefined){
        sel_id= props.tasks.getLastId() +1;
      }else{
        sel_id = props.task.id;
      }
      setDate((oldDate) => dayjs(oldDate));
      
      //console.log(dayjs(date).format("YYYY-MM-DD-hh-mm"));
      const task = new Task(sel_id, description, important, priv, dayjs(`${date} ${hour}:${minute}`));//{id : last_id+1, description : description, important : important, private : priv, deadline : date};
      //console.log(task);
      console.log(task);
      props.functionTask(task);
      setError("");
      if(props.task===undefined){
        
        setDescription("");
        setImportant(false);
        setPriv(false);
        setDate("");
      }
        
      
    }
  }
  return(
    <>
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a task</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
          <Form.Group controlid="formTaskDescription">
            <Form.Label>Task Description</Form.Label>
            <Form.Control required type = "text" placeholder="...enter description" value = {description} onChange={(ev) => setDescription(ev.target.value)}/>
          </Form.Group>
          <Form.Group controlid="formImportant">
            <Form.Check type="checkbox" label="Important" checked = {important} onChange={() => setImportant(i =>!i)}/>
          </Form.Group>
          <Form.Group controlid="formPrivate">
            <Form.Check type="checkbox" label="Private" checked = {priv} onChange={() => setPriv( asd =>!asd)}/>
          </Form.Group>
          <Form.Group controlid='formDate'>
              <Form.Label>Date</Form.Label>
              <Form.Control type='date' value={date} onChange={(ev) => setDate(ev.target.value)}/>
          </Form.Group>
          <Row>
          <Col xs={{ span: 3, offset: 1 }}>
          <Form.Group controlid= 'formhour'>
              <Form.Label>Hour</Form.Label>
              <Form.Control type="number" min={0} max ={23} value = {hour} onChange={(ev) => setHour(ev.target.value)}/>
          </Form.Group>
          </Col>
          <Col xs ={{ span: 3}}>
          <Form.Group controlid= 'formmin'>
              <Form.Label>Minute</Form.Label>
              <Form.Control type="number" min={0} max ={59} value = {minute} onChange={(ev) => setMinute(ev.target.value)}/>
          </Form.Group>
          </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <span className='important'>{error}</span>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>


        </Form>
      </Modal>
    </>
  );
}

export  {MyBody, MyModal};
