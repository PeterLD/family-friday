import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Container, Grid, Header, Icon, Input, List } from 'semantic-ui-react';
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
        <Header as='h1'>Family Friday</Header>
        <form onSubmit={ this.state.newEmployee ? this.handleAddEmployee : (evt) => evt.preventDefault() }>
          <Input
            icon={<Icon name='add user' inverted circular />}
            placeholder='Add employee...'
            onChange={this.handleInputChange}
            value={this.state.newEmployee} />
        </form>
        <Button content='Shuffle' icon='random' labelPosition='right' onClick={this.handleShuffle} primary />
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
    );
  }
}

export default App;
