import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface SendPushProps {
  title: string;
  body: string;
  image?: string;
  click_action: string;
}

const sendPostFCM = async (data: SendPushProps) => {
  await axios({
    method: 'POST',
    url: '/api/fcm',
    data: {
      message: {
        data: { ...data, image: data.image ? data.image : '/oh.png' },
      },
    },
  });
};

const useSendPush = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: sendPostFCM,
    onError: (error) => console.log(error),
    onSuccess: () => console.log('푸시 보내기 성공'),
  });

  return { sendPush: mutate, ...rest };
};

export default useSendPush;
