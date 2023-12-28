import React from 'react';
import styled from 'styled-components';

function EmptyDangerPage() {
  const EmptyWrapper = styled.div`
    span {
      color: #F0303F;
    }
  `;
  return (
    <EmptyWrapper className="emptyWrapper">
      <h2>
        Это страница с
        <span> ошибками</span>
        ,
        но пока она пустая
      </h2>
    </EmptyWrapper>
  );
}

export default EmptyDangerPage;
