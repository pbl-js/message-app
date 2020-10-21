export default (messages) => {
  const transformedMessages = messages.map((message) => {
    return {
      _id: message.id,
      text: message.body,
      createdAt: message.insertedAt,
      user: {
        _id: message.user.id,
        name: `${message.user.firstName} ${message.user.lastName}`,
        avatar: "https://placeimg.com/140/140/any",
      },
    };
  });

  return transformedMessages;
};
