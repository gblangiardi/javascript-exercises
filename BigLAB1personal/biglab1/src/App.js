import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import MyNavbar from './MyNavbar';
import Aside from './Aside';
import './App.css';



function App() {

  const trashIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>

  const pencilIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
  <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
</svg>

  const userIcon = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-square" viewBox="0 0 16 16">
  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
</svg>

  return (
    <>
      <MyNavbar/>
      <Row>
        <Col md={4}>
          <Aside/>
        </Col>
        <Col md={8} className="main">
          <h3 className="mainTitle"><strong>Filter:</strong> All</h3>

          <Row className="task">
            <Col md={10}>
              <Form.Check type="checkbox" label="Study for the exam"/>
            </Col>
            <Col md={1}>
              {pencilIcon}
              {trashIcon}
            </Col>
          </Row>

          <Dropdown.Divider />

          <Row className="task">
            <Col>
              <Form.Check type="checkbox" label="Prepare the slides for the exam"/>
            </Col>
            <Col md={2}>
              {userIcon}
            </Col>
            <Col className="date">
              Saturday, June 20th 2020, 12:00:00 am
            </Col>
            <Col md={2}>
              {pencilIcon}
              {trashIcon}
            </Col>
          </Row>

          <Dropdown.Divider />

          <Row className="task">
            <Col>
              <Form.Check type="checkbox" label="Call Mary"/>
            </Col>
            <Col md={2}>
              {undefined}
            </Col>
            <Col className="date">
              {undefined}
            </Col>
            <Col md={2}>
              {pencilIcon}
              {trashIcon}
            </Col>
          </Row>

        </Col>
      </Row>

      <Row>
        <Button type="button" className="btn btn-lg btn-success fixed-right-bottom">&#43;</Button>

        </Row>

    </>
  );
}

export default App;
