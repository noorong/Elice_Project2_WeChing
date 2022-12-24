// dependencies
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// styles
import * as S from './styled';

interface UserInfo {
  id: number,
  email: string,
  nickname: string,
  point: string,
  status: number,
  grade: number,
  avg: null | number,
  post_count: string,
  review_count: string,
};

const initialState = {
  id: 21,
  email: "yeek0620@gmail.com",
  nickname: "엘리스",
  point: "10,000",
  status: 0,
  grade: 0,
  avg: null,
  post_count: "2",
  review_count: "5"
};

export function UserInfo() {
  const token = '';

  const [userInfo, setUserInfo] = useState<UserInfo>(initialState);

  const nicknameInfo = async () => {
    try {
      const res = await axios.get(`/api/user`, {
        method: 'GET',
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      setUserInfo(() => ({ ...userInfo, ...res.data }));
    } catch (err) {
        alert(`예기지 못한 에러가 발생했습니다.\nERROR: ${err}`);
    }
  };
  useEffect(() => {
    nicknameInfo();
  }, []);

  return (
    <div>
      <S.Container>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <S.NicknameItemBox>{userInfo.nickname}</S.NicknameItemBox>
          <S.PointBox>P {userInfo.point}</S.PointBox>
        </div>
        <S.Line></S.Line>
        <S.contentItemBox>작성글 : {userInfo.post_count}</S.contentItemBox>
      </S.Container>
    </div>
  );
}
