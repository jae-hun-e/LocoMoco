import FCMPermission from '@/app/fcm/_components/FCMPermission';
import FCMPush from '@/app/fcm/_components/FCMPush';

const FCMTestPage = () => {
  return (
    <div>
      fcm test
      <FCMPermission />
      <FCMPush />
    </div>
  );
};

export default FCMTestPage;
