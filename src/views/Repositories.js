import React, {useState, useContext, useEffect} from "react";
import { UserContext } from "contexts/UserContext";
import { useLocation, Link } from "react-router-dom";
import Cookies from "js-cookie"

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Repositories() {
  const location = useLocation();

  const {user} = useContext(UserContext);
  const [ repos, setRepos] = useState([]);

  useEffect(() => {
    // const search = '?name=ackoDotDev';
    const search = location.search ? location.search : "?name=" + user?.username;

    async function findRepos() {
          await fetch('/api/github/repos' + search, { headers: new Headers({ 
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
              setRepos(data);
            }
          })
          .catch((error) => console.error(error));
      }
      findRepos();
  }, [user]); 
  
  if(!user && !repos.length){
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
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th className="text-right">Open Isues</th>
                    </tr>
                  </thead>
                  <tbody>
                    {repos.map((repo) => {
                        return (
                        <tr key={repo.id}>
                            <td><Link to={'repository?name='+repo.full_name}>{repo.name}</Link></td>

                            <td className="text-right">{repo.open_issues}</td>
                        </tr>
                        );
                    })}
                    
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Repositories;
