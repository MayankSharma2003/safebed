import prisma from "../../libs/db";

export function listUsers() {
  return prisma.users.findMany();
}
