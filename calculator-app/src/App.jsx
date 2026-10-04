import { useEffect, useState } from 'react'

function App() {
  const [display, setDisplay] = useState('0')
  const [firstNumber, setFirstNumber] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForNumber, setWaitingForNumber] = useState(false)

  const handleNumber = (number) => {
    if (display === 'Error' || waitingForNumber) {
      setDisplay(number)
      setWaitingForNumber(false)
    } else if (display === '0') {
      setDisplay(number)
    } else {
      setDisplay(display + number)
    }
  }

  const handleOperator = (selectedOperator) => {
    const currentNumber = Number(display)

    if (display === 'Error') return

    if (firstNumber === null) {
      setFirstNumber(currentNumber)
    }

    setOperator(selectedOperator)
    setWaitingForNumber(true)
  }

  const calculate = () => {
    if (firstNumber === null || operator === null) return

    const secondNumber = Number(display)
    let result

    switch (operator) {
      case '+':
        result = firstNumber + secondNumber
        break
      case '-':
        result = firstNumber - secondNumber
        break
      case '×':
        result = firstNumber * secondNumber
        break
      case '÷':
        if (secondNumber === 0) {
          setDisplay('Error')
          setFirstNumber(null)
          setOperator(null)
          return
        }
        result = firstNumber / secondNumber
        break
      default:
        return
    }

    setDisplay(String(result))
    setFirstNumber(null)
    setOperator(null)
    setWaitingForNumber(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setFirstNumber(null)
    setOperator(null)
    setWaitingForNumber(false)
  }

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key

      if (key >= '0' && key <= '9') {
        handleNumber(key)
      } else if (key === '+') {
        handleOperator('+')
      } else if (key === '-') {
        handleOperator('-')
      } else if (key === '*') {
        handleOperator('×')
      } else if (key === '/') {
        event.preventDefault()
        handleOperator('÷')
      } else if (key === 'Enter' || key === '=') {
        calculate()
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        handleClear()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  const buttons = [
    {
      label: 'C',
      action: handleClear,
      style: 'bg-red-500 hover:bg-red-600 text-white',
    },
    {
      label: '÷',
      action: () => handleOperator('÷'),
      style: 'bg-gray-300 hover:bg-gray-400 text-gray-900',
    },
    {
      label: '×',
      action: () => handleOperator('×'),
      style: 'bg-gray-300 hover:bg-gray-400 text-gray-900',
    },
    {
      label: '7',
      action: () => handleNumber('7'),
      style: 'bg-gray-100 hover:bg-gray-200',
    },
    {
      label: '8',
      action: () => handleNumber('8'),
      style: 'bg-gray-100 hover:bg-gray-200',
    },
    {
      label: '9',
      action: () => handleNumber('9'),
      style: 'bg-gray-100 hover:bg-gray-200',
    },
    {
      label: '−',
      action: () => handleOperator('-'),
      style: 'bg-gray-300 hover:bg-gray-400 text-gray-900',
    },
    {
      label: '4',
      action: () => handleNumber('4'),
      style: 'bg-gray-100 hover:bg-gray-200',
    },
    {
      label: '5',
      action: () => handleNumber('5'),
      style: 'bg-gray-100 hover:bg-gray-200',
    },
    {
      label: '6',
      action: () => handleNumber('6'),
      style: 'bg-gray-100 hover:bg-gray-200',
    },
    {
      label: '+',
      action: () => handleOperator('+'),
      style: 'bg-gray-300 hover:bg-gray-400 text-gray-900',
    },
    {
      label: '1',
      action: () => handleNumber('1'),
      style: 'bg-gray-100 hover:bg-gray-200',
    },
    {
      label: '2',
      action: () => handleNumber('2'),
      style: 'bg-gray-100 hover:bg-gray-200',
    },
    {
      label: '3',
      action: () => handleNumber('3'),
      style: 'bg-gray-100 hover:bg-gray-200',
    },
    {
      label: '0',
      action: () => handleNumber('0'),
      style: 'bg-gray-100 hover:bg-gray-200 col-span-3',
    },
    {
      label: '=',
      action: calculate,
      style: 'bg-blue-600 hover:bg-blue-700 text-white row-span-2',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-md">

        {/* Title */}
        <div className="text-center mb-5">
          <h1 className="text-3xl font-bold text-gray-800">
            Calculator
          </h1>
          <p className="text-gray-500 mt-1">
            Simple React Calculator
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-6">

          {/* Display */}
          <div
            className="bg-gray-900 text-white rounded-2xl p-5 mb-5 text-right"
            aria-live="polite"
          >
            <div className="text-sm text-gray-400 mb-2">
              {operator ? `Operator: ${operator}` : 'Ready'}
            </div>

            <div className="text-4xl sm:text-5xl font-bold overflow-x-hidden">
              {display}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-3">

            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={button.action}
                className={`${button.style} ${button.label === 'C' ? 'col-span-2' : ''} rounded-xl p-4 sm:p-5 text-xl font-bold shadow-sm active:scale-95 transition-transform`}
              >
                {button.label}
              </button>
            ))}

          </div>

          {/* Instructions */}
          <div className="mt-6 border-t pt-5">

            <h2 className="text-lg font-bold text-gray-800 mb-3">
              User Guide
            </h2>

            <div className="text-sm text-gray-600 space-y-1">
              <p>• Enter a number using the buttons.</p>
              <p>• Choose +, −, ×, or ÷.</p>
              <p>• Enter another number.</p>
              <p>• Press = to get the result.</p>
              <p>• Press C to reset the calculator.</p>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              <strong>Keyboard:</strong> You can also use your keyboard
              for numbers and operations.
            </p>

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-400 mt-4">
          Built with React & Tailwind CSS
        </p>

      </div>
    </div>
  )
}

export default App