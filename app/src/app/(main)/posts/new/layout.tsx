import type { FC, ReactNode } from 'react';

export const metadata = {
  title: 'New post',
  robots: 'noindex',
};

export type PostsNewLayoutProps = {
  children: ReactNode;
  auth: ReactNode;
};

const PostsNewLayout: FC<PostsNewLayoutProps> = ({
  children,
  auth,
}) => {
  return (
    <>
      {children}
      {auth}
    </>
  );
};

export default PostsNewLayout;
