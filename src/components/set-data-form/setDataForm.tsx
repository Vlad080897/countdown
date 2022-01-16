/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Field, Form, Formik,
} from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import s from './setDataForm.module.css';

const queryString = require('query-string');

const countOptions = (amount: number, incremet: number) => {
  const arrayOfAmount: Array<number> = [];
  for (let index = amount; index < (amount + incremet); index += 1) {
    arrayOfAmount.push(index);
  }
  const finallArray = arrayOfAmount.map((year) => <option value={year}>{year}</option>);
  return finallArray;
};

const allYears = countOptions(2023, 100);
const allMonth = countOptions(1, 12);
const allDays = countOptions(1, 31);
const allHours = countOptions(0, 25);

export const SetDataForm: React.FC = () => {
  const history = useHistory();
  const data = queryString.parse(history.location.search.substr(1));
  return (
    <div>
      <h1>Your Date</h1>
      <Formik
        initialValues={{
          year: history.location.search.length === 0 ? '2023' : data.Y,
          month: history.location.search.length === 0 ? '0' : data.M,
          day: history.location.search.length === 0 ? '1' : data.D,
          hour: history.location.search.length === 0 ? '00' : data.H,
        }}
        onSubmit={(values: IValueProps) => {
          history.push({
            pathname: '/count',
            search: `?Y=${values.year}&M=${values.month}&D=${values.day}&H=${values.hour}`,
          });
        }}
      >
        {() => (
          <Form>
            <div className={s.data_form_container}>
              <div>
                <Field as="select" name="year">
                  {allYears}
                </Field>
                <br />
                <span>Year</span>
              </div>
              <div>
                <Field as="select" name="month">
                  {allMonth}
                </Field>
                <br />
                <span>Month</span>
              </div>
              <div>
                <Field as="select" name="day">
                  {allDays}
                </Field>
                <br />
                <span>Day</span>
              </div>
              <div>
                <Field as="select" name="hour">
                  {allHours}
                </Field>
                <br />
                <span>Hour</span>
              </div>
              <div>
                <button type="submit">Set Date</button>
              </div>
            </div>
          </Form>
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
