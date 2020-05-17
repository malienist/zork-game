export interface IState {
  getState(): Array<any>;
}

class State implements IState {
  gameState: Array<any>;
  db = [
    {
      id: 1,
      text: "You're in your room. What do you want to do first?",
      options: ["go out", "go to terrace"],
      option1: 2,
      option2: 3
    },
    {
      id: 2,
      text: "Now that you're outside, what do you want to do?",
      options: ["go for a walk", "go swimming", "ride your bike"],
      option1: 4,
      option2: 5,
      option3: 6
    },
    {
      id: 3,
      text:
        "You're on your terrace glancing at the sky. Suddenly a ufo appears infront of you. What do you do?",
      options: ["scream and run into your room scared", "wave at the ufo"],
      option1: 7,
      option2: 8
    },
    {
      id: 4,
      text: "While walking you hear a dog barking behind you. What do you do?",
      options: ["get a stone first", "look back"],
      option1: 0,
      option2: 0
    },
    {
      id: 5,
      text:
        "While swimming you see a shark fin infront of you. What do you do?",
      options: ["swim back to safety", "prepare to face shark head on"],
      option1: 0,
      option2: 0
    },
    {
      id: 6,
      text:
        "While riding your bicycle you see a cat running infront of you. What do you do?",
      options: ["scare the cat", "stop the bike"],
      option1: 0,
      option2: 0
    },
    {
      id: 7,
      text: "You hear the ufo land on your terrace. What do you do?",
      options: ["call the cops", "prepare to die"],
      option1: 0,
      option2: 0
    },
    {
      id: 8,
      text:
        "Seeing you wave the ufo hover right above you very closely. What do you do?",
      options: ["look for aliens", "keep waving"],
      option1: 0,
      option2: 0
    }
  ];
  constructor() {
    this.gameState = this.db;
  }

  getState(): Array<any> {
    return this.gameState;
  }
}

export interface IUser {
  name: string;
  age: number;
  eyeColor: string;
}

class User {
  currentUser: IUser;

  constructor() {
    const username = prompt("Enter user name:");
    const age = prompt(`Hi ${username}, enter your age:`);
    const eyeColor = prompt("Enter eye color:");
    this.currentUser = {
      name: username,
      age: +age,
      eyeColor: eyeColor
    };
  }

  getUser(): IUser {
    return this.currentUser;
  }
}

export interface IGame {
  playGame(questionId: number): void;
}

class Game extends User implements IGame {
  user: IUser;
  moveCount: number = 0;
  gameInstance: Questions = new Questions();

  constructor() {
    super();
    this.playGame(1);
  }

  playGame(questionId: number) {
    if (questionId == 0) alert(`FINISHED GAME WITH ${this.moveCount} moves`);
    else {
      const _question: string = this.gameInstance.loadQuestion(questionId);
      const _options: Array<string> = this.gameInstance.loadOptions(questionId);
      const answer = prompt(
        `${_question} \n\n ${_options.join("\n ")} \n Note: Enter option number below.`
      );
      const nextQuestion = this.gameInstance.nextQuestion(questionId, +answer);
      this.moveCount++;
      this.playGame(nextQuestion);
    }
  }
}

class Questions extends State {
  constructor() {
    super();
  }

  loadQuestion(currentQuestionId): string {
    return super
      .getState()
      .filter(question => question.id === currentQuestionId)[0]["text"];
  }

  loadOptions(currentOptionsId): Array<string> {
    return super
      .getState()
      .filter(option => option.id === currentOptionsId)[0]
      ["options"].map((option, index) => `Option #${index + 1}. ${option} \n`)
      .flat(Infinity);
  }

  nextQuestion(questionId: number, answerId: number): number {
    const answerObject = super
      .getState()
      .filter(question => question.id === questionId)[0];
    return answerObject["option" + answerId];
  }
}

const newGame = new Game();