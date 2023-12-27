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
    transition: 0.3s all;
    background-color: #fff;
  }

  .select:hover {
    background-color: #2B2D35;
    button {
      color: #fff;
    }
  }

  .information {
    cursor: pointer;
  }

  .active {
    border: 2px solid #F0303F;
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
    const multiple = document.querySelector('.select-multiple');
    multiple.style.display = 'none';
  }, [currentMoth, currentCity]);

  useEffect(() => {
    getEmployeesData();
  }, [currentMoth, currentCity]);

  const switchCellStyles = (value) => {
    switch (value) {
      case 'сб':
        return 'information wekend';
      case 'вс':
        return 'information wekend';
      case 'н':
        return 'information wekend';
      case 'у':
        return 'information fired';
      case 'б':
        return 'information sick';
      case 'о':
        return 'information vacation';
      default:
        return 'information';
    }
  };

  const hideToggle = (i) => {
    const selects = document.querySelectorAll('.select');
    selects[i].classList.toggle('hidden');
  };

  let count = 0;
  const toggleActive = (e) => {
    const cels = [...document.querySelectorAll('.information')];
    const multiple = document.querySelector('.select-multiple');
    cels.forEach((cell) => {
      if (cell === e.target && cell.getAttribute('data-active') === 'false') {
        cell.setAttribute('data-active', 'true');
        cell.classList.add('active');
        count++;
        console.log(count);
      } else if (cell === e.target && cell.getAttribute('data-active') === 'true') {
        cell.setAttribute('data-active', 'false');
        cell.classList.remove('active');
        count--;
        console.log(count);
      }
      if (count === 0) {
        multiple.style.display = 'none';
      } else {
        multiple.style.display = 'flex';
      }
    });
  };

  const deleteEmployee = useCallback((id) => {
    request(request(`http://localhost:3001/${currentMoth + currentCity}`), 'DELETE')
      .then((data) => console.log(data, 'Deleted'))
      .then(dispatch(employeeDeleted(id)))
      .catch((e) => console.error(e));
  });

  const multipleValueChange = (e) => {
    const attribure = e.target.getAttribute('data-select');
    const cels = [...document.querySelectorAll('.information')];
    const activeCels = cels.filter((item) => item.getAttribute('data-active') === 'true');
    console.log(activeCels);
    switch (attribure) {
      case '1':
        activeCels.forEach((item) => {
          item.innerHTML = '1';
          item.classList = switchCellStyles(attribure);
        });
        break;
      case 'н':
        activeCels.forEach((item) => {
          item.innerHTML = 'н';
          item.classList = switchCellStyles(attribure);
        });
        break;
      case 'о':
        activeCels.forEach((item) => {
          item.innerHTML = 'о';
          item.classList = switchCellStyles(attribure);
        });
        break;
      case 'б':
        activeCels.forEach((item) => {
          item.innerHTML = 'б';
          item.classList = switchCellStyles(attribure);
        });
        break;
      case 'у':
        activeCels.forEach((item) => {
          item.innerHTML = 'у';
          item.classList = switchCellStyles(attribure);
        });
        break;
      default:
        return undefined;
    }
    cels.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('data-active', 'false');
    });
    switchCellStyles(attribure);
    return undefined;
  };

  return (
    <>
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
                    <td className={switchCellStyles(elem)} onClick={(e) => toggleActive(e)} data-active="false" key={nanoid()}>{elem}</td>))
                }
              </tr>
            ))
          }
          <AddForm />
        </tbody>
      </Wrapper>
      <div className="select-multiple">
        <button type="button" onClick={(e) => multipleValueChange(e)} data-select="1" className="selectItem">
          Рабочий день
        </button>
        <button type="button" onClick={(e) => multipleValueChange(e)} data-select="н" className="selectItem">
          Выходной
        </button>
        <button type="button" onClick={(e) => multipleValueChange(e)} data-select="о" className="selectItem">
          Отпуск
        </button>
        <button type="button" onClick={(e) => multipleValueChange(e)} data-select="б" className="selectItem">
          Больничный
        </button>
        <button type="button" onClick={(e) => multipleValueChange(e)} data-select="у" className="selectItem">
          Увольнение
        </button>
      </div>
    </>
  );
}

export default Table;
