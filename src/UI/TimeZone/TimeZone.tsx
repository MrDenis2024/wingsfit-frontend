import React, { useState } from "react";
import TimezoneSelect, { ITimezoneOption } from "react-timezone-select";
import Grid from "@mui/material/Grid2";

interface Props {
  changeTimezone: (timezoneValue: string, timezoneLabel: string) => void;
  name: string;
  value: { value: string; label: string };
}

const TimeZone: React.FC<Props> = ({ changeTimezone, name, value }) => {
  const [timezone, setTimezone] = useState<ITimezoneOption>(value);

  const onChange = (tz: ITimezoneOption) => {
    setTimezone(tz);
    changeTimezone(tz.value, tz.label);
  };

  return (
    <Grid>
      <TimezoneSelect
        placeholder={"Time zone"}
        required
        name={name}
        value={timezone}
        onChange={onChange}
      />
    </Grid>
  );
};

export default TimeZone;
