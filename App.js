
import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Buttons from './src/components/Buttons'
import Diplay from './src/components/Display'
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current: 0,

}

export default class App extends Component {
  state = {
    ...initialState
  }

  addDigit = n => {
    if(n === '.' && this.state.displayValue.includes('.')){
      return
    }

    const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay

    const currentValue = clearDisplay ? '' : this.state.displayValue

    const displayValue = currentValue + n

    this.setState({displayValue, clearDisplay: false})

    if(n !== '.'){
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({values})
    }

  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    if(current === 0){
      this.setState({ operation, current: 1, clearDisplay: true })
    }else{
      const equals = operation === '='
      const values = [...this.state.values]
      try{
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]}`)
      }catch(e){
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: values[0],
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        clearDisplay: !equals,
        values, 
      })

    }
  }

  render(){
    return (
      
              <View style={styles.sectionContainer}>
                <Display value={this.state.displayValue} />
                <View style={styles.buttons}>
                  <Buttons label='AC' triple onClick={this.clearMemory} />
                  <Buttons label='/' operation onClick={this.setOperation } />
                  <Buttons label='7' onClick={this.addDigit} />
                  <Buttons label='8' onClick={this.addDigit} />
                  <Buttons label='9' onClick={this.addDigit} /> 
                  <Buttons label='*' operation onClick={()=>this.setOperation('*')} /> 
                  <Buttons label='4' onClick={() => this.addDigit(4)} /> 
                  <Buttons label='5' onClick={() => this.addDigit(5)} /> 
                  <Buttons label='6' onClick={() => this.addDigit(6)} /> 
                  <Buttons label='-' operation onClick={() => this.setOperation('-') } /> 
                  <Buttons label='1' onClick={() => this.addDigit(1)}  /> 
                  <Buttons label='2'  onClick={() => this.addDigit(2)}/> 
                  <Buttons label='3' onClick={() => this.addDigit(3)} /> 
                  <Buttons label='+' operation onClick={() => this.setOperation('+') } /> 
                  <Buttons label='0' double onClick={() => this.addDigit(0)} /> 
                  <Buttons label='.' onClick={() => this.addDigit('.')} /> 
                  <Buttons label='=' operation onClick={() => this.setOperation('=') } /> 
                </View>
              </View>
              
    ) 
  }
}

const styles = StyleSheet.create({
  sectionContainer:{
    flex: 1,
  }, 
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
