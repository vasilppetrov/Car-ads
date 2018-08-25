export class AdCreate {
    constructor(
        public name: string,
        public imagePath: string,
        public description: string,
        public userUID: string,
        public fuel: string,
        public price: number
    ) { }
}
