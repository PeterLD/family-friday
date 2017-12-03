import _ from 'lodash';
import React, { Component } from 'react';
import { Button, Container, Grid, Header, Icon, Input, List } from 'semantic-ui-react';
import { splitGroups } from './lib/utils';

class App extends Component {
  state = {
    groups: [
      ['sadfasdf', 'fdasdfd', 'fdafda', 'asdfdsfgfshcxx', 'sadfkljas'],
      ['ncdkjhgdksb', 'coijrwklj', 'fasjodfkjno', 'nbasdfkjal', 'asdfljas'],
      ['sadkfnlad', 'aosnejfn', 'bejwfladfjks', 'bksadjfla', 'naldfjks'],
      ['asdfkljs', 'asdflkasl', 'elkfjasonb']
    ]
  }

  handleShuffle = (evt) => {
    evt.preventDefault();

    let newGroups = _.flow(_.flatten, _.shuffle, splitGroups)(this.state.groups);

    this.setState({'groups': newGroups})
  }

  render() {
    return (
      <Container style={{ marginTop: '2em' }}>
        <Header as='h1'>Family Friday</Header>
        <Input
          icon={<Icon name='add user' inverted circular link />}
          placeholder='Add employee...' />
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
