class Project {
    constructor({
        id = null,
        title,
        client,
        status = 'Not Started',
        duration = 0,
        paymentStatus = 'unpaid',
        tags = [],
        createdAt = new Date().toISOString()
    }) {
        this.id = id;
        this.title = title;
        this.client = client;
        this.status = this.validateStatus(status);
        this.duration = this.validateDuration(duration);
        this.paymentStatus = this.validatePaymentStatus(paymentStatus);
        this.tags = Array.isArray(tags) ? tags : [];
        this.createdAt = createdAt;
    };

    validateDuration(duration){
        const parsedDuration = parseFloat(duration);

        if (parsedDuration < 0 ) return 0;
        return parsedDuration;
    }

    validateStatus(status){
        const validStatuses = ["Not Started", "In Progress", "Done"] 

        return validStatuses.includes(status) ? status : "Not Started";
    }

    validatePaymentStatus(paymentStatus) {
        const validPaymentStatuses = ["unpaid", "paid"]

        return validPaymentStatuses.includes(paymentStatus) ? paymentStatus : "unpaid";
    }

    isCompleted(){
        return this.status === "Done";
    }

    isPaid(){
        return this.paymentStatus === "paid";
    }

    calculateEarnings(rate){
        return rate * this.duration;
    }

    static fromJSON(json) {
        return new Project(JSON.parse(json));
    }

    static fromObject(obj) {
        return new Project(obj);
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            client: this.client,
            status: this.status,
            duration: this.duration,
            paymentStatus: this.paymentStatus,
            tags: this.tags,
            createdAt: this.createdAt
        };
    }
};

export default Project;