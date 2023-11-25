import React from 'react';
import styled from 'styled-components';

import logo from '../../assets/icons/menu/logo.svg';
import calendar from '../../assets/icons/menu/aside/calendar.svg';
import book from '../../assets/icons/menu/aside/book.svg';
import user from '../../assets/icons/menu/aside/userDriver.svg';
import car from '../../assets/icons/menu/aside/car.svg';
import admin from '../../assets/icons/menu/aside/admin.svg';
import briefcase from '../../assets/icons/menu/aside/case.svg';
import msg from '../../assets/icons/menu/aside/wechat.svg';
import danger from '../../assets/icons/menu/aside/danger.svg';
import back from '../../assets/icons/menu/aside/back.svg';

function Menu() {
  const Bar = styled.aside`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    text-align: center;
    background-color: #fff;

    .logo {
      margin-bottom: 24px;
      padding-top: 6px;
    }

    .list-item {
      width: 60px;
      height: 40px;
      margin-bottom: 4px;
    }

    .back {
      width: 60px;
      height: 40px;
      padding: 8px;
    }
  `;

  return (
    <Bar>
      <div className="menu">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul className="list">
          <li className="list-item">
            <div>
              <img src={calendar} alt="schedule" />
            </div>
          </li>
          <li className="list-item">
            <div>
              <img src={book} alt="book" />
            </div>
          </li>
          <li className="list-item">
            <div>
              <img src={user} alt="user" />
            </div>
          </li>
          <li className="list-item">
            <div>
              <img src={car} alt="car" />
            </div>
          </li>
          <li className="list-item">
            <div>
              <img src={admin} alt="admin" />
            </div>
          </li>
          <li className="list-item">
            <div>
              <img src={briefcase} alt="briefcase" />
            </div>
          </li>
          <li className="list-item">
            <div>
              <img src={msg} alt="messanger" />
            </div>
          </li>
          <li className="list-item">
            <div>
              <img src={danger} alt="danger" />
            </div>
          </li>
        </ul>
      </div>
      <div className="back">
        <img src={back} alt="back" />
      </div>
    </Bar>
  );
}

export default Menu;
