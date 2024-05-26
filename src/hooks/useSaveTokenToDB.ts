import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface PostTokenProps {
  id: string;
  deviceType: string;
  token: string;
}

const postToken = async (data: PostTokenProps) =>
  await axios({
    method: 'POST',
    url: `${process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://locomoco.kro.kr'}/api/db`,
    data,
  });
export const useSaveTokenToDB = () => {
  const { mutate, ...rest } = useMutation({ mutationFn: postToken });

  return { saveToken: mutate, ...rest };
};
