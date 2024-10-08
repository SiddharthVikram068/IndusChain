// plant.js

import { plant } from './prismaClient';

const createPlant = async (name, ownerId) => {
  return await plant.create({
    data: {
      name,
      ownerId,
    },
  });
};

// Other plant operations like updating, fetching, etc. can be added here.

export default { createPlant };
