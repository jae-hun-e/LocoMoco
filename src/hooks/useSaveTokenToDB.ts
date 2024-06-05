import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface PostTokenProps {
  id: string;
  deviceType: string;
  token: string;
}

const postToken = async (data: PostTokenProps) =>
  await axios({
    method: 'patch',
    // url: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://locomoco.kro.kr'}/api/db`,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/users/${data.id}/device-keys`,
    data,
  });

export const useSaveTokenToDB = () => {
  const { mutate, ...rest } = useMutation({ mutationFn: postToken });

  return { saveToken: mutate, ...rest };
};
