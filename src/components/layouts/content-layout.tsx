type ContentLayoutProps = {
  children: React.ReactNode;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <>
      <div className="my-8 sm:mx-auto w-full px-4 sm:w-xl md:w-3xl xl:w-5xl h-screen ">
        {children}
      </div>
    </>
  );
};
