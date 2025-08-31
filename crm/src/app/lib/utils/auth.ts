export const logoutUser = () => {
  try {
    // Очистка токена в localStorage / sessionStorage
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');

    // Очистка cookies (если используешь JWT в HTTP-only куках, это нужно делать на сервере)
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    // Можно очистить состояние пользователя в глобальном store (если используешь Zustand, Redux и т.д.)
    // store.setState({ user: null, isAuthenticated: false });

    console.log('User logged out successfully');
  } catch (error) {
    console.error('Logout error:', error);
  }
};
