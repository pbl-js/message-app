export default (messages) => {
  const transformedMessages = messages.map((message) => {
    return {
      _id: message.id,
      text: message.body,
      createdAt: message.insertedAt,
      user: {
        _id: message.user.id,
        name: `${message.user.firstName} ${message.user.lastName}`,
      },
    };
  });

  return transformedMessages;
};
