export class Deck {
    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    constructor() {
        for (let i = 0; i < 50; i++) {
            this.popQuestions.push("Pop Question " + i);
            this.scienceQuestions.push("Science Question " + i);
            this.sportsQuestions.push("Sports Question " + i);
            this.rockQuestions.push("Rock Question " + i);
          }
    }

    public pickQuestion(category: string): string {
        const questionsByCategory = {
            Pop: this.popQuestions,
            Science: this.scienceQuestions,
            Sports: this.sportsQuestions,
            Rock: this.rockQuestions
        };
        return questionsByCategory[category].shift();
    }
}
