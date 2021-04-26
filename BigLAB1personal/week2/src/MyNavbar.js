import {CheckAll, PersonCircle} from 'react-bootstrap-icons';
import {Navbar, Col, Form} from 'react-bootstrap'

function MyNavbar(){

    const todo_icon = <CheckAll size = {30}/> ;
    const user_icon = <PersonCircle size = {30} className = "icon-user"/>;

    return (
        <Navbar bg="success" expand="xs" variant = "dark">
            <Col xs={2}>
                <Navbar.Brand href = "#home">{todo_icon} 
                ToDo Manager</Navbar.Brand>
            </Col>
            <Col xs ={{ span: 4, offset: 2 }}>
                <Form.Control type="text" placeholder="Search..." />

            </Col>
            
            <Col xs = {{ span: 1, offset: 3 }}>
                {user_icon}
            </Col>
        
        </Navbar>
    );
}

export default MyNavbar;