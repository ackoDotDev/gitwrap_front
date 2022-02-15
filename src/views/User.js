import React, { useState, useContext, useEffect } from "react";
import { UserContext } from '../contexts/UserContext';
import UserHandler from "hooks/User/UserHandler";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function User() {
  const location = useLocation();

  const { updateProfile } = UserHandler();


  const { user, setUser } = useContext(UserContext);

  const [name, setName] = useState([]);
  const [company, setCompany] = useState();
  const [profile, setProfile] = useState(null);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

      const data = {
          name: name ?? user.name,
          company: company ?? user.company,
      };

      const response = await updateProfile(data);
      setUser(response.user);
  };


  useEffect(() => {
    const search = location.search ? location.search : "?name=" + user?.username;

    async function findProfile() {

        await fetch('/api/github/profile' + search, { headers: new Headers({ 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + Cookies.get('user_token')
          }) })
          .then((response) => {
              if (response.ok) {
                  return response.json();
              }
              throw new Error('Something went wrong!');
          })
          .then((data) => {
            if(data?.message != "Not Found"){
              setProfile(data);
            }
          })
          .catch((error) => console.error(error));
      }
      findProfile();
  }, [user]);
  if((profile && !user) || (profile && user.github_id != profile.id)){
      return (
      <div className="content">
        <Row>
          <Col>
            <Card className="card-user">
              <div className="image"></div>
              <CardBody>
                <div className="author">
                  <a>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={profile?.avatar_url}
                    />
                    <h5 className="title">{profile?.name ? profile?.name : "Username"}</h5>
                  </a>
                  <p className="description">{profile?.company ? profile?.company : "Company"}</p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      );
    }
    console.log(user)
  if(!user){
    return (
      <div className="content">
        <Row>
          <Col>
            <Card>
              <CardBody>
                  <div className="text-center m-5">
                    <p>Search for user</p>
                  </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>    
      )
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image"></div>
              <CardBody>
                <div className="author">
                  <a>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={user?.avatar}
                    />
                    <h5 className="title">{user?.name ? user?.name : "Username"}</h5>
                  </a>
                  <p className="description">{user?.company ? user?.company : "Company"}</p>
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form method="POST" onSubmit={(e) => handleProfileUpdate(e)}>
                  <Row>
                    <Col className="pr-1">
                      <FormGroup>
                        <label>Company</label>
                        <Input
                          defaultValue={user?.company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          defaultValue={user?.name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Name"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;
