import { renderHook, act } from '@testing-library/react-hooks';
import useLogin from '@pages/refactor-class/hooks/useLogin';
jest.setTimeout(6000);

test('useLogin should return correct initial state', () => {
  const { result } = renderHook(() => useLogin());
  expect(result.current.password).toBe('');
  expect(result.current.username).toBe('');
  expect(typeof result.current.setPassword).toBe('function');
  expect(typeof result.current.setUsername).toBe('function');
  expect(typeof result.current.handleSubmit).toBe('function');
});

test('useLogin should show alert after timeout', async () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation();
  const { result } = renderHook(() => useLogin());
  await new Promise((r) => setTimeout(r, 5100));
  expect(alertMock).toHaveBeenCalledTimes(1);
});
