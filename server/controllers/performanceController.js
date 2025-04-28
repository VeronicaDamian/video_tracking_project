import * as dataService from "../services/dataService.js";
import * as statsService from "../services/statisticsService.js";

export const getPerfomanceData = async (req, res) => {
  const { projects, sessions } = await dataService.getAllPerformanceData();
  const stats = statsService.calculateStatistics(projects, sessions);
  res.json({ stats, projects, sessions });
};

export const getPerformanceByTimeRange = async (req, res) => {
  const { startDate, endDate } = req.query;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const { projects, sessions } = await dataService.getAllPerformanceData();
  const { filteredProjects, filteredSessions } =
    statsService.filterDataByDateRange(projects, sessions, startDate, endDate);
  const stats = statsService.calculateStatistics(
    filteredProjects,
    filteredSessions
  );
  res.json({
    timeRange: { startDate: start.toISOString(), endDate: end.toISOString() },
    stats,
    projects: filteredProjects,
    sessions: filteredSessions,
  });
};

export const getPerformanceByClient = async (req, res) => {
  const { projects, clients } = await dataService.getAllPerfomanceData();
  const clientPerformance = statsService.getClientPerformanceData(
    projects,
    clients
  );
  res.json(clientPerformance);
};

export const getEarningsData = async (req, res) => {
    const { projects, clients } = await dataService.getAllPerfomanceData();
    const earningsData = statsService.getEarningsChartData(projects, clients);
    res.json(earningsData);
};

export const getProductivityData = async (req, res) => {
    const { projects, clients } = await dataService.getAllPerfomanceData();
    const productivityData = statsService.getProductivityData(projects, clients);
    res.json(productivityData);
};
