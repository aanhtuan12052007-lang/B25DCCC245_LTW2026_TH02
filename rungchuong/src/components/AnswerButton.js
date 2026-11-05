const AnswerButton = ({
  letter,
  option,
  selected,
  correct,
  disabled,
  revealed,
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
      disabled={disabled}
      onClick={onClick}
    >
      <strong>{letter}.</strong> {option}
    </button>
  );
};

export default AnswerButton;