import React, { useState, useEffect } from "react";
import { Box, Select, MenuItem, SelectChangeEvent, InputLabel } from "@mui/material";
import { CourseTypeFields } from "../../types/courseTypes.ts";
import TagCard from "../TagCard/TagCard.tsx";

interface Props {
  courseTypes: CourseTypeFields[];
  onChange: (courseTypes: string[]) => void;
  value: string[];
  onRemove: (courseType: string) => void;
}

const CourseTypeSelector: React.FC<Props> = ({ courseTypes, onChange, value, onRemove }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(value);

  useEffect(() => {
    setSelectedTypes(value);
  }, [value]);

  const handleAddType = (event: SelectChangeEvent) => {
    const selectedId = event.target.value;
    const selectedType = courseTypes.find((type) => type._id === selectedId);

    if (selectedType) {
      const updatedTypes = [...selectedTypes, selectedType._id];
      setSelectedTypes(updatedTypes);
      onChange(updatedTypes);
    }
  };

  const handleRemoveType = (type: string) => {
    const updatedTypes = selectedTypes.filter((t) => t !== type);
    setSelectedTypes(updatedTypes);
    onChange(updatedTypes); // Передаем обновленный список в родительский компонент
    onRemove(type); // Дополнительно вызываем onRemove, если это требуется
  };

  const availableTypes = courseTypes.filter((type) => !selectedTypes.includes(type._id));

  return (
    <Box>
      <InputLabel id="select-course-types-label">Course types</InputLabel>
      <Select
        labelId="select-course-types-label"
        value=""
        onChange={handleAddType}
        fullWidth
        variant="outlined"
      >
        <MenuItem value="" disabled>
          Select course types
        </MenuItem>
        {availableTypes.map((type) => (
          <MenuItem key={type._id} value={type._id}>
            {type.name}
          </MenuItem>
        ))}
      </Select>
      <Box mt={2} display="flex" flexWrap="wrap" gap={2} alignItems="center">
        {selectedTypes.map((type) => (
          <TagCard
            key={type}
            courseType={type}
            onRemove={() => handleRemoveType(type)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CourseTypeSelector;
