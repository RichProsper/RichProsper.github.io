R(document.body).css({
    margin: 0,
    padding: 0,
    boxSizing: 'border-box'
})

R('#id').css({
    height: '100px',
    padding: '10px',
    backgroundColor: 'red',
    transform: 'skewY(-3deg)',
    transformOrigin: 'top left'
}).addCls('a ab abc def g').remCls('def g')