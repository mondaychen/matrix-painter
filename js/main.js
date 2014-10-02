$(document).ready(function () {
  var xInput = $('#xValue')
  var yInput = $('#yValue')
  var matrixContainer = $('#matrix-container')
  var outputArea = $('#output')
  var matrixArr = []

  $('#matrix-maker').submit(function(e) {
    e.preventDefault()
    matrixContainer.empty()
    var x = parseFloat(xInput.val())
    var y = parseFloat(yInput.val())
    var square, row
    for (var j = 1; j <= y; j++) {
      row = $('<div class="mat-row"></div>')
      for (var i = 1; i <= x; i++) {
        square = $('<div class="square"></div>')
        square.data('x', i)
        square.data('y', j)
        row.append(square)
      }
      matrixContainer.append(row)
    }
    var width = matrixContainer.width()
    var squares = matrixContainer.find('.square')
    // 3 for borders
    var widthOfSquare = Math.min(width/x - 3, 60)
    squares.width(widthOfSquare)
    squares.height(widthOfSquare)

    resetOutput(x, y)

    squares.on('mousedown', function(e) {
      var sq = $(this)
      var x = sq.data('x'), y = sq.data('y')
      var active = sq.hasClass('active')
      sq[active ? 'removeClass' : 'addClass']('active')
      setOutput(x, y, active)
      console.log('down')
    })
  })

  function resetOutput (x, y) {
    matrixArr = []
    var row = []
    for (var j = 1; j <= y; j++) {
      row = []
      for (var i = 1; i <= x; i++) {
        row.push(0)
      }
      matrixArr.push(row)
    }
    updateOutput()
  }

  function setOutput (x, y, value) {
    matrixArr[y - 1][x - 1] = value ? 0 : 1
    updateOutput()
  }

  function updateOutput () {
    var outStr = ''
    for (var j = 0; j < matrixArr.length; j++) {
      outStr += matrixArr[j].join(' ') + '\r\n'
    }
    outputArea.val(outStr)
  }
})
