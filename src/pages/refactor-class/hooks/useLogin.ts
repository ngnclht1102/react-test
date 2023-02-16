import { useCallback, useEffect, useState } from 'react';

export default function useLogin() {
  const [password, setPassword] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const handleSubmit = useCallback(() => {
    if (!username || !password) {
      alert('You have not entered username and password yet');
      return;
    }
    alert('Login submitted: ' + username + ', ' + password);
  }, [username, password]);

  useEffect(() => {
    const timer = setTimeout(() => {
      alert('Do you need help?');
    }, 5000);
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return {
    password,
    setPassword,
    username,
    setUsername,
    handleSubmit,
  };
}
