export class Character {
    constructor(
        public name: string,
        public characteristics: {
            height: string,
            weight: string,
            eyes: string,
            hair: string
        },
        public biography: {
            bio?: string
        }
    ) {

    }
}