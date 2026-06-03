import { Router } from "express";

import prisma from "../lib/prisma.js";

import authMiddleware from "../middleware/auth.middleware.js";

import { io } from "../index.js";

const router = Router();


// CREATE QUEUE
router.post(
  "/create",
  authMiddleware,
  async (req, res) => {
    try {

      const { name } = req.body;

      const queue = await prisma.queue.create({
        data: {
          name,
          estimatedWait: 0,
          averageServiceTime: 5,
        },
      });

      io.emit("queueUpdated");

      return res.status(201).json({
        message: "Queue created successfully",
        queue,
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);


// GET ALL QUEUES
router.get(
  "/all",
  async (req, res) => {
    try {

      const queues = await prisma.queue.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

      return res.status(200).json(queues);

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);


// DELETE QUEUE
router.delete(
  "/delete/:queueId",
  authMiddleware,
  async (req, res) => {
    try {

      const queueId = req.params.queueId as string;

      await prisma.appointment.deleteMany({
        where: {
          queueId,
        },
      });

      await prisma.queue.delete({
        where: {
          id: queueId,
        },
      });

      io.emit("queueUpdated");

      return res.status(200).json({
        message: "Queue deleted successfully",
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);


// RESET QUEUE
router.patch(
  "/reset/:queueId",
  authMiddleware,
  async (req, res) => {
    try {

      const queueId = req.params.queueId as string;

      await prisma.appointment.deleteMany({
        where: {
          queueId,
        },
      });

      await prisma.queue.update({
        where: {
          id: queueId,
        },
        data: {
          currentToken: 0,
          estimatedWait: 0,
        },
      });

      io.emit("queueUpdated");

      return res.status(200).json({
        message: "Queue reset successfully",
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);


// JOIN QUEUE
router.post(
  "/join/:queueId",
  authMiddleware,
  async (req, res) => {
    try {

      const queueId = req.params.queueId as string;

      const userId = (req as any).user.userId;

      const queue = await prisma.queue.findUnique({
        where: {
          id: queueId,
        },
      });

      if (!queue) {
        return res.status(404).json({
          message: "Queue not found",
        });
      }

      const nextToken = queue.currentToken + 1;

      // ETA Calculation
      const estimatedWait =
        nextToken * queue.averageServiceTime;

      const appointment = await prisma.appointment.create({
        data: {
          tokenNumber: nextToken,
          userId,
          queueId,
        },
      });

      await prisma.queue.update({
        where: {
          id: queueId,
        },
        data: {
          currentToken: nextToken,
          estimatedWait,
        },
      });

      io.emit("queueUpdated", {
        queueId,
        currentToken: nextToken,
        estimatedWait,
      });

      return res.status(201).json({
        message: "Joined queue successfully",
        tokenNumber: nextToken,
        estimatedWait,
        appointment,
      });

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);


// GET SINGLE QUEUE
router.get(
  "/:queueId",
  authMiddleware,
  async (req, res) => {
    try {

      const queueId = req.params.queueId as string;

      const queue = await prisma.queue.findUnique({
        where: {
          id: queueId,
        },
        include: {
          appointments: true,
        },
      });

      if (!queue) {
        return res.status(404).json({
          message: "Queue not found",
        });
      }

      return res.status(200).json(queue);

    } catch (error) {
      console.log(error);

      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);

export default router;