import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Container, Grid, Header, Icon, Input, List } from 'semantic-ui-react';
import { immutablePush, splitGroups, toggleIsHere } from './lib/utils';

class App extends Component {
  state = {
    newEmployee: '',
    groups: JSON.parse(localStorage.getItem('groups')) || []
  }

  handleIsHere = (id) => {
    let newList = _.flow(_.flatten, _.partialRight(toggleIsHere, id), splitGroups)(this.state.groups);
    this.setState({groups: newList});
    console.dir(newList);
    localStorage.setItem('groups', JSON.stringify(newList));
  }

  handleInputChange = (evt) => {
    this.setState({newEmployee: evt.target.value});
  }

  handleAddEmployee = (evt) => {
    evt.preventDefault();

    let newGroups = _.flow(_.flatten,
      _.partialRight(immutablePush, {name: this.state.newEmployee, isHere: true, id: _.uniqueId()}),
        splitGroups)(this.state.groups);

    this.setState({groups: newGroups, newEmployee: ''});
    localStorage.setItem('groups', JSON.stringify(newGroups));
  }

  handleShuffle = (evt) => {
    let newGroups = _.flow(_.flatten, _.shuffle, splitGroups)(this.state.groups);

    this.setState({'groups': newGroups});
    localStorage.setItem('groups', JSON.stringify(newGroups));
  }

  render() {
    return (
      <Container style={{ marginTop: '2em' }}>
        <Container>
          <Header as='h1'floated='left'>Family Friday</Header>
          <form position='right' onSubmit={ this.state.newEmployee ? this.handleAddEmployee : (evt) => evt.preventDefault() }>
            <Input
              icon={<Icon name='add user' inverted circular />}
              placeholder='Add employee...'
              style={{float: 'right'}}
              onChange={this.handleInputChange}
              value={this.state.newEmployee} />
          </form>
        </Container>
        <Container style={{marginTop: '2em', marginBottom: '2em', clear: 'both'}} textAlign='center'>
          <Button content='Shuffle' size='massive' icon='random' labelPosition='right' onClick={this.handleShuffle} primary />
        </Container>
        <Container>
        <Grid columns={3} padded>
          {this.state.groups.map((group, i) => (
            <Grid.Column key={i}>
              <Header as='h2'>Group {i + 1}</Header>
              <List>
                {group.map((employee, j) => (
                  <List.Item key={j}>{employee.name} <input type='checkbox' checked={employee.isHere} onChange={(evt) => this.handleIsHere(employee.id)} /></List.Item>
                ))}
              </List>
            </Grid.Column>
          ))}
        </Grid>
        </Container>
      </Container>
    );
  }
}

export default App;
