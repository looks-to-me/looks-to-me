import type { NextPageProps } from '../../../_types/nextPageProps';

export type UserProfilePageProps = NextPageProps<{
  /**
   * username string that starts with "@"
   */
  atUsername: string;
}>;
