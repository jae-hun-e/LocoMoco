import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';

const Home = () => {
  return (
    <main>
      <div className=" w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Label>
          <Switch />
          shadcn 예시
        </Label>

        <Image
          src="/vercel.svg"
          alt="Vercel Logo"
          className="dark:invert"
          width={100}
          height={24}
          priority
        />
      </div>
    </main>
  );
};

export default Home;
