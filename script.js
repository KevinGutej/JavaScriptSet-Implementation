/* Set.js */
class Tuple {
    #first;
    #last;
    constructor (f,s) {
        this.#first = f
        this.#last = s
    }
    get first() {
        return this.#first
    }
    get last() {
        return this.#last
    }

    printTuple(){
        console.log("(" + this.first + ", " + this.last + ")")
    }
}
[13:08]
/* Set.js continuation */
class Set {
    #elements;
    constructor (elems) {
        this.#elements = elems
    }    
    get size() { return this.#elements.length }
    get elements() { return this.#elements }
    get isEmpty() { return this.#elements.length === 0 }
    
    sum(anotherSet) {
        const result = [...this.#elements] // copy the first set not to modify it
        for(let i = 0; i < anotherSet.elements.length; i++) { // loop through the elements of the second set
            if (result.indexOf(anotherSet.elements[i]) === -1) { // apply the instruction below only to the uncommon elements
                result.push(anotherSet.elements[i]) // add this elements to the copied set
            }
        }
        return new Set(result)
    }
    product(anotherSet) {
        const result = [...this.#elements]
        for(let i=0; i < anotherSet.elements.length; i++) {
            if (result.indexOf(anotherSet.elements[i]) === -1) {
                result.splice(result.indexOf(anotherSet.elements[i]), 1)
            }
        }
        return new Set(result)
    }
    isSubsetOf(anotherSet) { return this.#elements.every(elem => anotherSet.elements.includes(elem)) }
    isSupersetOf(anotherSet) { return anotherSet.isSubsetOf(this) }
    equals(anotherSet) { return anotherSet.isSubsetOf(this) && anotherSet.isSupersetOf(this) }
    carthesianProduct(anotherSet) {
        const resultArr = []
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < anotherSet.size; j++) {
                resultArr.push(new Tuple(this.elements[i], anotherSet.elements[j]))
            }
        }
        return new Set(resultArr)
    }
    isSumOf(firstSet, secondSet) {
        const sum = firstSet.sum(secondSet)
        return this.equals(sum)
    }
    isProductOf(firstSet, secondSet) {
        const product = firstSet.product(secondSet)
        return this.equals(product)
    }
    printSet() { console.log(this.#elements) }
}
[13:09]
/* Set.js tests */
const emptySet = new Set([])
const footballers = new Set(["Cristiano Ronaldo","Messi","Mbappe"])
const footballers2 = new Set(["Cristiano Ronaldo","Neymar","Lewandowski"])

// footballers.product(footballers2).printSet() //  ["Cristiano Ronaldo"]
// footballers.sum(footballers2).printSet() //  ["Cristiano Ronaldo", "Messi", "Mbappe", "Neymar","Lewandowski"]
// const sum = footballers.sum(footballers2)
// console.log(sum.isSumOf(footballers, footballers2))
// const product = footballers.product(footballers2)
// console.log(product.isProductOf(footballers, footballers2))
// console.log(footballers.isSubsetOf(footballers2)) // false
// console.log(product.isSubsetOf(footballers2)) // true
// const CR7Set = new Set(["Cristiano Ronaldo"])
// console.log(CR7Set.equals(product)) // true