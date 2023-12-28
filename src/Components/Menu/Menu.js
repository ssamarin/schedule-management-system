import React from 'react';
import { NavLink } from 'react-router-dom';
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
    box-shadow: 0px 2px 2px 0px rgba(34, 62, 78, 0.15);
    background-color: #fff;

    .logo {
      margin-bottom: 24px;
      padding-top: 6px;
    }

    .list-item {
      display: list-item;
      width: 60px;
      height: 40px;
      padding: 8px;
      margin-bottom: 4px;
    }

    .back {
      width: 60px;
      height: 40px;
      padding: 8px;
    }

    .active {
      border-left: 4px solid #F0303F;
      background: #F4F6F9;
    }
  `;

  return (
    <Bar>
      <div className="menu">
        <NavLink to="/" end>
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
        </NavLink>
        <ul className="list">
          <NavLink to="/" className={({ isActive }) => isActive ? 'list-item active' : 'list-item'}>
            <div>
              <img src={calendar} alt="schedule" />
            </div>
          </NavLink>
          <NavLink to="/emptyBook" className={({ isActive }) => isActive ? 'list-item active' : 'list-item'}>
            <div>
              <img src={book} alt="book" />
            </div>
          </NavLink>
          <NavLink to="/emptyDrive" className={({ isActive }) => isActive ? 'list-item active' : 'list-item'}>
            <div>
              <img src={user} alt="user" />
            </div>
          </NavLink>
          <NavLink to="/emptyCar" className={({ isActive }) => isActive ? 'list-item active' : 'list-item'}>
            <div>
              <img src={car} alt="car" />
            </div>
          </NavLink>
          <NavLink to="/emptyAdmin" className={({ isActive }) => isActive ? 'list-item active' : 'list-item'}>
            <div>
              <img src={admin} alt="admin" />
            </div>
          </NavLink>
          <NavLink to="/emptyBriefcas" className={({ isActive }) => isActive ? 'list-item active' : 'list-item'}>
            <div>
              <img src={briefcase} alt="briefcase" />
            </div>
          </NavLink>
          <NavLink to="/emptyMsg" className={({ isActive }) => isActive ? 'list-item active' : 'list-item'}>
            <div>
              <img src={msg} alt="messanger" />
            </div>
          </NavLink>
          <NavLink to="/emptyDanger" className={({ isActive }) => isActive ? 'list-item active' : 'list-item'}>
            <div>
              <img src={danger} alt="danger" />
            </div>
          </NavLink>
        </ul>
      </div>
      <div className="back">
        <NavLink to="/">
          <img src={back} alt="back" />
        </NavLink>
      </div>
    </Bar>
  );
}

export default Menu;
