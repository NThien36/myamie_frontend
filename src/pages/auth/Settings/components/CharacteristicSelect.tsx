import IconBtn from "@/components/Buttons/IconBtn";
import CharacteristicItem from "@/components/CharacteristicItem/CharacteristicItem";
import { useState } from "react";

interface CharacteristicSelectProps {
  currentCharacteristics?: string[];
}

function CharacteristicSelect({
  currentCharacteristics,
}: CharacteristicSelectProps) {
  const [characteristics, setCharacteristics] = useState<string[]>(
    currentCharacteristics || []
  );

  const [inputValue, setInputValue] = useState<string>("");

  const handleAddCharacteristic = () => {
    if (
      inputValue.trim() && // Ensure input is not empty
      inputValue.length <= 20 && // Max 20 characters per characteristic
      !characteristics.includes(inputValue) && // No duplicates
      characteristics.length < 5
    ) {
      setCharacteristics([...characteristics, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveCharacteristic = (characteristic: string) => {
    setCharacteristics(
      characteristics.filter((item) => item !== characteristic)
    );
  };

  return (
    <div>
      <label className="mb-2 block font-medium">Tính cách (5)</label>
      <div className="border border-gray-200 rounded-full p-1 w-1/2 flex">
        <input
          type="text"
          className="w-full outline-none px-3"
          placeholder="Nhập tính cách"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.slice(0, 20))}
          readOnly={characteristics.length >= 5}
        />
        <IconBtn icon="fa-plus" onClick={handleAddCharacteristic} />
      </div>
      <div className="flex flex-wrap gap-2 mt-3">
        {characteristics.map((characteristic, index) => (
          <CharacteristicItem
            key={index}
            text={characteristic}
            onRemove={() => handleRemoveCharacteristic(characteristic)}
          />
        ))}
      </div>
    </div>
  );
}

export default CharacteristicSelect;
