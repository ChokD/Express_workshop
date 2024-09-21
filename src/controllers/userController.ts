// src/controllers/userController.ts
import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

// src/controllers/userController.ts
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};

// src/controllers/userController.ts
export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const user = await prisma.user.create({
      data: { name, email },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};

// src/controllers/userController.ts
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
};

// src/controllers/userController.ts
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting user', error });
  }
};