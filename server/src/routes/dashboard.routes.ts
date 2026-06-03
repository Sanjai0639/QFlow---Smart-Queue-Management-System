import { Router } from "express";

import prisma from "../lib/prisma.js";

const router = Router();

router.get("/stats", async (req, res) => {

  try {

    // TOTAL QUEUES
    const totalQueues = await prisma.queue.count();

    // TOTAL APPOINTMENTS
    const totalAppointments = await prisma.appointment.count();

    // AVG WAIT TIME
    const queues = await prisma.queue.findMany();

    const avgWait =
      queues.length > 0
        ? Math.floor(
            queues.reduce(
              (sum, queue) => sum + queue.currentToken * 5,
              0
            ) / queues.length
          )
        : 0;

    res.json({
      totalQueues,
      totalAppointments,
      avgWait,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch dashboard stats",
    });

  }

});

export default router;