import { useState } from 'react';

type TextInputType = {
  initialValue: string;
  onSaveTitle: (param: string) => void;
  placeholder: string;
};

export default function TextInput({
  initialValue,
  onSaveTitle,
  placeholder,
}: TextInputType) {
  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(!initialValue);

  function saveTitle() {
    if (value) {
      onSaveTitle(value);
      setIsEditing(false);
    }
  }

  return isEditing ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        saveTitle();
      }}
    >
      <input
        onBlur={saveTitle}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="bg-gray-50 dark:bg-gray-600 p-1 rounded w-10/12 dark:text-white"
      />
    </form>
  ) : (
    <button
      onClick={() => setIsEditing(true)}
      type="button"
      className="p-1 w-full text-left dark:text-white"
    >
      {value}
    </button>
  );
}
