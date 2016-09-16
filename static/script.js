var wrapper = document.querySelector('.sec')

var ACTIVE_RULES = [
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 0],
    [0, 1, 1],
    [0, 1, 0],
    [0, 0, 1],
]

function randState() {
    return Math.random() < .5 ? 0 : 1
}

function createInitialState(n) {
    var newState = []
    for (var i = 0; i < n; i++) {
        newState.push(randState())
    }
    return newState
}

function nextGen(gen) {
    var newState = []
    for (var i = 0; i < gen.length; i++) {
        var left = (gen[i - 1] != undefined)? gen[i - 1] : gen[gen.length - 1]
        var right = (gen[i + 1] != undefined)? gen[i + 1] : gen[gen.length - 1]
        var target = gen[i]
        newState.push(+applyState([left, target, right]))
    }
    return newState
}

function applyState(state) {
    var v = ACTIVE_RULES.some( (currentValue) => {
                return currentValue.toString() === state.toString()
            })
    return v
}


//
var createRow = (arr, dim) => {
    var row = document.createElement('div')
    row.style.height = dim + 'px'
    row.className = 'row'

    arr.forEach((state) => {
        var col = document.createElement('div')
        col.style.width = dim + 'px'
        col.style.height = dim + 'px'
        if (state)
            col.className = 'active'
        else
            col.className = 'inactive'
        row.appendChild(col)
    })

    return row;
}

function wrapperAppend(el, succ) {
    wrapper.appendChild(el)
    succ()
}
function calculateWidth() {
    let width = wrapper.clientWidth
    return +(width/200)
}

function runElementary() {
    let arr = createInitialState(200)
    let dim = parseInt(calculateWidth());

    row = createRow(arr, dim)
    wrapperAppend(row, function() {
        let i = 0
        let g = setInterval(function(){
            arr = nextGen(arr)
            row = createRow(arr, dim)
            wrapper.appendChild(row)
            i++;
            if (i > 100)
                clearInterval(g)
        }, 10)
    })
}
