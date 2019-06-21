import React, { useState, useCallback } from 'react';
import { HuePicker } from 'react-color';

export const ColorPicker: React.FC<{ initialValue: any; onChange: (any) => void }> = ({
  initialValue,
  onChange,
}) => {
  const [color, setColor] = useState(initialValue);

  const handleChange = useCallback(
    (color) => {
      onChange(color);
      setColor(color);
    },
    [onChange]
  );

  return <HuePicker color={color} onChangeComplete={handleChange} width="150" />;
};
