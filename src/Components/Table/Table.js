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

  return (
    <Wrapper>
      <tbody>
        <tr key={nanoid()} className="darkRow">
          <td key={nanoid()} aria-label="first" className="firstColumn" />
          {
            daysOfTheWeek.map((item) => (<td key={nanoid()} className="dayOfTheWeek">{item}</td>))
          }
        </tr>
        <tr key={nanoid()} className="darkRow">
          <td key={nanoid()} className="firstColumn">Сотрудник</td>
          {
            daysOfTheWeek.map((item, i) => (<td key={nanoid()} className="information">{i + 1}</td>))
          }
        </tr>
        {
            employees.map((item) => (
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
                      <button key={nanoid()} type="button">
                        <img src={more} alt="show more" />
                      </button>
                    </div>
                  </div>
                </td>
                {
                  item.schedule.map((elem) => (<td key={nanoid()}>{elem}</td>))
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
