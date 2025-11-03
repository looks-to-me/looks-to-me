export const truncate = async () => {
  const { database } = await import('@looks-to-me/package-database');

  await database().delete(database.schema.posts);
  await database().delete(database.schema.postCopies);
  await database().delete(database.schema.postTags);
  await database().delete(database.schema.images);
  await database().delete(database.schema.tags);
  await database().delete(database.schema.muteUsers);
  await database().delete(database.schema.userProfiles);
  await database().delete(database.schema.userProviders);
  await database().delete(database.schema.users);
};
