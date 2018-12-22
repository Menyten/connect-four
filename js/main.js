const board = new Board('.connect-four');

board.onPlayerMove = function () {
  $('#player').text(board.player);
}

$('#restart').click(function () {
  board.restart();
});