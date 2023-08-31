export const getUserName = (atUsername: string): string | undefined => {
  const decodedAtUsername = decodeURIComponent(atUsername);
  const at = decodedAtUsername.at(0);
  if (at !== '@') return;

  const username = decodedAtUsername.slice(1);
  return username.length <= 0 ? undefined : username;
};
