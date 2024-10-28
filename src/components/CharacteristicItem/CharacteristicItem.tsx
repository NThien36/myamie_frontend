interface CharacteristicItemProps {
  text: string;
}

function CharacteristicItem({ text }: CharacteristicItemProps) {
  return (
    <div className="py-1 px-3 rounded-full border-2 border-gray-300">
      {text}
    </div>
  );
}

export default CharacteristicItem;
