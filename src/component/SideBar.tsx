import React, { useState } from 'react';
import { Container, Row, Col, Nav, Dropdown } from 'react-bootstrap';
import UserList from './UserList';
import { useRouter } from 'next/router';
import ChannelList from './ChannelList';

const Sidebar: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState();
    const [selectedChannel, setSelectedChannel] = useState();
    const router = useRouter();

    const handleSelectUser = (user: any) => {
        setSelectedUser(user);
        
      };
      const handleSelectChannel = (channel: any) => {
        setSelectedChannel(channel);
        console.log(selectedChannel);
        
      };

  return (
    <Container fluid>
      <Row >
        <Col sm={3} md={10}className="bg-light sidebar" >
          <Nav className="flex-column">
            <Nav.Link href="/channel">Channel</Nav.Link>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="user-dropdown">
                Users
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <UserList onSelectUser={handleSelectUser} />
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
