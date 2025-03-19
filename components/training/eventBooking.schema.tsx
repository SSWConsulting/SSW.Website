import { utcDateToHoursMinutes } from "@/services/client/date.service";
import React, { useState } from "react";

export const TimePicker = ({ input, defaultValue }) => {
  const { onChange, value: inputValue, ...props } = input;
  const [value, setValue] = useState(
    inputValue ? utcDateToHoursMinutes(inputValue) : defaultValue
  );
  return (
    <input
      className="focus:shadow-outline block w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-base text-gray-600 shadow-inner transition-all duration-150 ease-out placeholder:text-gray-300 focus:border-blue-500 focus:text-gray-900 focus:outline-none"
      value={value}
      {...props}
      onChange={(e) => {
        setValue(e.target.value);
        const time = e.target.value.split(":");
        const hours = time[0];
        const minutes = time[1];
        const date = new Date(
          Date.UTC(0, 0, 0, Number(hours), Number(minutes))
        ).toISOString();
        onChange(date);
      }}
      type="time"
    />
  );
};
