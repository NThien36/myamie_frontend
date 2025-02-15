interface CharacteristicItemProps {
  text: string;
  onRemove?: () => void;
}

function CharacteristicItem({ text, onRemove }: CharacteristicItemProps) {
  return (
    <div className="break-all py-1 px-3 rounded-full border-2 border-gray-300">
      {text}
      {onRemove && (
        <button type="button" className="ml-3 text-red-500" onClick={onRemove}>
          <i className="fa-solid fa-trash"></i>
        </button>
      )}
    </div>
  );
}

export default CharacteristicItem;
