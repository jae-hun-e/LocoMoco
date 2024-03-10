'use client';

import ReportList from '@/app/mypage/report-list/_components/ReportList';

const data = [
  {
    reportId: 1,
    reporterId: 1,
    reportedId: 3,
    content:
      '안녕하세요, 스토브 입니다. 개인정보 유효기간제 폐지(개정 전 개인정보보호법 제39조의 6)에 따라 휴면으로 분류되었던 회원님의 계정이 활성계정으로 전환될 예정입니다.',
  },
  {
    reportId: 2,
    reporterId: 1,
    reportedId: 4,
    content:
      '안녕하세요, 스토브 입니다. 개인정보 유효기간제 폐지(개정 전 개인정보보호법 제39조의 6)에 따라 휴면으로 분류되었던 회원님의 계정이 활성계정으로 전환될 예정입니다.',
  },
  {
    reportId: 3,
    reporterId: 1,
    reportedId: 5,
    content:
      '안녕하세요, 스토브 입니다. 개인정보 유효기간제 폐지(개정 전 개인정보보호법 제39조의 6)에 따라 휴면으로 분류되었던 회원님의 계정이 활성계정으로 전환될 예정입니다.',
  },
  {
    reportId: 4,
    reporterId: 1,
    reportedId: 6,
    content:
      '안녕하세요, 스토브 입니다. 개인정보 유효기간제 폐지(개정 전 개인정보보호법 제39조의 6)에 따라 휴면으로 분류되었던 회원님의 계정이 활성계정으로 전환될 예정입니다.',
  },
];

const ReportPage = () => {
  const handleModifyButtonClick = (targetId: number) => {
    console.log(`신고번호 ${targetId}를 수정합니다.`);
  };

  const handleDeleteButtonClick = (targetId: number) => {
    console.log(`신고번호 ${targetId}를 삭제합니다.`);
  };

  return (
    <ReportList
      data={data}
      onModifyBtnClick={handleModifyButtonClick}
      onDeleteBtnClick={handleDeleteButtonClick}
    />
  );
};

export default ReportPage;
