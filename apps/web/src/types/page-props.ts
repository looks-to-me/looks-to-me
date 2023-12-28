/**
 * Type representing the properties of a Next.js page, with optional parameters and search parameters.  
 * Documentation: https://nextjs.org/docs/app/api-reference/file-conventions/page#props
 * 
 * @example
 * type UserPageProps = PageProps<{
 *   params: {
 *     userId: string;
 *   };
 * }>;
 * 
 * const UserProfilePage: FC<UserPageProps> = ({
 *   params: { userId },
 * } => {...}
 */
export type PageProps<
  Context extends {
    params?: Record<string, string | string[]>;
    searchParams?: Record<string, string | string[] | undefined>;
  } = {
    params: Record<string, never>;
    searchParams: Record<string, never>;
  },
> = Context;
