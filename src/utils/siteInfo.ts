//this file defines and stores all of the sites data, ready to be mapped to a component at a moments notice

interface Images {
    title: string;
    paragraph: string;
    buttonText: string;
    href: string;
    image: string;
    active: Array<boolean>;
    id: number;
}

export const images: Array<Images> = [
    {
        title: 'KLEANSE X TEA',
        paragraph: '',
        buttonText: 'VIEW PRODUCTS',
        href: '/products/all-products',
        image: '/images/models/womenholdingbottle.jpg',
        active: [false, true, false],
        id: 1,
    },
    {
        title: 'KLEANSE  REWARDS',
        paragraph: '',
        buttonText: 'SAVE NOW',
        href: '/prodcts/all-products',
        image: '/images/models/womenwithbrush.jpg',
        active: [false, false, true],
        id: 2,
    }
    // main image slider data
]

export const cards = [{
    title: "TRENDING",
    hovertext: 'VIEW PRODUCTS',
    paragraph: '',
    image: '/images/models/tincturebluebg.jpg',
    about: '',
    alt: '',
}, {
    title: 'NEW ARRIVALS',
    hovertext: 'VIEW PRODUCTS',
    paragraph: '',
    image: '/images/models/tincturebluebg.jpg',
    about: '',
    alt: '',
}, {
    title: 'MORE COMING SOON...',
    hovertext: 'More items coming soon',
    paragraph: '',
    image: '/images/models/tincturebluebg.jpg',
    about: '',
    alt: '',
}
    // main image cards data
]


export const categoryItems = [
    {
        category: 'Mens',
        listItems: [
            {
                title: 'beauty',
            }]
    },
    {
        category: 'Womens',
        listItems: [
            {
                title: 'beauty',
            }]
    },
    {
        category: 'Sale',
        listItems: [
            {
                title: 'beauty',
            }]
    }];

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

