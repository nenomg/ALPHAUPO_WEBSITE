class mcts_chess {
    constructor(board) {
        this.state = board;
        this.parent = null;
        this.parent_action = null;
        this.children = [];
        this.number_of_visits = 0;
        this.results = [];
        this.results[1] = 0;
        this.results[-1] = 0;
        this.untried_actions = null;
        this.untried_actions = this.get_untried_actions();
    }

    get_untried_actions(){
        this.untried_actions = this.state.getLegalMoves(this.state.toMove);
        return this.untried_actions;
    }

    q(){
        var wins = this.results[1];
        var loses = this.results[-1];
        return wins - loses;
    }

    n(){
        return this.number_of_visits;
    }

    expand(){
        var action = this.untried_actions.pop();
    }
}