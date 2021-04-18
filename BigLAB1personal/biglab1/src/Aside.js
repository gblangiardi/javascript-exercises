import Dropdown from 'react-bootstrap/Dropdown'

function Aside(){
    return(
        <Dropdown className="aside">
            <Dropdown.Item eventKey="1" className= "filter selected">All</Dropdown.Item>
            <Dropdown.Item eventKey="2" className="filter">Important</Dropdown.Item>
            <Dropdown.Item eventKey="3" className="filter">Today</Dropdown.Item>
            <Dropdown.Item eventKey="4" className="filter">Next 7 Days</Dropdown.Item>
            <Dropdown.Item eventKey="5" className="filter">Private</Dropdown.Item>
        </Dropdown>
    );
}

export default Aside;