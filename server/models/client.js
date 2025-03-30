class Client {
    constructor({
        id = null,
        name,
        niche="",
        paymentRate=0,
        email="",
        phone="", 
        notes="",
        createdAt = new Date().toISOString()

    }) {
        this.id = id;
        this.name = name;
        this.niche = niche;
        this.paymentRate = this.validatePaymentRate(paymentRate);
        this.email = email;
        this.phone = phone;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    validatePaymentRate(paymentRate) {
        return paymentRate < 0 ? 0 : paymentRate;
    };

    calculateProjectEarnings(duration) {
        return this.paymentRate * duration 
    }

    static fromJSON(json) {
        return new Client(JSON.parse(json));
    }
    
    static fromObject(obj) {
        return new Client(obj);
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            niche: this.niche,
            paymentRate: this.paymentRate,
            email: this.email,
            phone: this.phone,
            notes: this.notes,
            createdAt: this.createdAt
        };
    }
};

export default Client;