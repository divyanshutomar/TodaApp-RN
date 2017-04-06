// @flow
import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button, Tabs, Tab, Icon, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import _ from 'lodash';
import type { TodoItem } from './App.js.flow';
import { uid } from './utils';

const cardColors: Array<string> = [
    '#FFCDD2',
    '#E1BEE7',
    '#BBDEFB',
    '#B2DFDB',
    '#F0F4C3'
];
const RenderTextInput = (props: any) => {
    return (
        <View>
            <FormLabel>{props.fieldName}</FormLabel>
            <FormInput value={props.inputValue} {...props} onChangeText={props.handleTextChange}/>
            <FormValidationMessage>{props.errorMessage || ''}</FormValidationMessage>
        </View>
    );
}


class AddTodoForm extends Component {
    state: {
        selectedCardColor: string,
        todoTitle: string,
        todoText: string,
        titleError: string,
        textError: string,
    }
    constructor(props: any) {
        super(props);
        this.state = {
            selectedCardColor: 'white',
            todoTitle: '',
            todoText: '',
            titleError: '',
            textError: ''
        };
        _.bindAll(this, ['handleTodoTitleChange',
        'handleTodoTextChange',
        'onTodoSubmit',
        'handleColorChange',
        'resetState'
        ]);
    }
    resetState() {
        this.setState({
            selectedCardColor: 'white',
            todoTitle: '',
            todoText: '',
            titleError: '',
            textError: ''
        });
    }
    handleTodoTitleChange (value: string) {
        this.setState({
            todoTitle: value,
            titleError: ''
        });
    }
    handleTodoTextChange (value: string) {
        this.setState({
            todoText: value,
            textError: ''
        });
    }
    handleColorChange(colorVal: string) {
        this.setState({
            selectedCardColor: colorVal
        });
    }
    onTodoSubmit() {
        const error_title = this.state.todoTitle ? '' : 'Title is required';
        const error_text = this.state.todoText ? '' : 'Text is required';
        if ( error_title || error_text) {
            this.setState({
                titleError: error_title,
                textError: error_text
            });
            return
        }
        const validatedFormData: TodoItem = {
            id: uid(),
            text: this.state.todoText,
            title: this.state.todoTitle,
            cardColor: this.state.selectedCardColor,
            completed: false
        }
        this.props.pushTodoList(validatedFormData);
        this.resetState();
    }
    render() {
        return (
            <View style={styles.formContainer}>
                    <RenderTextInput
                        fieldName='Title'
                        handleTextChange={this.handleTodoTitleChange}
                        errorMessage={this.state.titleError}
                        inputValue={this.state.todoTitle}
                    />
                    <RenderTextInput
                        fieldName='Text'
                        handleTextChange={this.handleTodoTextChange}
                        errorMessage={this.state.textError}
                        multiline={true}
                        numberOfLines={4}
                        inputValue={this.state.todoText}
                    />
                    <View style={styles.colorContainer}>
                        {
                            cardColors.map((color,index) => <Button
                                onPress={() => this.handleColorChange(color)}
                                backgroundColor={color}
                                large={true}
                                buttonStyle={{
                                    width: 1,
                                    borderWidth: 2,
                                    borderColor: this.state.selectedCardColor === color ?
                                    'black' : 'white'
                                }}
                                borderRadius={100}
                                key={index}
                            />)
                        }
                    </View>
                    <Button
                        onPress={this.onTodoSubmit}
                        title='Add Todo'
                        backgroundColor='#2196F3'
                        buttonStyle={{ marginTop: 40 }}
                    />
            </View>
        );
    }
}

AddTodoForm.propTypes = {
    pushTodoList: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    marginTop: 30,
  },
  colorContainer: {
      flex: 0,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20
  }
});


export default AddTodoForm;