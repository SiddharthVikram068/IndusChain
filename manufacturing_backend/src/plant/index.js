// plant.js

import prisma from "../../utils/prismaClient.js";

export const createPlant = async (name, ownerId) => {
  return await prisma.create({
    data: {
      name,
      ownerId,
    },
  });
};

// Other plant operations like updating, fetching, etc. can be added here.

