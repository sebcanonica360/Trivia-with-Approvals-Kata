type Category = "Pop" | "Rock" | "Science" | "Sports";

export class Game {

    private players: Array<string> = [];
    private places: Array<number> = [];
    private purses: Array<number> = [];
    private inPenaltyBox: Array<boolean> = [];
    private currentPlayer: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;

    private popQuestions: Array<string> = [];
    private scienceQuestions: Array<string> = [];
    private sportsQuestions: Array<string> = [];
    private rockQuestions: Array<string> = [];

    constructor(private readonly logger) {
        for (let i = 0; i < 50; i++) {
            this.popQuestions.push(this.createQuestion("Pop", i));
            this.scienceQuestions.push(this.createQuestion("Science", i));
            this.sportsQuestions.push(this.createQuestion("Sports", i));
            this.rockQuestions.push(this.createQuestion("Rock", i));
          }
    }

    private createQuestion(category: Category, index: number): string {
        return `${category} Question ${index}`;
    }

    public add(name: string): boolean {
        this.players.push(name);
        this.places[this.howManyPlayers() - 1] = 0;
        this.purses[this.howManyPlayers() - 1] = 0;
        this.inPenaltyBox[this.howManyPlayers() - 1] = false;

        this.logger.info(name + " was added");
        this.logger.info("They are player number " + this.players.length);

        return true;
    }

    private howManyPlayers(): number {
        return this.players.length;
    }

    public roll(roll: number) {
        this.logger.info(this.players[this.currentPlayer] + " is the current player");
        this.logger.info("They have rolled a " + roll);

        if (this.inPenaltyBox[this.currentPlayer]) {
          if (roll % 2 != 0) {
            this.isGettingOutOfPenaltyBox = true;

            this.logger.info(this.players[this.currentPlayer] + " is getting out of the penalty box");
            this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
            if (this.places[this.currentPlayer] > 11) {
              this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
            }

            this.logger.info(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
            this.logger.info("The category is " + this.currentCategory());
            this.askQuestion();
          } else {
            this.logger.info(this.players[this.currentPlayer] + " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
          }
        } else {

          this.places[this.currentPlayer] = this.places[this.currentPlayer] + roll;
          if (this.places[this.currentPlayer] > 11) {
            this.places[this.currentPlayer] = this.places[this.currentPlayer] - 12;
          }

          this.logger.info(this.players[this.currentPlayer] + "'s new location is " + this.places[this.currentPlayer]);
          this.logger.info("The category is " + this.currentCategory());
          this.askQuestion();
        }
    }

    private askQuestion(): void {
        if (this.currentCategory() == 'Pop')
            this.logger.info(this.popQuestions.shift());
        if (this.currentCategory() == 'Science')
            this.logger.info(this.scienceQuestions.shift());
        if (this.currentCategory() == 'Sports')
            this.logger.info(this.sportsQuestions.shift());
        if (this.currentCategory() == 'Rock')
            this.logger.info(this.rockQuestions.shift());
    }

    private currentCategory(): Category {
        const CATEGORIES: Category[] = ["Pop", "Science", "Sports", "Rock"];
        return CATEGORIES[this.places[this.currentPlayer] % CATEGORIES.length];
    }

    private didPlayerWin(): boolean {
        return this.purses[this.currentPlayer] != 6;
    }

    public wrongAnswer(): boolean {
        this.logger.info('Question was incorrectly answered');
        this.logger.info(this.players[this.currentPlayer] + " was sent to the penalty box");
        this.inPenaltyBox[this.currentPlayer] = true;

        this.currentPlayer += 1;
        if (this.currentPlayer == this.players.length)
            this.currentPlayer = 0;
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        if (this.inPenaltyBox[this.currentPlayer]) {
            if (this.isGettingOutOfPenaltyBox) {
              this.logger.info('Answer was correct!!!!');
              this.purses[this.currentPlayer] += 1;
              this.logger.info(this.players[this.currentPlayer] + " now has " +
              this.purses[this.currentPlayer] + " Gold Coins.");

              var winner = this.didPlayerWin();
              this.currentPlayer += 1;
              if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;

              return winner;
            } else {
              this.currentPlayer += 1;
              if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;
              return true;
            }


          } else {

            this.logger.info("Answer was correct!!!!");

            this.purses[this.currentPlayer] += 1;
            this.logger.info(this.players[this.currentPlayer] + " now has " +
                this.purses[this.currentPlayer] + " Gold Coins.");

            var winner = this.didPlayerWin();

            this.currentPlayer += 1;
            if (this.currentPlayer == this.players.length)
                this.currentPlayer = 0;

            return winner;
          }
    }

}
