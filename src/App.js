import React, { Component } from 'react';
import { Button, Container, Grid, Header, Icon, Input, List } from 'semantic-ui-react';

class App extends Component {
  state = {
    employeeGroups: [
      ['sadfasdf', 'fdasdfd', 'fdafda', 'asdfdsfgfshcxx', 'sadfkljas'],
      ['ncdkjhgdksb', 'coijrwklj', 'fasjodfkjno', 'nbasdfkjal', 'asdfljas'],
      ['sadkfnlad', 'aosnejfn', 'bejwfladfjks', 'bksadjfla', 'naldfjks'],
      ['asdfkljs', 'asdflkasl', 'elkfjasonb']
    ]
  }

  render() {
    return (
      <Container style={{ marginTop: '2em' }}>
        <Header as='h1'>Family Friday</Header>
        <Input
          icon={<Icon name='add user' inverted circular link />}
          placeholder='Add employee...' />
        <Button content='Shuffle' icon='random' labelPosition='right' primary />
        <Grid columns={3} celled>
          {this.state.employeeGroups.map((group, i) => (
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
