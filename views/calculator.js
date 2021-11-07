class Calculator {
    constructor(
        previousElement , currentElement
    ) {
        this.previousElement = previousElement,
        this.currentElement = currentElement
    }

    clear(){
        this.previousElement = '',
        this.currentElement = ''
        this.operation = undefined

    }
    delete(){

    }
    appendNumber(number){
        this.currentElement = number
    }
    chooseOperation(operation){

    }
    updateDisplay(){
        this.currentElement.innerText = this.currentElement
    }

}


const calculator = new Calculator(previousElement,currentElement)

numberButtons.forEach(button => {
    button.addEventListener('click',() => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})






const numberButtons = document.querySelectorAll('number-button')
const operatorButtons = document.querySelectorAll('operator-button')
const deleteButton = document.querySelector('delete-button')
const allClearButton = document.querySelector('all-clear-button')
const equalsButton = document.querySelector('equal-button')
const previousElement = document.querySelector('data-previous-element')
const currentElement = document.querySelector('data-current-element')
