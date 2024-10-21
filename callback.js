let animals = ['Giraffe', 'Elephant', 'Yak']

// classic call back function
animals.forEach( function(animal){ // function called animal


})
// arrow version - need arrow => do not need to say 
// function
animals.forEach( (animal, index) => {
    console.log(animal,index) // if one line of code, you can omit curly braces, write on one line
} )

// regular callback version
animals.forEach( function(animal) {
    console.log(animal)
})

// arrow version without specifying "function"
animals.forEach( (animal) => {
    console.log(animal)
})

// arrow versiom, no {} only works when one line of code
animals.forEach( (animal) => console.log(animal))
