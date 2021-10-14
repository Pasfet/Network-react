const initialState = {
  navbarList: [
    { name: 'Войти', href: '/login', requiredAuth: false, icon: 'login' },
    { name: 'Регистрация', href: '/signup', requiredAuth: false, icon: 'signup' },
    { name: 'Профиль', href: '/profile', requiredAuth: true, dynamic: true, icon: 'profile' },
    { name: 'Сообщения', href: '/dialogs', requiredAuth: true, dynamic: true, icon: 'messages' },
    { name: 'Аниме', href: '/', requiredAuth: false, public: true, icon: 'movie' },
  ],
};

const navbarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default navbarReducer;
