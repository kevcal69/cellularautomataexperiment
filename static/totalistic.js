var wrapper = document.querySelector('.sec')

function totalistic() {
    let rules = [2, 1, 0, 1, 2, 1, 0]
    var state = [0, 1, 2]
    let colors  = ['#2DBB28', '#235021', '#387A36']

    function randState() {
        return parseInt(Math.random() * 3)
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
        return rules[state.reduce((a, b) => a + b, 0)]
    }

    var createRow = (arr, dim) => {
        var row = document.createElement('div')
        row.style.height = dim + 'px'
        row.className = 'row'

        arr.forEach((state) => {
            var col = document.createElement('div')
            col.style.width = dim + 'px'
            col.style.height = dim + 'px'
            col.style.backgroundColor = colors[state]
            row.appendChild(col)
        })

        return row;
    }

    function calculateWidth() {
        let width = wrapper.clientWidth
        return +(width/200)
    }

    function wrapperAppend(el, succ) {
        wrapper.appendChild(el)
        succ()
    }

    return {
        runTotalistic: function() {
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
        },
        empty: function() {
            while (wrapper.firstChild) {
                wrapper.removeChild(wrapper.firstChild)
            }
        }
    }
}
