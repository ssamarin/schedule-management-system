import React, { useState } from 'react';
import styled from 'styled-components';

import { nanoid } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { employeeCreated } from '../Table/tableSlice';

import useHttp from '../../hooks/http.hook';
import plus from '../../assets/icons/table/addForm/plus.svg';

const Wrapper = styled.tr`
.firstColumn {
  width: 300px;

  div {
    display: flex;
    column-gap: 4px;

    button {
      width: 20px;
      height: 20px;
      background-color: transparent;
    }

    input {
      width: 100%;
      border: none;

      &:focus {
        outline: none;
      }

      &::placeholder {
        color: #308add;
        font-weight: 400;
        font-size: 14px;
        line-height: 142.857%;
      }
    }
  }
}

.dayDescr {
  width: 100%;
  border: none;
  outline: none;
}

.danger {
  background-color: #FEEAEC;
}
`;

function AddForm() {
  const [name, setName] = useState('');
  const [schedule, setSchedule] = useState([]);

  const currentMoth = useSelector((state) => state.table.currentMoth);
  const currentCity = useSelector((state) => state.table.currentCity);

  const dispatch = useDispatch();
  const { request } = useHttp();

  const getSheduleData = () => {
    const scheduleInputs = [...document.querySelectorAll('.dayDescr')];
    const scheduleInputsValue = scheduleInputs.map((item) => item.value);
    return setSchedule([...scheduleInputsValue]);
  };

  const fetchNewEmployee = () => {
    getSheduleData();
    const newEmployee = {
      name,
      id: nanoid(),
      schedule,
    };
    request(`http://localhost:3001/${currentMoth + currentCity}/employees`, 'POST', JSON.stringify(newEmployee))
      .then((data) => console.log(data, 'Отправлена'))
      .then(dispatch(employeeCreated(newEmployee)))
      .catch((e) => console.error(e));

    setName('');
    setSchedule([]);
  };

  const checkEmptyInputs = () => {
    const scheduleInputs = [...document.querySelectorAll('.dayDescr')];
    scheduleInputs.forEach((input) => {
      if (input.value === '') {
        input.classList.add('danger');
        input.parentNode.classList.add('danger');
      } else {
        input.classList.remove('danger');
        input.parentNode.classList.remove('danger');
      }
    });
    if (scheduleInputs.every((input) => input.value)) {
      fetchNewEmployee();
    }
  };

  const countOfTheDays = useSelector((state) => state.table.daysOfTheWeek);

  return (
    <Wrapper>
      <td className="firstColumn">
        <div>
          <button onClick={() => checkEmptyInputs()} type="button">
            <img src={plus} alt="add Employee" />
          </button>
          <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Добавить сотрудника" />
        </div>
      </td>
      {
        countOfTheDays.map((item, i) => {
          const wekends = [6, 7, 13, 14, 20, 21, 27, 28];
          let index = false;
          if (wekends.indexOf((i + 1)) > -1) {
            index = true;
          }
          return (
            <td aria-label="schedule input" className={index ? 'danger' : ''}>
              <input onChange={() => getSheduleData()} className={index ? 'dayDescr danger' : 'dayDescr'} type="text" />
            </td>
          );
        })
      }
    </Wrapper>
  );
}

export default AddForm;
