import React from 'react';
import useCounter from './hooks/useCounter';

export default function Counter() {
  const { counter, step, onDecrease, onIncrease, onSelectStep } = useCounter();
  return (
    <div data-cy="container" className="container mx-auto w-4/5 mt-6">
      <h2 data-cy="value">Current counter value: {counter}</h2>
      <br />
      <p>Select step of each Increment/Decrement</p>
      <select data-cy="selectStep" value={step} onChange={(e) => onSelectStep(e.target.value)}>
        <option data-cy="selectStep1" value="1">
          1
        </option>
        <option data-cy="selectStep5" value="5">
          5
        </option>
        <option data-cy="selectStep10" value="10">
          10
        </option>
      </select>
      <br />
      <br />
      <button data-cy="increaseBtn" onClick={onIncrease}>
        Click to increase by {step}
      </button>
      <button data-cy="decreaseBtn" onClick={onDecrease}>
        Click to decrease by {step}
      </button>
    </div>
  );
}
