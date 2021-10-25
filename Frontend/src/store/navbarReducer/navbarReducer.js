const initialState = {
  navbarList: [
    { name: 'Войти', href: '/login', requiredAuth: false, dynamic: false, icon: 'login' },
    { name: 'Регистрация', href: '/signup', requiredAuth: false, dynamic: false, icon: 'signup' },
    { name: 'Профиль', href: '/profile', requiredAuth: true, dynamic: true, icon: 'profile' },
    { name: 'Друзья', href: '/friends', requiredAuth: true, dynamic: true, icon: 'friends' },
    { name: 'Все пользователи', href: '/users', requiredAuth: true, dynamic: false, icon: 'users' },
    { name: 'Сообщения', href: '/dialogs', requiredAuth: true, dynamic: true, icon: 'messages' },
    { name: 'Новости', href: '/', requiredAuth: false, public: true, dynamic: false, icon: 'news' },
  ],
};

const navbarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default navbarReducer;
