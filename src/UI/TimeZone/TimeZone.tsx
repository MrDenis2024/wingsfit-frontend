import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TimezoneSelect, { ITimezone } from "react-timezone-select";

const TimeZone: React.FC = () => {
  const [timezone, setTimezone] = useState<ITimezone>({ value: "", label: "" });

  return (
    <Box sx={{ width: 300, margin: "0 auto", textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Select Timezone
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TimezoneSelect value={timezone} onChange={(tz) => setTimezone(tz)} />
      </Box>
    </Box>
  );
};

export default TimeZone;
