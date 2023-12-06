"use client"

import React, { useState, useEffect } from 'react';
const AutocompleteInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState(["Aluno 1", "Aluno 2", "Aluno 3"]); // Exemplo de opções
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (inputValue) {
      const filtered = options.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
      setShowOptions(true);
    } else {
      setShowOptions(false);
    }
  }, [inputValue, options]);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleOptionClick = (option: any) => {
    setInputValue(option);
    setShowOptions(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="input input-bordered w-full"
        placeholder="Digite para buscar um aluno..."
      />
      {showOptions && (
        <div className="absolute w-full bg-base-300 border border-gray-300 mt-4 max-h-60 overflow-auto rounded-lg">
          {filteredOptions.map((option, index) => (
            <div
              key={index}
              className="p-2 hover:bg-base-100 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AutocompleteInput