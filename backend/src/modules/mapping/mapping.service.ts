import prisma from "../../libs/db";

export function listMatToBedMapping() {
  return prisma.esp_to_user_mapping.findMany({
    include: { esp: true, users: true },
  });
}
