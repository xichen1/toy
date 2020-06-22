const calculator = document.querySelector('.calculator')
const result = document.querySelector('.calculator__display')
result.textContent = 0

calculator.addEventListener('click', e => {
    if (e.target.matches('button')){
        const key = e.target;
        const action = key.dataset.action
        const keyvalue = key.textContent
        const resultvalue = result.textContent

        if (!action) {

            if (resultvalue === "0" || calculator.dataset.previousKeyType === 'operator') {
                result.textContent = keyvalue
            } else {
                result.textContent = resultvalue + keyvalue
            }
        }
        if (action === 'decimal' && resultvalue.substr(-1) !== '.') {
            result.textContent = resultvalue + '.'
        }
        if (action === 'add' || action === 'subtract' ||
            action === 'multiply' || action === 'divide') {
                key.classList.add('is-depressed')
                calculator.dataset.previousKeyType = 'operator'
                calculator.dataset.firstValue = resultvalue
                calculator.dataset.operator = action
        }
        if (action === 'calculate') {
            const secondValue = resultvalue
            const operator = calculator.dataset.operator
            const firstValue = calculator.dataset.firstValue

            result.textContent = calculate(firstValue, operator, secondValue)
        }
        Array.from(key.parentNode.children)
        .forEach(k => k.classList.remove('is-depressed'))
    }
})

const calculate = (n1, operator, n2) => {
    let result = ''
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result;
}