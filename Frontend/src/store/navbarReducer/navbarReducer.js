const initialState = {
  navbarList: [
    { name: 'Login', href: '/login', requiredAuth: false },
    { name: 'Profile', href: '/profile', requiredAuth: true, dynamic: true },
    { name: 'Messages', href: '/dialogs', requiredAuth: true, dynamic: true },
    { name: 'Anime', href: '/', requiredAuth: false, public: true },
  ],
};

const navbarReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};

export default navbarReducer;
