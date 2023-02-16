import React from 'react';

type TextInputProps = {
  name: string;
  type: 'text' | 'password';
  placeholder: string;
  onChange: (newVal: string) => void;
  value: string;
};

export default function TextInput(props: TextInputProps) {
  return (
    <div data-testid="wrapper" data-cy={`textinput_${props.name}`}>
      <input
        data-testid="input"
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange(e.target.value)}
        value={props.value}
      />
    </div>
  );
}
