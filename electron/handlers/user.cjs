const { prisma } = require("../lib/prisma.cjs");
const z = require("zod");

const signIn = async (event, data) => {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  });

  console.log(data);

  if (user) {
    return user;
  }

  try {
    const dataSchema = z.object({
      name: z.string(),
      email: z.string().email(),
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
    console.log(e);
  }
};

module.exports = {
  signIn,
};
