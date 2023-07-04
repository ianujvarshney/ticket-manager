const { prisma } = require("../lib/prisma.cjs");
const z = require("zod");

const signIn = async (event, data) => {
  const user = prisma.user.findFirstOrThrow({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return user;
  }

  try {
    const dataSchema = z.object({
      name: z.string().require(),
      email: z.email().require(),
      avatarUrl: z.string().url(),
    });

    const { avatarUrl, email, name } = dataSchema.parse(data);

    const newUser = await prisma.user.create({
      data: {
        email,
        avatarUrl,
        name,
      },
    });

    return newUser;
  } catch (e) {
    throw new Error("Could not create the new User!");
  }
};

module.exports = {
  signIn,
};
