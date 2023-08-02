const { prisma } = require("../lib/prisma.cjs");
const z = require("zod");
const ElectronGoogleOAuth2 =
  require("@getstation/electron-google-oauth2").default;
const jwt_decode = require("jwt-decode");

const signIn = async (event, data) => {
  const myApiOauth = new ElectronGoogleOAuth2(
    process.env.GOOGLE_ID_CLIENT,
    process.env.GOOGLE_KEY,
    ["email", "profile"],
    { successRedirectURL: "ticket-manager://google?token" }
  );

  try {
    const result = myApiOauth.openAuthWindowAndGetTokens();
    const { access_token, refresh_token } = result;

    const apiResponse = await fetch(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    const googleUser = await apiResponse.json();

    const user = await prisma.user.findFirst({
      where: {
        email: googleUser.email,
      },
    });

    if (user) {
      return user;
    }

    const dataSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      avatarUrl: z.string().url(),
    });

    const { avatarUrl, email, name } = dataSchema.parse(googleUser);

    const newUser = await prisma.user.create({
      data: {
        email,
        avatarUrl,
        name,
      },
    });

    return newUser;
  } catch (e) {
    throw new Error("Failed to sign in with Google account");
  }
};

// const getDatabaseUser = async (event, data) => {
//   const user = await prisma.user.findFirst({
//     where: {
//       email: data.email,
//     },
//   });

//   if (user) {
//     return user;
//   }

//   try {
//     const dataSchema = z.object({
//       name: z.string(),
//       email: z.string().email(),
//       avatarUrl: z.string().url(),
//     });

//     const { avatarUrl, email, name } = dataSchema.parse(data);

//     const newUser = await prisma.user.create({
//       data: {
//         email,
//         avatarUrl,
//         name,
//       },
//     });

//     return newUser;
//   } catch (e) {
//     console.log(e);
//   }
// };

module.exports = {
  signIn,
};
