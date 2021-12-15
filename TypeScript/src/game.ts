import { Deck } from "./deck";
import { Player } from "./Player";

const BOARD_SIZE = 12;
export class Game {
    private purses: Array<number> = [];
    private inPenaltyBox: Array<boolean> = [];
    private currentPlayer: number = 0;
    private isGettingOutOfPenaltyBox: boolean = false;
    private players: Array<Player> = [];

    private deck = new Deck()
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

    public add(name: string): boolean {
        this.players.push(new Player(name));
        this.purses[this.howManyPlayers() - 1] = 0;
        this.inPenaltyBox[this.howManyPlayers() - 1] = false;

        console.log(name + " was added");
        console.log("They are player number " + this.howManyPlayers());

        return true;
    }

    private howManyPlayers(): number {
        return this.players.length;
    }

    public roll(roll: number) {
        console.log(this.getCurrentPlayerName() + " is the current player");
        console.log("They have rolled a " + roll);

        if (this.inPenaltyBox[this.currentPlayer]) {
          if (roll % 2 != 0) {
            this.isGettingOutOfPenaltyBox = true;

            console.log(this.getCurrentPlayerName() + " is getting out of the penalty box");
            this.movePlayer(roll);

            console.log(this.getCurrentPlayerName() + "'s new location is " + this.getCurrentPlayerPlace());
            console.log("The category is " + this.currentCategory());
            this.askQuestion(this.currentCategory());
          } else {
            console.log(this.getCurrentPlayerName() + " is not getting out of the penalty box");
            this.isGettingOutOfPenaltyBox = false;
          }
        } else {

          this.movePlayer(roll);

          console.log(this.getCurrentPlayerName() + "'s new location is " + this.getCurrentPlayerPlace());
          console.log("The category is " + this.currentCategory());
          this.askQuestion(this.currentCategory());
        }
    }

    private getCurrentPlayerName() {
        return this.players[this.currentPlayer].getName();
    }

    private askQuestion(category: string): void {
        console.log(this.deck.pickQuestion(category));
    }

    private currentCategory(): string {
        if (this.getCurrentPlayerPlace() == 0)
            return 'Pop';
        if (this.getCurrentPlayerPlace() == 4)
            return 'Pop';
        if (this.getCurrentPlayerPlace() == 8)
            return 'Pop';
        if (this.getCurrentPlayerPlace() == 1)
            return 'Science';
        if (this.getCurrentPlayerPlace() == 5)
            return 'Science';
        if (this.getCurrentPlayerPlace() == 9)
            return 'Science';
        if (this.getCurrentPlayerPlace() == 2)
            return 'Sports';
        if (this.getCurrentPlayerPlace() == 6)
            return 'Sports';
        if (this.getCurrentPlayerPlace() == 10)
            return 'Sports';
        return 'Rock';
    }

    private getCurrentPlayerPlace() {
        return this.players[this.currentPlayer].getPlace();
    }

    private movePlayer(roll: number) {
        const newPlace = (this.getCurrentPlayerPlace() + roll) % BOARD_SIZE;
        this.players[this.currentPlayer].setPlace(newPlace);
    }

    private didPlayerWin(): boolean {
        return !(this.purses[this.currentPlayer] == 6)
    }

    public wrongAnswer(): boolean {
        console.log('Question was incorrectly answered');
        console.log(this.getCurrentPlayerName() + " was sent to the penalty box");
        this.inPenaltyBox[this.currentPlayer] = true;

        this.currentPlayer += 1;
        if (this.currentPlayer == this.howManyPlayers())
            this.currentPlayer = 0;
        return true;
    }

    public wasCorrectlyAnswered(): boolean {
        if (this.inPenaltyBox[this.currentPlayer]) {
            if (this.isGettingOutOfPenaltyBox) {
              console.log('Answer was correct!!!!');
              this.purses[this.currentPlayer] += 1;
              console.log(this.getCurrentPlayerName() + " now has " +
              this.purses[this.currentPlayer] + " Gold Coins.");

              var winner = this.didPlayerWin();
              this.currentPlayer += 1;
              if (this.currentPlayer == this.howManyPlayers())
                this.currentPlayer = 0;

              return winner;
            } else {
              this.currentPlayer += 1;
              if (this.currentPlayer == this.howManyPlayers())
                this.currentPlayer = 0;
              return true;
            }


          } else {

            console.log("Answer was correct!!!!");

            this.purses[this.currentPlayer] += 1;
            console.log(this.getCurrentPlayerName() + " now has " +
                this.purses[this.currentPlayer] + " Gold Coins.");

            var winner = this.didPlayerWin();

            this.currentPlayer += 1;
            if (this.currentPlayer == this.howManyPlayers())
                this.currentPlayer = 0;

            return winner;
          }
    }

}
