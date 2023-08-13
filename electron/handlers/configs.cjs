const bcrypt = require("bcryptjs");
const { prisma } = require("../lib/prisma.cjs");
const salt = bcrypt.genSaltSync(10);
const { z } = require("zod");

const hasDefaultPass = async (event, data) => {
  const config = await prisma.config.findFirst();
  return config?.default_pass_hash ? true : false;
};

const setDefaultPass = async (event, data) => {
  const passSchema = z.string().min(4);
  const pass = passSchema.parse(data);

  try {
    const hasPass = await prisma.config.count();

    if (hasPass) throw new Error();

    const hash = bcrypt.hashSync(pass, salt);
    await prisma.config.create({
      data: {
        default_pass_hash: hash,
      },
    });
  } catch (e) {
    throw new Error("Something went wrong while hashing");
  }

  return true;
};

const comparePass = async (event, data) => {
  const passSchema = z.string().min(4);
  const pass = passSchema.parse(data);

  try {
    const config = await prisma.config.findFirst();
    const isEquals = bcrypt.compareSync(pass, config.default_pass_hash);

    if (!isEquals) return false;

    return true;
  } catch (e) {
    throw new Error("Passwords is not correct!");
  }
};

module.exports = {
  setDefaultPass,
  comparePass,
  hasDefaultPass,
};
