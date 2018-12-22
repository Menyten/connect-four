class Board {
  constructor(selector) {
    this.rows = 6;
    this.cols = 7;
    this.selector = selector;
    this.isGameOver = false;
    this.player = 'red';
    this.onPlayerMove = function () {

    }
    this.createBoard();
    this.setupEventListeners();
  }

  // The board should be made up of a 'slot' class
  createBoard() {
    const board = $(this.selector);
    board.empty();
    this.isGameOver = false;
    this.player = 'red';
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
      if (that.isGameOver) {
        return;
      }
      const col = $(this).data('col');
      const lastEmptyCell = findLastEmptyCell(col);
      lastEmptyCell.addClass(`next-${that.player}`);
    });

    board.on('mouseleave', '.col', function () {
      $('.col').removeClass(`next-${that.player}`);
    });

    board.on('click', '.col.empty', function () {
      if (that.isGameOver) {
        return;
      }
      const col = $(this).data('col');
      const lastEmptyCell = findLastEmptyCell(col);
      lastEmptyCell.removeClass(`empty next-${that.player}`);
      lastEmptyCell.addClass(that.player);
      lastEmptyCell.data('player', that.player)

      const winner = that.checkForWinner(lastEmptyCell.data('row'), lastEmptyCell.data('col'));
      if (winner) {
        that.isGameOver = true;
        alert(`Game Over! Player ${that.player} has won!`);
        $('.col.empty').removeClass('empty');
        return;
      }

      that.player = (that.player === 'red') ? 'blue' : 'red';
      that.onPlayerMove();
      $(this).trigger('mouseenter');
    });
  }

  checkForWinner(row, col) {
    const that = this;

    function getCell(i, j) {
      return $(`.col[data-row='${i}'][data-col='${j}']`)
    }

    function checkDirection(direction) {
      let total = 0;
      let i = row + direction.i;
      let j = col + direction.j;
      let next = getCell(i, j);
      while (i >= 0 &&
        i < that.rows &&
        j >= 0 &&
        j < that.cols &&
        next.data('player') === that.player) {
        total++;
        i += direction.i;
        j += direction.j;
        next = getCell(i, j);
      }
      return total;
    }

    function checkWin(directionA, directionB) {
      const total = 1 +
        checkDirection(directionA) +
        checkDirection(directionB);
      if (total >= 4) {
        return that.player;
      } else {
        return null;
      }
    }

    function checkDiagonalBottomLeftToTopRight() {
      return checkWin({ i: 1, j: -1 }, { i: 1, j: 1 });
    }

    function checkDiagonalTopLeftToBottomRight() {
      return checkWin({ i: 1, j: 11 }, { i: -1, j: -1 });
    }

    function checkVerticals() {
      return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 });
    }

    function checkHorizontals() {
      return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 });
    }

    return checkVerticals() || checkHorizontals() || checkDiagonalBottomLeftToTopRight() || checkDiagonalTopLeftToBottomRight();
  }
  restart() {
    this.createBoard();
    this.onPlayerMove();
  }
}