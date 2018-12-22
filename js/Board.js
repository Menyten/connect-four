class Board {
  constructor(selector) {
    this.rows = 6;
    this.cols = 7;
    this.selector = selector;
    this.player = 'red';
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
    const that = this;

    function findLastEmptyCell(col) {
      const cells = $(`.col[data-col='${col}']`);
      for (let i = cells.length - 1; i >= 0; i--) {
        const cell = $(cells[i]);
        if (cell.hasClass('empty')) {
          return cell;
        }
      }
      return null;
    }

    board.on('mouseenter', '.col.empty', function () {
      const col = $(this).data('col');
      const lastEmptyCell = findLastEmptyCell(col);
      lastEmptyCell.addClass(`next-${that.player}`);
    });

    board.on('mouseleave', '.col', function () {
      $('.col').removeClass(`next-${that.player}`);
    });

    board.on('click', '.col.empty', function () {
      const col = $(this).data('col');
      const row = $(this).data('row');
      const lastEmptyCell = findLastEmptyCell(col);
      lastEmptyCell.removeClass(`empty next-${that.player}`);
      lastEmptyCell.addClass(that.player);
      that.player = (that.player === 'red') ? 'blue' : 'red';
      $(this).trigger('mouseenter');

    });
  }

}