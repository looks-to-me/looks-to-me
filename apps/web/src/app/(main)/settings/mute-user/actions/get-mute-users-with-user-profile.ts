import type { User } from '../../../_repositories/user-repository';

export const getMuteUsers = () => {
  const demoUsers: User[] = [{
    id: '1',
    profile:{
      avatarUrl: 'https://pbs.twimg.com/profile_images/1350895249678348292/RS1Aa0iK_400x400.jpg',
      displayName: '@drizzle',
      name: 'Drizzle',
    },
  },
  {
    id: '2',
    profile:{
      avatarUrl: 'https://pbs.twimg.com/profile_images/1350895249678348292/RS1Aa0iK_400x400.jpg',
      displayName: '@drizzle',
      name: 'Drizzle',
    },
  },
  {
    id: '3',
    profile:{
      avatarUrl: 'https://pbs.twimg.com/profile_images/1350895249678348292/RS1Aa0iK_400x400.jpg',
      displayName: '@drizzle',
      name: 'Drizzle',
    },
  },
  {
    id: '4',
    profile:{
      avatarUrl: 'https://pbs.twimg.com/profile_images/1350895249678348292/RS1Aa0iK_400x400.jpg',
      displayName: '@drizzle',
      name: 'Drizzle',
    },
  },
  ];
  return demoUsers;
};
