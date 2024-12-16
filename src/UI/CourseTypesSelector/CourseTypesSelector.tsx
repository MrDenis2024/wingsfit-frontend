import React, { useState, useEffect } from "react";
import {
  Box,
  Select,
  MenuItem,
  SelectChangeEvent,
  InputLabel,
} from "@mui/material";
import { CourseTypeFields } from "../../types/courseTypes.ts";
import TagCard from "../TagCard/TagCard.tsx";
import Grid from "@mui/material/Grid2";

interface Props {
  courseTypes: CourseTypeFields[];
  onChange: (courseTypes: string[]) => void;
  value: string[];
  onRemove: (courseType: string) => void;
  label: string;
}

const CourseTypeSelector: React.FC<Props> = ({
  courseTypes,
  onChange,
  value,
  onRemove,
  label,
}) => {
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

  const handleRemoveType = (typeId: string) => {
    const updatedTypes = selectedTypes.filter((type) => type !== typeId);
    setSelectedTypes(updatedTypes);
    onChange(updatedTypes);
    onRemove(typeId);
  };

  const availableTypes = courseTypes.filter(
    (type) => !selectedTypes.includes(type._id),
  );

  return (
    <Grid size={12}>
      <InputLabel
        id="select-course-types-label"
        sx={{ color: "white", fontWeight: "bold" }}
      >
        {label}
      </InputLabel>
      <Select
        labelId="select-course-types-label"
        value=""
        onChange={handleAddType}
        fullWidth
        variant="outlined"
        sx={{
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#44a9ca",
          },
          "& .MuiInputBase-input": {
            padding: "10px",
          },
        }}
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
    </Grid>
  );
};

export default CourseTypeSelector;
