import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { getCategoryOptions } from '@/utils/getQueryOptions';
import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchBarFilter from '../_components/SearchBarFilter';

const queryClient = new QueryClient();

const meta: Meta<typeof SearchBarFilter> = {
  title: 'Components/SearchBarFilter',
  component: SearchBarFilter,
  args: { setOpen: fn() },
  decorators: [
    (Story) => {
      const methods = useForm();

      return (
        <QueryClientProvider client={queryClient}>
          <FormProvider {...methods}>
            <Story />
          </FormProvider>
        </QueryClientProvider>
      );
    },
  ],
};

const prefetchData = async () => {
  await queryClient.prefetchQuery(getCategoryOptions());
};

const Template = () => {
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    prefetchData().then(() => {
      setIsLoad(true);
    });
  }, []);

  if (!isLoad) {
    return <></>;
  }

  return <SearchBarFilter />;
};

export const Default = Template.bind({});

export default meta;
