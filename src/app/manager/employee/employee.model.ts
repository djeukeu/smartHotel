export class Employee {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public image: string,
        public email: string,
        public phone: number,
        public status: string,
        public gender: string
    ) {}
}
