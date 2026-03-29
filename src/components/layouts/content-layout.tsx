type ContentLayoutProps = {
  children: React.ReactNode;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="my-8 mx-auto min-h-screen w-full px-4 sm:max-w-2xl md:max-w-3xl xl:max-w-5xl">
      {children}
    </div>
  );
};
