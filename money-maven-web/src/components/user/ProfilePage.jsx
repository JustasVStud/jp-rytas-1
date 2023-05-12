import { Row, Col, Container, Image } from 'react-bootstrap';
import AuthService from '../../services/Auth.service';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { logoutHandler } from '../../services/logoutHandler';
import profileStudent from '../../assets/profile-student.svg';


function ProfilePage() {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if(!currentUser){
            navigate("/login");
            return;
        }
        setCurrentUser(currentUser);
    }, [navigate]);

    if(!currentUser){
        return (
            <Container>
                <Row>Loading...</Row>
            </Container>
        )
    }
    return ( 
        <Container className="profile-page">
            <Row>
                <h2 className="profile-header">Welcome Student Techin!</h2>
            </Row>
            <Row className="profile-line">
                <Col>
                    Username:
                </Col>
                <Col>
                    {currentUser.username}
                </Col>
            </Row>
            <Row className="profile-line">
                <Col>
                    Roles:
                </Col>
                <Col>
                       {currentUser.authorities.includes('USER') && 
                       <Row className="profile-row">User</Row>
                       }
                       {currentUser.authorities.includes('ADMIN') &&
                       <Row className="profile-row">Administrator</Row>
                       }
                </Col>
            </Row>
            <Row className="profile-line">
                <Link to={'/income'} className="profile-link">Go to Incomes</Link>
            </Row>
            <Row className="profile-line">
                <Link to={'/expense'} className="profile-link">Go to Expenses</Link>
            </Row>
            <Row className="profile-line">
                <span onClick={() => logoutHandler(navigate)} className="profile-link">Sign out</span>
            </Row>
            <Row className="fixed-bottom profile-student justify-content-center">
                <Image src={profileStudent} alt='a sitting student holding some pages' fluid className="profile-student__img"/>
            </Row>
        </Container>
     );
}

export default ProfilePage;