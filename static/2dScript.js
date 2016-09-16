// top left right bottom
var ACTIVE_RULES = [

]

function randState() {
    return Math.random() < .5 ? 0 : 1
}

function createArray(row, col) {
    let arr = [row][col]
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            arr[i][j] = randState()
        }
    }
}

function generate(arr) {
    let nArr = [][];
    let rlength = arr.length
    for (let i = 0; i < rlength; i++) {
        let clength = arr[i].length
        for (let j = 0; j < clength; j++) {
            let top = (i - 1) < 0 ? arr[rlength -1][j] : arr[i - 1][j]
            let left = (j - 1) < 0 ? arr[i][clength - 1] : arr[i][j -1]
            let right = (j + 1) < clength ? arr[i][j + 1] : arr[i][0]
            let bottom = (i + 1) < rlength ? arr[i+1][j] : arr[0][j]

            oldState = [top, left, right, bottom]
            nArr[i][j] = applyState(oldState)
        }
    }
    return nArr
}

function checkState(state) {
    var v = ACTIVE_RULES.some( (currentValue) => {
                return currentValue.toString() === state.toString()
            })
    return v
}
