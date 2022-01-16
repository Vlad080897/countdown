import React from 'react';
import clock from '../images/chronometer.png';
import s from './App.module.css';
import CountDown from './countDown/countDown';
import { SetDataForm } from './set-data-form/setDataForm';

const App = () => (
  <div className={s.timer_container}>
    <div><img src={clock} alt="" /></div>
    <div>
      <span>Countdown Timer</span>
      <br />
      <span>Conutdown Timet to any date or action</span>
      <br />
      <SetDataForm />
    </div>
    <div className={s.timer}>
      <CountDown />
    </div>
  </div>
);

export default App;
