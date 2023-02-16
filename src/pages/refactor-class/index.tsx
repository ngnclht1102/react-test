import React from 'react';
import TextInput from './components/input';
import useLogin from './hooks/useLogin';

export default function RefactorLogin() {
  const { handleSubmit, password, setPassword, username, setUsername } = useLogin();

  return (
    <div data-cy="container" className="container mx-auto w-4/5 mt-6">
      <form onSubmit={handleSubmit}>
        <h1 data-cy="title">Login</h1>
        <div>
          {' '}
          <TextInput
            name="email"
            type="text"
            placeholder="your-email@email.com"
            onChange={setUsername}
            value={username}
          />
          <TextInput
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={setPassword}
            value={password}
          />
        </div>
        <button data-cy="submit" type="submit">Login</button>
      </form>
    </div>
  );
}
