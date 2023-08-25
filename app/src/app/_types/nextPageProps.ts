/**
 * Type representing the properties of a Next.js page, with optional parameters and search parameters.  
 * Documentation: https://nextjs.org/docs/app/api-reference/file-conventions/page#props
 * 
 * @example
 * type UserPageProps = NextPageProps<NextPageProps<{ userId: string }>>
 * 
 * const const UserProfilePage: FC<UserPageProps> = ({
 *   params: { userId },
 * } => {...}
 */
export type NextPageProps<
  Params extends { [key in string]: string | string[] } = Record<string, never>,
  SearchParams extends {
    [key in string]: string | string[] | undefined
  } = Record<string, never>,
> = { params: Params; searchParams: SearchParams };
