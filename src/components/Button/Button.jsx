import style from './Button.module.scss';

const Button = (props) => {
  return (
    <button className={style.btn} onClick={props.onClick}>
      Send
    </button>
  );
};

export default Button;