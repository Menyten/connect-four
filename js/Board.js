class Board {
  constructor(selector) {
    this.rows = 6;
    this.cols = 7;
    this.selector = selector;
    this.createBoard();
    this.setupEventListeners();
  }

  // The board should be made up of a 'slot' class
  createBoard() {
    const board = $(this.selector);
    for (let rows = 0; rows < this.rows; rows++) {
      const row = $('<div>').addClass('row');
      board.append(row);
      for (let cols = 0; cols < this.cols; cols++) {
        const col = $('<div>')
          .addClass('col empty')
          .attr('data-col', cols)
          .attr('data-row', rows);
        row.append(col);
      }
      console.log(board.html());
    }
  }

  setupEventListeners() {
    const board = $(this.selector);

    function findLastEmptyCell(col) {
      const cells = $(`.col[data-col='${col}']`);
      for (let i = cells.length - 1; i >= 0; i--) {
        const cell = $(cells[i]);
        if (cell.hasClass('empty')) {
          return cell;
        }
      }
      console.log(cells);
    }

    board.on('mouseenter', '.col.empty', function () {
      const col = $(this).data('col');
      const lastEmptyCell = findLastEmptyCell(col);
      lastEmptyCell.addClass('next-red');
      console.log(col);
    });

    board.on('mouseleave', '.col', function () {
      $('.col').removeClass(`next-red`);
    });
  }

}