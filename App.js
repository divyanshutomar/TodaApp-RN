// @flow

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Tabs, Tab, Icon } from 'react-native-elements';
import _ from 'lodash';
import type { TodoItem } from './App.js.flow';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';

export default class App extends React.Component {
  state: {
    visibleTab: string,
    todosArray: Array<TodoItem>
  }
  constructor(props: any) {
    super(props);
    this.state = {
      visibleTab: 'todolist',
      todosArray: []
    }
    _.bindAll(this, ['changeTab', 'handleTodoAdd']);
  }
  changeTab(selectedTab: string) {
    this.setState({
      visibleTab: selectedTab
    });
  }
  handleTodoAdd(todoObj: TodoItem) {
    this.setState({
      todosArray: this.state.todosArray.concat([todoObj])
    });
    this.changeTab('todolist');
  }
  render() {
    const { visibleTab } = this.state;
    return (
        <Tabs>
          <Tab
            titleStyle={{fontWeight: 'bold', fontSize: 10}}
            selectedTitleStyle={styles.activeTitleStyle}
            selected={visibleTab === 'todolist'}
            title={visibleTab === 'todolist' ? 'Todo List' : null}
            renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='format-list-bulleted' size={33} />}
            renderSelectedIcon={() => <Icon color={'#6296f9'} name='format-list-bulleted' size={30} />}
            onPress={() => this.changeTab('todolist')}>
              <TodoList listData={this.state.todosArray} />
          </Tab>
          <Tab
            titleStyle={{fontWeight: 'bold', fontSize: 10}}
            selectedTitleStyle={styles.activeTitleStyle}
            selected={visibleTab === 'addtodo'}
            title={visibleTab === 'addtodo' ? 'Add Todo' : null}
            renderIcon={() => <Icon containerStyle={{justifyContent: 'center', alignItems: 'center', marginTop: 12}} color={'#5e6977'} name='add' size={33} />}
            renderSelectedIcon={() => <Icon color={'#6296f9'} name='add' size={30} />}
            onPress={() => this.changeTab('addtodo')}>
            <AddTodoForm pushTodoList={this.handleTodoAdd} />
          </Tab>
        </Tabs>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTitleStyle: {
    marginTop: -1,
    marginBottom: 6,
  },
});
