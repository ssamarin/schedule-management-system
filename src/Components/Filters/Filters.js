import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { onMonthChanged, onCityChanged } from '../Table/tableSlice';

import search from '../../assets/icons/filters/search.svg';
import selectArrow from '../../assets/icons/filters/selectArrow.svg';

function Filters() {
  const MainHeader = styled.section`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;

    .filters {
      display: flex;
      column-gap: 20px;
    }

    input {
      width: 400px;
      padding: 8px 8px 8px 44px;
      border-radius: 18px;
      border: 2px solid #EAEEF4;
      background: #FFF;
      color: #B8C4DB;
      font-size: 16px;
      font-weight: 400;
      line-height: 150%;
      background: url(${search}) no-repeat 12px 8px;
    }

    button {
      padding: 8px 24px;
      color: #2b2d35;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      background-color: transparent;
      border: 2px solid #2b2d35;
      border-radius: 18px;
    }

    .selects {
      display: flex;
      column-gap: 20px;

      select {
        width: 200px;
        height: 40px;
        padding: 6px 6px 6px 12px;
        overflow: hidden;
        color: #2b2d35;
        font-weight: 400;
        font-size: 16px;
        line-height: 150%;
        background: #fff;
        background: url(${selectArrow}) no-repeat 170px center;
        border: 2px solid #eaeef4;
        border-radius: 8px;
        cursor: pointer;
        appearance: none;
      }
    }
  `;
  const dispatch = useDispatch();

  const onSelectMonth = (value) => {
    dispatch(onMonthChanged(value));
  };

  const onSelectCity = (value) => {
    dispatch(onCityChanged(value));
  };

  return (
    <MainHeader>
      <div className="filters">
        <input className="search" type="text" placeholder="Поиск" />
        <button type="button">Фильтры</button>
      </div>
      <div className="selects">
        <select onChange={(e) => onSelectMonth(e.target.value)} name="month">
          <option value="april">Апрель</option>
          <option value="march">Март</option>
        </select>
        <select onChange={(e) => onSelectCity(e.target.value)} name="city">
          <option value="Moscow">Москва</option>
          <option value="Spb">Санкт-Петербург</option>
        </select>
      </div>
    </MainHeader>
  );
}
export default Filters;
