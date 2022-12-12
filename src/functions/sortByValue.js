let sortByValue = function (array) {
    let sorted = array.sort((a, b) => a.value - b.value).reverse()
    return sorted
}

export default sortByValue
