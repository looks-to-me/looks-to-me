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
    params?: Promise<Record<string, string | string[]>>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
  } = {
    params: Promise<Record<string, never>>;
    searchParams: Promise<Record<string, never>>;
  },
> = Context;
