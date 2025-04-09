import express from "express";
import {
  getPerfomanceData,
  getPerformanceByTimeRange,
  getPerformanceByClient,
  getEarningsData,
  getProductivityData,
} from "../controllers/performanceController.js";

const router = express.Router();

router.get("/", getPerfomanceData);
router.get("/time-range", getPerformanceByTimeRange);
router.get("/by-client", getPerformanceByClient);
router.get("/earnings", getEarningsData);
router.get("/productivity", getProductivityData);


export default router;
