import { userInfoDummy } from '@/constants/mypageDummyData';
import { routes } from '@/constants/routeURL';
import Link from 'next/link';

const MyPage = () => {
  return (
    <section>
      {/*유저정보*/}
      <section></section>
      {/*나의 활동*/}
      <section>
        <p>나의 활동</p>
        <Link href={routes.likeMGC}>내가 찜한 모각코 {userInfoDummy.likeMGC?.length || 0}개</Link>
        <Link href={routes.currentJoinMGC}>
          현재 참여중인 모각코 {userInfoDummy.currentJoinMGC?.length || 0}개
        </Link>
        <Link href={routes.endJoinMGC}>
          종료된 모각코 {userInfoDummy.endJoinMGC?.length || 0}개
        </Link>
        <Link href={routes.receivedReview}>
          받은리뷰 {userInfoDummy.receivedReview?.length || 0}개
        </Link>
        <Link href={routes.sentReview}>보낸리뷰 {userInfoDummy.sentReview?.length || 0}개</Link>
        <Link href={routes.reportList}>신고목록 {userInfoDummy.reportList?.length || 0}개</Link>
      </section>

      {/*내 정보 관리*/}
      <section></section>
    </section>
  );
};

export default MyPage;
