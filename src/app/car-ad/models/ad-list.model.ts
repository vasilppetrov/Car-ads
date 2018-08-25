export class AdList {
    constructor(
        public id: string,
        public name: string,
        public imagePath: string,
        public description: string,
        public fuel: string,
        public userUID: string,
        public price: number
    ) { }
}
