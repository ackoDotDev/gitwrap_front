import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Commit from "components/Commits/Commits";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col, CardTitle, CardFooter } from "reactstrap";

function Repository() {

  const location = useLocation();

  const [repo, setRepo] = useState([]);

  useEffect(() => {
    async function findRepos() {
      await fetch('/api/github/repos/details' + location.search, {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('user_token')
        })
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Something went wrong!');
        })
        .then((data) => {
          setRepo(data);
          console.log(data);
        })
        .catch((error) => console.error(error));
    }
    findRepos();
  }, []);


  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-star text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Stars</p>
                      <CardTitle tag="p">{repo.stars}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-star text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Subscribes</p>
                      <CardTitle tag="p">{repo.subs}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md="12">
            <Card>
              <CardHeader>
                <h5 className="title">
                  <span>
                    Repository:
                  </span>
                  <a href={repo.html_url}>
                    {repo.full_name}
                  </a>
                </h5>
                <p className="category">{repo.license?.name}</p>
              </CardHeader>
              <CardBody>

                <div>
                  <label>Created:</label>
                  <span>{new Date(repo.created_at).toLocaleString()}</span>
                </div>

                <div>
                  <label>Description:</label>
                  <span>{repo.description}</span>
                </div>

                <div>
                  <label>Default branch:</label>
                  <span>{repo.default_branch}</span>
                </div>

              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h5 className="title">
                  <span>
                    Commits
                  </span>
                </h5>
                <p className="category">Count {repo.commits?.length}</p>
              </CardHeader>
              <CardBody>
                <table className="table">
                  <thead>
                  <tr>
                    <th>Author</th>
                    <th>Committer</th>
                    <th>Commit message</th>
                  </tr>
                  </thead>
                  <tbody>
                    {repo?.commits?.map(x => Commit(x))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Repository;
