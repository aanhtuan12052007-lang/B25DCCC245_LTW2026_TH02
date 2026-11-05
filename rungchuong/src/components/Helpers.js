const Helpers = ({
  usedHelpers,
  onRemoveOption,
  onAddTime,
  onLifebuoy
}) => {
  return (
    <div className="helpers">
      <button
        onClick={onRemoveOption}
        disabled={usedHelpers.removeOption}
      >
        Loại 1 đáp án
      </button>

      <button
        onClick={onAddTime}
        disabled={usedHelpers.addTime}
      >
        Thêm 15 giây
      </button>

      <button
        onClick={onLifebuoy}
        disabled={usedHelpers.lifebuoy}
      >
        {usedHelpers.lifebuoy ? 'Phao đang bật' : 'Phao cứu sinh'}
      </button>
    </div>
  );
};

export default Helpers;