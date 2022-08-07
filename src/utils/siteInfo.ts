
export const images = [{
    title: 'KLEANSE  X  HYGIENE',
    paragraph: "",
    image: '/images/marketing/kleanse_logo_black_no_background.png',
    active: [true, false, false]
},
{
    title: 'KLEANSE AND COFFEE',
    paragraph: '',
    image: '/images/marketing/kleanse_logo_black.jpg',
    active: [false, true, false]
},
{
    title: 'KLEANSE  REWARDS',
    paragraph: '',
    image: '/images/marketing/kleanse_logo_white_no_background.png',
    active: [false, false, true]
}
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
}]

const generateYears = () => {
    let year = [];
    for (let i = 1940; i <= 2022; i++) {
        year.push(i);
    }
    return year;
}
const years = generateYears();

export const dateData = {
    day: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    year: years
}

