/* eslint-disable no-debugger */
import { FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CSSProperties } from '@mui/styled-engine';
import { Box } from '@mui/system';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './setDataForm.css';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const queryString = require('query-string');

const countOptions = (amount: number, incremet: number) => {
  const arrayOfAmount: Array<number> = [];
  for (let index = amount; index < (amount + incremet); index += 1) {
    arrayOfAmount.push(index);
  }
  const finallArray = arrayOfAmount.map((el) => <MenuItem key={el} value={el}>{el}</MenuItem>);
  return finallArray;
};

const allYears = countOptions(2023, 100);
const allMonth = countOptions(1, 12);
const allDays = countOptions(1, 31);
const allHours = countOptions(0, 25);

export const SetDataForm: React.FC = () => {
  const history = useHistory();
  const data: DataType = queryString.parse(history.location.search.substr(1));
  const [year, setYear] = useState<string>('2023');
  const [month, setMonth] = useState<string>('1');
  const [day, setDay] = useState<string>('1');
  const [hour, setHour] = useState<string>('0');

  const cellStyles = {
    marginRight: 5,
    color: 'white',
    borderColor: '1px solid  white',
    '& .MuiSelect-iconFilled': {
      color: 'white',
    },
  };

  return (
    <div>
      <h1>Your Date</h1>
      <Formik
        initialValues={{}}
        onSubmit={() => {
          history.push({
            pathname: '/count',
            search: `?Y=${year}&M=${month}&D=${day}&H=${hour}`,
          });
        }}
      >
        {() => (
          <Box sx={{ minWidth: 0 }}>
            <Form>
              <FormControl size="small" margin="normal" sx={{ flexDirection: 'row' }}>
                <Select
                  variant="filled"
                  sx={cellStyles}
                  value={year}
                  onChange={(e: SelectChangeEvent) => setYear(e.target.value)}
                >
                  {allYears}
                </Select>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  variant="filled"
                  sx={cellStyles}
                  value={month}
                  onChange={(e: SelectChangeEvent) => setMonth(e.target.value)}
                >
                  {allMonth}
                </Select>
                <Select
                  variant="filled"
                  sx={cellStyles}
                  value={day}
                  onChange={(e: SelectChangeEvent) => setDay(e.target.value)}
                >
                  {allDays}
                </Select>
                <Select
                  variant="filled"
                  sx={cellStyles}
                  value={hour}
                  onChange={(e: SelectChangeEvent) => setHour(e.target.value)}
                >
                  {allHours}
                </Select>
                <button type="submit">Set Date</button>
              </FormControl>
            </Form>
          </Box>
        )}
      </Formik>
    </div>
  );
};

type IValueProps = {
  year: string
  month: string
  day: string
  hour: string
}

type DataType = {
  Y: string,
  M: string,
  D: string,
  H: string,
}
