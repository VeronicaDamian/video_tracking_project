class Session{
    constructor({
        id = null,
        projectId,
        sessionStart = new Date().toISOString(),
        sessionEnd = null,
        notes = '',
        activityType = 'editing'
    }) {
        this.id = id;
        this.projectId = projectId;
        this.sessionStart = sessionStart;
        this.sessionEnd = sessionEnd;
        this.notes = notes;
        this.activityType = activityType;
    };

    getDurationSeconds(){
        if (!this.sessionEnd) return 0;
        
        const startTime = new Date(this.sessionStart).getTime();
        const endTime = new Date(this.sessionEnd).getTime();

        return (endTime - startTime) / 1000;
    }

    getDurationMinutes() {
        return this.getDurationSeconds() / 60;
    }

    getDurationHours() {
        return this.getDurationSeconds() / 3600;
    }

    isActive(){
        return this.sessionStart && !this.sessionEnd
    }

    end(){
        if (!this.sessionEnd) this.sessionEnd = new Date().toISOString;
        return this;
    }

    static fromJSON(json) {
        return new Session(JSON.parse(json));
    }

    static fromObject(obj) {
        return new Session(obj);
    }

    toJSON() {
        return {
            id: this.id,
            projectId: this.projectId,
            sessionStart: this.sessionStart,
            sessionEnd: this.sessionEnd,
            notes: this.notes,
            activityType: this.activityType
        };
    }

};