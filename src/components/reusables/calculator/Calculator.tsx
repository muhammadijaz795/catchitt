import * as math from 'mathjs';
import React, { useState } from 'react';
import backspaceIcon from '../../../assets/backspaceIcon.png';
import './calculator.css';

export default function Calculator() {
    const [result, setResult] = useState<string>('');
    const [selectedOperator, setSelectedOperator] = useState<string>('');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const buttonName = e.currentTarget.getAttribute('name') || '';

        if (isNaN(Number(buttonName))) {
            // If an operator button is clicked
            if (selectedOperator && selectedOperator !== buttonName) {
                // If a different operator is already selected, update the selected operator
                setSelectedOperator(buttonName);
                setResult(result.slice(0, -1).concat(buttonName));
            } else if (!selectedOperator) {
                // Otherwise, select the operator and append it to the result
                setSelectedOperator(buttonName);
                setResult(result.concat(buttonName));
            }
        } else {
            // If a number button is clicked
            if (selectedOperator) {
                // If an operator is already selected, append the number to the result after the operator
                if (result.slice(-1) === selectedOperator) {
                    setResult(result.concat(buttonName));
                } else {
                    setResult(result + selectedOperator + buttonName);
                }
                setSelectedOperator('');
            } else {
                // Otherwise, simply append the number to the result
                setResult(result.concat(buttonName));
            }
        }
    };


    const clear = () => {
        setResult('');
        setSelectedOperator('');
    };

    const backspace = () => {
        setResult(result.slice(0, -1));
        setSelectedOperator('');
    };

    const calculate = () => {
        try {
            setResult(math.evaluate(result).toString());
            setSelectedOperator('');
        } catch (err) {
            setResult('Error');
        }
    };

    return (
        <div className="container">
            <form>
                <div style={{ marginBottom: '32px' }}>
                    <input className="calculatorInput" type="text" value={result} />
                    <p className='priceRangeText'>30 - 2,500,000</p>
                </div>
            </form>
            <div className='frame'>
                <div className="keypad">
                    <div className='numbersDiv'>
                        <button name="1" onClick={handleClick}>
                            1
                        </button>
                        <button name="2" onClick={handleClick}>
                            2
                        </button>
                        <button name="3" onClick={handleClick}>
                            3
                        </button>
                        <button name="4" onClick={handleClick}>
                            4
                        </button>
                        <button name="5" onClick={handleClick}>
                            5
                        </button>
                        <button name="6" onClick={handleClick}>
                            6
                        </button>
                        <button name="7" onClick={handleClick}>
                            7
                        </button>
                        <button name="8" onClick={handleClick}>
                            8
                        </button>
                        <button name="9" onClick={handleClick}>
                            9
                        </button>
                    </div>

                    <div className='longColumn'>
                        <button className="highlight" onClick={backspace} id="backspace">
                            <img src={backspaceIcon} alt='' style={{
                                width: '24px',
                                height: '24px'
                            }} />
                        </button>
                        <div>
                            <button name="0" onClick={handleClick} style={{ height: '113px' }}>
                                0
                            </button>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}
