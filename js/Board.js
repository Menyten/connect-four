class Board {
  constructor(selector) {
    this.rows = 6;
    this.cols = 7;
    this.selector = selector;
    this.createBoard();
  }

  createBoard() {
    const board = $(this.selector);
    for (let rows = 0; rows < this.rows; rows++) {
      const row = $('<div>').addClass('row');
      board.append(row);
      for (let cols = 0; cols < this.cols; cols++) {
        const col = $('<div>').addClass('col empty');
        row.append(col);
      }
      console.log(board.html());
    }
  }
}