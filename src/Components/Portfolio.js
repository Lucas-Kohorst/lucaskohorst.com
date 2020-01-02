import React, { Component } from "react";
import { Container, Card } from "../common";
import { Wrapper, Grid, Item, Content } from "./styles";

class Portfolio extends Component {
  render() {
    if (this.props.data) {
      var projects = this.props.data.projects.map(function(projects) {
        return (
          <div
            key={projects.title}
            className="row banner cards"
            style={{ marginRight: "1em", height: "15em" }}
          >
            <React.Fragment>
              {/* 
              !!! For Displaying Github Projects !!!
              <Wrapper as={Container} id="projects">
                <Grid>
                  {edges.map(({ node }) => (
                    <Item
                      key={node.id}
                      as="a"
                      href={node.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{}}
                    >
                      <Card>
                        <Content>
                          <h4>{node.name}</h4>
                          <p>{node.description}</p>
                        </Content>
                        <Stats>
                          <div>
                            <img src={starIcon} alt="stars" />
                            <span>{node.stargazers.totalCount}</span>
                          </div>
                          <div>
                            <img src={forkIcon} alt="forks" />
                            <span>{node.forkCount}</span>
                          </div>
                        </Stats>
                      </Card>
                    </Item>
                  ))}
                </Grid>
              </Wrapper> */}
              <Item
                as="a"
                href={projects.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card>
                  <Content>
                    <h4>{projects.title}</h4>
                    <h6>{projects.category}</h6>
                    <p>{projects.about}</p>
                  </Content>
                </Card>
              </Item>
            </React.Fragment>
          </div>
        );
      });
    }

    return (
      <section id="portfolio">
        <div className="row">
          <div className="twelve columns collapsed">
            <div
              id="portfolio-wrapper"
              className="bgrid-quarters s-bgrid-thirds cf"
            >
              <Wrapper as={Container}>
                <Grid>{projects}</Grid>
              </Wrapper>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Portfolio;
