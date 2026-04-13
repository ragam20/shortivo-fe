type ContentLayoutProps = {
  children: React.ReactNode;
};

export const ContentLayout = ({ children }: ContentLayoutProps) => {
  return (
    <div className="mx-auto py-8 w-full px-4 sm:max-w-2xl md:max-w-3xl xl:max-w-5xl">
      {children}
    </div>
  );
};
