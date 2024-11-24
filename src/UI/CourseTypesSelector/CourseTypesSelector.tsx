import React, { useState } from "react";
import {Box, Select, MenuItem, SelectChangeEvent, InputLabel} from "@mui/material";
import {CourseTypeFields} from "../../types/courseTypes.ts";
import TagCard from "../TagCard/TagCard.tsx";

interface Props {
  courseTypes: CourseTypeFields[];
  onChange: (courseTypes: CourseTypeFields[]) => void;
}

const CourseTypeSelector: React.FC<Props> = ({ courseTypes, onChange }) => {
  const [selectedTypes, setSelectedTypes] = useState<CourseTypeFields[]>([]); // Храним добавленные типы

  const handleAddType = (event: SelectChangeEvent) => {
    const selectedId = event.target.value;
    const selectedType = courseTypes.find((type) => type._id === selectedId);

    if (selectedType) {
      setSelectedTypes((prev) => [...prev, selectedType]);
      onChange([...selectedTypes, selectedType]);
    }
  };

  const handleRemoveType = (typeId: string) => {
    setSelectedTypes((prev) => prev.filter((type) => type._id !== typeId));
    onChange([...selectedTypes.filter((type) => type._id !== typeId)]);
  };

  const availableTypes = courseTypes.filter((type) => {
    return !selectedTypes.some((selected) => selected._id === type._id);
  });

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
          <MenuItem
            key={type._id}
            value={type._id}
          >
            {type.name}
          </MenuItem>
        ))}
      </Select>
      <Box
        mt={2}
        display="flex"
        flexWrap="wrap"
        gap={2}
        alignItems="center"
      >
        {selectedTypes.map((type) => (
          <TagCard
            key={type._id}
            courseType={type}
            onRemove={handleRemoveType}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CourseTypeSelector;