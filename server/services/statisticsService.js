import Project from "../models/Project.js";
import Client from "../models/Client.js";
import Session from "../models/Session.js";


const ensureProjectInstance = (project) =>
  project instanceof Project ? project : new Project(project);

const ensureClientInstance = (client) =>
  client instanceof Client ? client : new Client(client);

const ensureSessionInstance = (session) =>
  session instanceof Session ? session : new Session(session);

export const calculateStatistics = (projects, sessions) => {
  const projectInstances = projects.map(ensureProjectInstance);
  const sessionInstances = sessions.map(ensureSessionInstance);
  const totalSecondsEdited = projectInstances.reduce(
    (total, project) => total + project.duration,
    0
  );
  const totalWorkTimeInSeconds = sessionInstances.reduce(
    (total, sessions) => total + sessions.getDurationSeconds(),
    0
  );
  const totalEarnings = projectInstances.reduce((total, project) => {
    if (project.isPaid() && project.isCompleted()) {
      const rate = project.client.paymentRate || 0;
      return total + project.calculateEarnings(rate);
    }
    return total;
  }, 0);

  const productivityRate =
    totalWorkTimeInSeconds > 0
      ? (totalSecondsEdited / (totalWorkTimeInSeconds / 3600)).toFixed(2)
      : 0;

  const completedProjects = projectInstances.filter((project) =>
    project.isCompleted()
  ).length;
  const unpaidEarnings = projectInstances.reduce((total, project) => {
    if (!project.isPaid() && project.isCompleted()) {
      const rate = project.client.paymentRate || 0;
      return total + project.calculateEarnings(rate);
    }
    return total;
  }, 0);

  const stats = {
    totalSecondsEdited,
    totalWorkTimeInSeconds,
    totalEarnings,
    productivityRate,
    completedProjects,
    unpaidEarnings,
    totalProjects: projectInstances.length,
    totalSessions: sessionInstances.length,
  };
  return stats;
};

export const filterDataByDateRange = (
  projects,
  sessions,
  startDate,
  endDate
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const projectInstances = projects.map(ensureProjectInstance);
  const sessionInstances = sessions.map(ensureSessionInstance);
  const filteredProjects = projectInstances.filter((project) => {
    const projectDate = new Date(project.createdAt || new Date());
    return projectDate >= start && projectDate <= end;
  });
  const filteredSessions = sessionInstances.filter((session) => {
    const sessionDate = new Date(session.sessionStart);
    return sessionDate >= start && sessionDate <= end;
  });

  return { filteredProjects, filteredSessions };
};

export const getClientPerformanceData = (projects, clients) => {
  const projectInstances = projects.map(ensureProjectInstance);
  const clientInstances = clients.map(ensureClientInstance);
  return clientInstances.map((client) => {
    const clientProjects = projectInstances.filter(
      (project) => project.client && project.client.id === client.id
    );
    const totalDuration = clientProjects.reduce(
      (sum, project) => sum + project.duration,
      0
    );
    const totalEarnings = clientProjects.reduce((sum, project) => {
      if (project.isPaid() && project.isCompleted()) {
        return sum + project.calculateEarnings(client.paymentRate);
      }
    }, 0);
    const completedProjects = clientProjects.filter((project) =>
      project.isCompleted()
    ).length;

    const unpaidProjects = clientProjects.filter(
      (project) => !project.isPaid()
    ).length;
    return {
      client: client.toJSON(),
      stats: {
        totalProjects: clientProjects.length,
        completedProjects,
        unpaidProjects,
        totalDuration,
        totalEarnings,
      },
      projects: clientProjects.map((project) => project.toJSON()),
    };
  });
};

export const getEarningsChartData = (projects) => {
  const projectInstances = projects.map(ensureProjectInstance);

  const earningsByMonth = projectInstances.reduce((acc, project) => {
    if (project.isPaid() && project.isCompleted()) {
      const date = new Date(project.createdAt || new Date());
      const monthYear = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      if (!acc[monthYear]) {
        acc[monthYear] = 0;
      }

      const rate = project.client?.paymentRate || 0;
      acc[monthYear] += project.calculateEarnings(rate);
    }
    return acc;
  }, {});

  const labels = Object.keys(earningsByMonth).sort((a, b) => {
    const dateA = new Date(a);
    const dateB = new Date(b);
    return dateA - dateB;
  });

  return {
    labels,
    earnings: labels.map((month) => earningsByMonth[month]),
  };
};

export const getProductivityData = (projects, sessions) => {
  const projectInstances = projects.map(ensureProjectInstance);
  const sessionInstances = sessions.map(ensureSessionInstance);
  const sessionsByDay = sessionInstances.reduce((acc, session) => {
    const date = new Date(session.sessionStart).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { totalWorkSeconds: 0, contentSeconds: 0 };
    }
    acc[date].totalWorkSeconds += session.getDurationSeconds();
    return acc;
  }, {});

  projectInstances.forEach((project) => {
    if (project.isCompleted()) {
      const date = new Date(
        project.createdAt || new Date()
      ).toLocaleDateString();
      if (!sessionsByDay[date]) {
        sessionsByDay[date] = { totalWorkSeconds: 0, contentSeconds: 0 };
      }
      sessionsByDay[date].contentSeconds += project.duration;
    }
  });

  Object.keys(sessionsByDay).forEach((date) => {
    const dayData = sessionsByDay[date];
    if (dayData.totalWorkSeconds > 0) {
      dayData.productivity = (
        dayData.contentSeconds /
        (dayData.totalWorkSeconds / 3600)
      ).toFixed(2);
    } else {
      dayData.productivity = 0;
    }
  });

  const sortedDates = Object.keys(sessionsByDay).sort(
    (a, b) => new Date(a) - new Date(b)
  );
  return {
    labels: sortedDates,
    productivity: sortedDates.map((date) =>
      parseFloat(sessionsByDay[date].productivity || 0)
    ),
    workTime: sortedDates.map(
      (date) => sessionsByDay[date].totalWorkSeconds / 60 || 0
    ),
  };
};
