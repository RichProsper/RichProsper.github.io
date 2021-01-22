// console.log( R('.a') )

// console.log(document.querySelectorAll('a'))

// console.log(new RDOM(document.body))

// console.log(typeof {a: 'a', b: 'b'})

// console.log(document.querySelectorAll('#id'))

console.log(R(document.querySelectorAll('#id + .a')).css({
    height: '100px',
    backgroundColor: 'red'
}))

// console.log(document.getElementsByClassName('a'))