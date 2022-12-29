import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './styled';
import { ReviewStartPoint } from './StarPoint';
import { ReviewReportBtn } from './Report';
import { ReviewBookmarkBtn } from './Bookmark';
import axios from 'axios';
import { getCookie } from '../../Login/GoogleBtn';

export const MyPostDetail = () => {
  const Cookies = getCookie('accessToken');
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [post, setPost] = useState<any>({});
  const postId = useParams().postId;
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    setIsClicked(true);
    console.log(isClicked);
  };
  const detailPage = async () => {
    const res = await axios.get(`/api/post/${postId}`, {
      headers: {
        authorization: `bearer ${Cookies}`,
      },
    });
    console.log(res);
    setPost({ ...post, ...res.data });
    console.log(post);
  };
  useEffect(() => {
    detailPage();
  }, []);
  return (
    <S.Container>
      <S.PostCon>
        <S.Title>내가 쓴 글</S.Title>
        <S.Post>
          <S.TriBox></S.TriBox>
          <S.postDetailContent>
            {post.post ? (
              <S.DangerHTML
                dangerouslySetInnerHTML={{ __html: post.post.content }}
              ></S.DangerHTML>
            ) : null}
          </S.postDetailContent>
        </S.Post>
        {post.reviews && post.reviews.length !== 0
          ? post.reviews.map((e: any, idx: number) => {
              console.log(post);
              return (
                <S.Review key={e.id} isReported={e.status} id="review">
                  {e.id}
                  {e.content ? (
                    <S.DangerHTML
                      dangerouslySetInnerHTML={{ __html: post.post.content }}
                    ></S.DangerHTML>
                  ) : null}
                  <S.ReviewButtonBox>
                    <ReviewStartPoint id={e.id}></ReviewStartPoint>
                    <ReviewBookmarkBtn id={e.id}></ReviewBookmarkBtn>
                    <ReviewReportBtn id={e.id}></ReviewReportBtn>
                  </S.ReviewButtonBox>
                </S.Review>
              );
            })
          : null}
      </S.PostCon>
    </S.Container>
  );
};
