import style from './Button.module.scss';

const Button = ({ onClick }) => {
  return (
    <button className={style.btn} onClick={onClick}>
      Send
    </button>
  );
};

export default Button;