import React from 'react'
import ReactDOM from 'react-dom'

import './style.scss'
import './darkmode.scss'
import './mediaqueries.scss'

const operators = ['+a', '-m', '/d', '*p']
const ops = ['+', '-', '/', '*']
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

class CalculatorApp extends React.Component {
  constructor(props) {
    super(props)
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
    this.state = {
      currentOperandText: '',
      previousOperandText: '',
    }
  }

  toggle = () => {
    document.body.classList.toggle('dark')
  }

  updateDisplay = () => {
    if (this.operation != null) {
      this.setState({
        currentOperandText: this.getDisplayNumber(this.currentOperand),
        previousOperandText: `${this.getDisplayNumber(this.previousOperand)} ${
          this.operation
        }`,
      })
    } else {
      this.setState({
        currentOperandText: this.getDisplayNumber(this.currentOperand),
        previousOperandText: '',
      })
    }
  }

  compute = () => {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+': {
        computation = prev + current
        break
      }
      case '-': {
        computation = prev - current
        break
      }
      case '*': {
        computation = prev * current
        break
      }
      case '/': {
        computation = prev / current
        break
      }
      default: {
        return
      }
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  handleClick = (e) => {
    const { innerText } = e.target
    if (!isNaN(parseFloat(innerText)) || innerText === '.') {
      if (innerText === '.' && this.currentOperand.includes('.')) {
        return
      }
      this.currentOperand =
        this.currentOperand.toString() + innerText.toString()
      this.updateDisplay()
    }
    if (innerText === 'AC') {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
      this.updateDisplay()
    }
    if (ops.includes(innerText)) {
      if (this.currentOperand === '') {
        return
      }
      if (this.previousOperand !== '') {
        this.compute()
      }
      this.operation = innerText
      this.previousOperand = this.currentOperand
      this.currentOperand = ''
      this.updateDisplay()
    }
    if (innerText === '=') {
      this.compute()
      this.updateDisplay()
    }
    if (innerText === 'C') {
      this.delete()
      this.updateDisplay()
    }
  }

  render() {
    return (
      <>
        <main>
          <div className='toggle-dark'>
            <input
              onChange={this.toggle}
              type='checkbox'
              className='checkbox'
              id='checkbox'
            ></input>
            <label htmlFor='checkbox' className='label'>
              <i className='fas fa-moon'></i>

              <i className='fas fa-sun'></i>

              <div className='ball'></div>
            </label>
          </div>

          <div className='calculator-container' id='calculator'>
            <div className='btn-grid'>
              <div className='display'>
                <div className='result-display'>
                  {this.state.previousOperandText}
                </div>
                <div className='input-display'>
                  {this.state.currentOperandText}
                </div>
              </div>
              <button onClick={this.handleClick} className='btn' id='idC'>
                C
              </button>
              <button onClick={this.handleClick} className='btn' id='idAC'>
                AC
              </button>
              {operators.map((operator) => {
                return (
                  <button
                    className='btn operator'
                    id={`id${operator[1]}`}
                    key={`id${operator[1]}`}
                    onClick={this.handleClick}
                  >
                    {operator[0]}
                  </button>
                )
              })}
              <button onClick={this.handleClick} className='btn' id='ide'>
                =
              </button>
              <div className='numbers'>
                {numbers.map((number) => {
                  return (
                    <button
                      className='btn number'
                      id={`id${number}`}
                      key={`id${number}`}
                      onClick={this.handleClick}
                    >
                      {number}
                    </button>
                  )
                })}
                <button className='btn' id='dot' onClick={this.handleClick}>
                  .
                </button>
              </div>
            </div>
          </div>
        </main>
      </>
    )
  }
}

ReactDOM.render(<CalculatorApp />, document.getElementById('root'))
