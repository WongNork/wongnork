// get all the stars
const one = document.getElementById('first')
const two = document.getElementById('second')
const three = document.getElementById('third')
const four = document.getElementById('forth')
const five = document.getElementById('fifth')


const form = document.querySelector('.rate')
const confirmBox = document.querySelector('confirm-box')
const csrf = document.getElementsByName('csrfmiddlewaretoken')

console.log(csrf)
console.log(form)
console.log(confirmBox)

console.log(one)

// optimize the star 
const handleSelect = (selection) => {
    switch (selection) {
        case 'first':
            {
                one.classList.add('checked')
                two.classList.remove('checked')
                three.classList.remove('checked')
                four.classList.remove('checked')
                five.classList.remove('checked')
                return
            }
        case 'second':
            {
                one.classList.add('checked')
                two.classList.add('checked')
                three.classList.remove('checked')
                four.classList.remove('checked')
                five.classList.remove('checked')
                return
            }
        case 'third':
            {
                one.classList.add('checked')
                two.classList.add('checked')
                three.classList.add('checked')
                four.classList.remove('checked')
                five.classList.remove('checked')
                return
            }
        case 'forth':
            {
                one.classList.add('checked')
                two.classList.add('checked')
                three.classList.add('checked')
                four.classList.add('checked')
                five.classList.add('checked')
                return
            }
        case 'fifth':
            {
                one.classList.add('checked')
                two.classList.add('checked')
                three.classList.add('checked')
                four.classList.add('checked')
                five.classList.add('checked')
                return
            }
    }
}

const arr = [one, two, three, four, five]

arr.forEach(item => item.addEventListener('mouseover', (event => {
    handleSelect.log(event.target.id)
})))