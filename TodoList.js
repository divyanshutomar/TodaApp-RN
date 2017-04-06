// @ flow

import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem, List, Text } from 'react-native-elements';

const renderRow = (rowData, sectionId) => (
    <ListItem
      key={sectionID}
      title={rowData.title}
      subtitle={rowData.text}
    />
);


class TodoList extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text h2 fontFamily='monospace'>Todo List</Text>
                {
                    this.props.listData.length > 0 ?
                        <List>
                            {
                                this.props.listData.map((todo) => <ListItem
                                    title={todo.title}
                                    subtitle={todo.text}
                                    key={todo.id}
                                    rightIcon={{ name: 'done' }}
                                    containerStyle={{
                                        backgroundColor: `${todo.cardColor}`
                                    }}
                                />)
                            }
                        </List>
                        :
                        <Text h4>No items found</Text>
                }
            </View>
        );
    }
}

TodoList.propTypes = {
    listData: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
  }
});


export default TodoList;