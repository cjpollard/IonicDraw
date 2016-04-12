export class Character {
    constructor(
        public name: string,
        public characteristics: {
            height: number,
            weight: number,
            eyes: string,
            hair: string
        },
        public biography: {
            bio?: string
        }
    ) {

    }
}