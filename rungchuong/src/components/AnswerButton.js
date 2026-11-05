const AnswerButton = ({
  letter,
  option,
  selected,
  correct,
  disabled,
  revealed,
  hidden,
  onClick
}) => {
  let className = 'answer-button';

  if (selected && !revealed) {
    className += ' selected';
  }

  if (revealed && selected && correct) {
    className += ' correct';
  }

  if (revealed && selected && !correct) {
    className += ' incorrect';
  }

  if (revealed && correct) {
    className += ' correct';
  }

  return (
    <button
      className={className}
      disabled={disabled || hidden}
      onClick={onClick}
      style={hidden ? { visibility: 'hidden' } : {}}
    >
      <strong>{letter}.</strong> {option}
    </button>
  );
};

export default AnswerButton;