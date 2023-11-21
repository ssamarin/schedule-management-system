import React from 'react';
import styled from 'styled-components';

import bell from '../../assets/icons/header/bell.svg';
import arrow from '../../assets/icons/header/arrowDown.svg';

function Header() {
  const Wrapper = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding-right: 4px;

    h1 {
      color: #2b2d35;
      font-weight: 400;
      font-size: 24px;
      line-height: 100%;
    }

    .btns-group {
      display: flex;
      align-items: center;
      column-gap: 12px;

      .notifications {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        background-color: #fff;
        border-radius: 50%;
      }

      .user {
        display: flex;
        align-items: center;
        column-gap: 7.76px;

        .avatar {
          width: 40px;
          height: 40px;
          color: #fff;
          font-weight: 500;
          font-size: 16px;
          line-height: 150%;
          text-align: center;
          background-color: #2b2d35;
          border-radius: 50%;
        }

        .more {
          cursor: pointer;
        }
      }
    }
  `;
  return (
    <Wrapper>
      <h1>График смен</h1>
      <div className="btns-group">
        <button type="button" className="notifications">
          <img src={bell} alt="notifications" />
        </button>
        <div className="user">
          <button className="avatar" type="button">
            КК
          </button>
          <div type="button" className="more">
            <img src={arrow} alt="more" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
export default Header;
