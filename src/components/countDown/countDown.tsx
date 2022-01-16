/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import s from './countDown.module.css';

const queryString = require('query-string');

const CountDown: React.FC = () => {
  const history = useHistory();
  const data: dataType = queryString.parse(history.location.search.substr(1));

  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const date = new Date(
        Number(history.location.search.length !== 0 ? data.Y : '2023'),
        Number(history.location.search.length !== 0 ? data.M : '0'),
        Number(history.location.search.length !== 0 ? data.D : '1'),
        Number(history.location.search.length !== 0 ? data.H : '0'),
      );
      const currentDate = new Date();
      const distance = date.getTime() - currentDate.getTime();

      setDays(Math.floor((distance / (60 * 60 * 24 * 1000))));
      setHours(Math.floor(distance % (60 * 60 * 24 * 1000) / (1000 * 60 * 60)));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return (() => clearTimeout(timeoutId));
  }, [days, hours, minutes, seconds, data, history]);

  return (
    <div className={s.count_down}>
      <div>
        <div>
          {days}
          <br />
          <span>Days</span>
        </div>
        :
        <div>
          {hours}
          <br />
          <span>Hours</span>
        </div>
        :
        <div>
          {minutes}
          <br />
          <span>Minutes</span>
        </div>
        :
        <div>
          {seconds}
          <br />
          <span>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default CountDown;

type dataType = {
  Y: string,
  M: string,
  D: string,
  H: string
}
