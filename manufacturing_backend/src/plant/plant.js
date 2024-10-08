// plant.js

import prisma from "../../utils/prismaClient.js";

// create a plant
export const createPlant = async (req, res) => {

  const { name } = req.body;

  // Check if the logged-in user is an Owner
  if (req.user.role !== 'OWNER') {
    return res.status(403).json({ error: 'Only plant owners can create plants' });
  }

  try {
    // Create the plant and associate it with the owner
    const plant = await prisma.plant.create({
      data: {
        name,
        ownerId: req.user.id, // Associate plant with the logged-in user
      },
    });

    res.status(201).json({ message: 'Plant created successfully', plant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Other plant operations like updating, fetching, etc. can be added here.

// adding a manager to a plant

export const addManagerToPlant = async (req, res) => {
  const { userId, plantId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== 'MANAGER') {
      return res.status(400).json({ error: 'User must be a manager' });
    }

    const plant = await prisma.plant.update({
      where: { id: plantId },
      data: { managers: { connect: { id: userId } } },
    });

    res.json({ message: 'Manager added to plant', plant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// adding an engineer to a plant

export const addEngineerToPlant = async (req, res) => {
  const { userId, plantId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || user.role !== 'ENGINEER') {
      return res.status(400).json({ error: 'User must be an engineer' });
    }

    const plant = await prisma.plant.update({
      where: { id: plantId },
      data: { engineers: { connect: { id: userId } } },
    });

    res.json({ message: 'Engineer added to plant', plant });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get plant details

export const getPlantDetails = async (req, res) => {
  const { plantId } = req.params;

  try {
    const plant = await prisma.plant.findUnique({
      where: { id: parseInt(plantId) },
      include: { owner: true, managers: true, engineers: true },
    });

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    res.json(plant);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

