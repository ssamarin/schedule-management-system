import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import styled from 'styled-components';

import {
  daysOfTheWeekFetching,
  daysOfTheWeekFetched,
  daysOfTheWeekFetchingError,
  employeesFetching,
  employeesFetched,
  employeesFetchingError,
  employeeDeleted,
} from './tableSlice';
import useHttp from '../../hooks/http.hook';

import AddForm from '../ EmployeeAddForm';

import user from '../../assets/icons/table/userDriverTable.svg';
import more from '../../assets/icons/table/more.svg';

function Table() {
  const Wrapper = styled.table`
  width: 100%;
  border-radius: 12px;

  table,
  td,
  tr {
    border: 1px solid #b8c4db;
    border-collapse: collapse;
  }

  td {
    width: 28px;
    height: 35px;
    padding: 4px;
    color: #2b2d35;
    font-weight: 400;
    font-size: 14px;
    line-height: 100%;
    text-align: center;
    vertical-align: middle;
  }

  .firstColumn {
    width: 300px;
    padding: 4px 0 0 12px;
    text-align: left;
  }

  .nameWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 300px;

    .btns {
      z-index: 0;
      position: relative;
      display: flex;
      column-gap: 4px;
    }

    button {
      background-color: transparent;
    }
  }

  .darkRow {
    background-color: #f4f6f9;
  }

  .dayOfTheWeek {
    color: #7a7b85;
  }

  .wekend {
    color: #F0303F;
    background-color: #FEEAEC;
  }

  .fired {
    color: #fff;
    background-color: #FF4F4F;
  }

  .sick {
    color: #2B2D35;
    background-color: #FADA6B;
  }

  .vacation {
    color: #FFF;
    background-color: #219EE4;
  }

  .select {
    position: absolute;
    bottom: -5px;
    left: -147px;
    z-index: 1;
    width: 170px;
    height: 40px;
    padding: 10px;
    color: #2b2d35;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    vertical-align: middle;
    background-color: #fff;
  }

  .hidden {
    display: none;
  }
  `;

  const { request } = useHttp();
  const dispatch = useDispatch();
  const currentMoth = useSelector((state) => state.table.currentMoth);
  const currentCity = useSelector((state) => state.table.currentCity);
  const daysOfTheWeek = useSelector((state) => state.table.daysOfTheWeek);
  const employees = useSelector((state) => state.table.employees);

  const getCalendarData = useCallback(() => {
    dispatch(daysOfTheWeekFetching());
    request(`http://localhost:3001/${currentMoth + currentCity}`)
      .then((data) => dispatch(daysOfTheWeekFetched(data.dayOfTheWeek)))
      .catch(dispatch(daysOfTheWeekFetchingError()));
  });

  const getEmployeesData = useCallback(() => {
    dispatch(employeesFetching());
    request(`http://localhost:3001/${currentMoth + currentCity}`)
      .then((data) => dispatch(employeesFetched(data.employees)))
      .catch(dispatch(employeesFetchingError()));
  });

  useEffect(() => {
    getCalendarData();
  }, [currentMoth, currentCity]);

  useEffect(() => {
    getEmployeesData();
  }, [currentMoth, currentCity]);

  const switchCellStyles = (value) => {
    switch (value) {
      case 'сб':
        return 'wekend';
      case 'вс':
        return 'wekend';
      case 'н':
        return 'wekend';
      case 'у':
        return 'fired';
      case 'б':
        return 'sick';
      case 'о':
        return 'vacation';
      default:
        return 'information';
    }
  };

  const hideToggle = (i) => {
    const selects = document.querySelectorAll('.select');
    selects[i].classList.toggle('hidden');
  };

  const deleteEmployee = useCallback((id) => {
    request(request(`http://localhost:3001/${currentMoth + currentCity}`), 'DELETE')
      .then((data) => console.log(data, 'Deleted'))
      .then(dispatch(employeeDeleted(id)))
      .catch((e) => console.error(e));
  });

  return (
    <Wrapper>
      <tbody>
        <tr key={nanoid()} className="darkRow">
          <td key={nanoid()} aria-label="first" className="firstColumn" />
          {
            daysOfTheWeek.map((item) => (
              <td
                key={nanoid()}
                className={switchCellStyles(item)}
              >
                {item}
              </td>
            ))
          }
        </tr>
        <tr key={nanoid()} className="darkRow">
          <td key={nanoid()} className="firstColumn">Сотрудник</td>
          {
            daysOfTheWeek.map((item, i) => (<td key={nanoid()} className={item === 'сб' || item === 'вс' ? 'wekend information' : 'information'}>{i + 1}</td>))
          }
        </tr>
        {
            employees.map((item, i) => (
              <tr key={nanoid()}>
                <td key={nanoid()} className="firstColumn">
                  <div className="nameWrapper">
                    <div key={nanoid()} className="name">
                      {item.name}
                    </div>
                    <div key={nanoid()} className="btns">
                      <button key={nanoid()} type="button">
                        <img src={user} alt="user" />
                      </button>
                      <button className="more" onClick={() => hideToggle(i)} key={nanoid()} type="button">
                        <img src={more} alt="show more" />
                      </button>
                      <div id={i} className="select hidden">
                        <button onClick={() => deleteEmployee(item.id)} className="delete" type="button">
                          Удалить из графика
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
                {
                  item.schedule.map((elem) => (
                    <td className={switchCellStyles(elem)} key={nanoid()}>{elem}</td>))
                }
              </tr>
            ))
          }
        <AddForm />
      </tbody>
    </Wrapper>
  );
}

export default Table;
