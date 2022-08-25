//this file defines and stores all of the sites data, ready to be mapped to a component at a moments notice 
export const images = [{
    title: 'KLEANSE  X  HYGIENE',
    paragraph: "",
    buttonText: 'READ MORE',
    href: '',
    image: '/images/models/womenwithflower.jpg',
    active: [true, false, false]
},
{
    title: 'KLEANSE X TEA',
    paragraph: '',
    buttonText: 'VIEW PRODUCTS',
    href: '',
    image: '/images/models/womenputtingcream.jpg',
    active: [false, true, false]
},
{
    title: 'KLEANSE  REWARDS',
    paragraph: '',
    buttonText: 'SAVE NOW',
    href: '',
    image: '/images/models/womenwithbrush.jpg',
    active: [false, false, true]
}
    // main image slider data
]

export const cards = [{
    title: "TRENDING",
    hovertext: 'VIEW PRODUCTS',
    paragraph: '',
    image: '',
    about: ''
}, {
    title: 'NEW ARRIVALS',
    hovertext: 'VIEW PRODUCTS',
    paragraph: '',
    image: '',
    about: ''
}, {
    title: 'MORE COMING SOON...',
    hovertext: 'More items coming soon',
    paragraph: '',
    image: '',
    about: ''
}
    // main image cards data
]

const generateYears = () => {
    let year = [];
    for (let i = 1940; i <= 2022; i++) {
        year.push(i);
    }
    return year;
    // generates years
}
const years = generateYears();

export const dateData = {
    day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    year: years

    //used to fill date of birth elements
}

