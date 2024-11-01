import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import TimezoneSelect, { ITimezoneOption } from "react-timezone-select";

interface Props {
  changeTimezone: (timezone: string) => void;
  name: string;
}

const TimeZone: React.FC<Props> = ({ changeTimezone, name }) => {
  const [timezone, setTimezone] = useState<ITimezoneOption>({
    value: "",
    label: "",
  });

  const onChange = (tz: ITimezoneOption) => {
    setTimezone(tz);
    changeTimezone(tz.label);
  };

  return (
    <Box sx={{ width: 300, margin: "0 auto", textAlign: "center" }}>
      <Typography variant="h6" gutterBottom>
        Select Timezone
      </Typography>
      <Box sx={{ mt: 2 }}>
        <TimezoneSelect name={name} value={timezone} onChange={onChange} />
      </Box>
    </Box>
  );
};

export default TimeZone;
