import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Container, Grid, Header, Icon, Input, List, Menu } from 'semantic-ui-react';
import { immutablePush, splitGroups } from './lib/utils';

class App extends Component {
  state = {
    newEmployee: '',
    groups: JSON.parse(localStorage.getItem('groups')) || []
  }

  handleInputChange = (evt) => {
    this.setState({newEmployee: evt.target.value});
  }

  handleAddEmployee = (evt) => {
    evt.preventDefault();

    let newGroups = _.flow(_.flatten,
      _.partialRight(immutablePush, this.state.newEmployee),
      splitGroups)
      (this.state.groups);

    this.setState({groups: newGroups, newEmployee: ''});
    localStorage.setItem('groups', JSON.stringify(newGroups));
  }

  handleShuffle = (evt) => {
    let newGroups = _.flow(_.flatten, _.shuffle, splitGroups)(this.state.groups);

    this.setState({'groups': newGroups})
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
                  <List.Item key={j}>{employee}</List.Item>
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
