import Navbar from 'react-bootstrap/Navbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

function MyNavbar() {
    const logo = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-check2-all" viewBox="0 0 16 16">
                    <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                    <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                 </svg> ;

    const user = <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                 </svg>;

    return(
        <Navbar bg="success" expand="xs" variant = "dark">
            <Col>
                <Navbar.Brand href="#home">{logo} ToDO Manager</Navbar.Brand>
            </Col>
            <Col md={7}>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                </Form>
            </Col>
            <Col md="auto">
                <a href="#home">
                    {user}
                </a>
            </Col>
        </Navbar>
    )
}

export default MyNavbar;