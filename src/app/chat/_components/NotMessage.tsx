const NotMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-[60%] self-center rounded-3xl bg-main-6 text-center">
      <p className="flex w-full justify-center">{children}</p>
    </div>
  );
};
export default NotMessage;
