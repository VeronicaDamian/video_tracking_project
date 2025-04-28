import React, { createContext, useContext, useState, useCallback } from "react";

const ProjectContext = createContext();

export const useProjectContext = () => {
    const context = useContext(ProjectContext);
    if (!context) {
        throw new Error("useProjectContext must be used within a ProjectProvider");
    }
    return context;
};

export const ProjectProvider = ({ children }) => {
    // State to track changes to projects
    const [projectChangeCount, setProjectChangeCount] = useState(0);

    // Function to notify the context that a project has changed
    const notifyProjectChange = useCallback(() => {
        setProjectChangeCount((prev) => prev + 1);
    }, []);

    // Values to be provided by the context
    const value = {
        projectChangeCount,
        notifyProjectChange,
    };

    return (
        <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
    );
};

export default ProjectContext;