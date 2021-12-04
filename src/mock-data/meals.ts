import pic1 from './pictures/190326-spicy-salmon-bowl-horizontal-1556024100.png';
import pic2 from './pictures/002718585.webp';
import pic3 from './pictures/Hot_meal_header_copy.jpg';
import pic4 from './pictures/Honey-garlic-chicken-meal-prep-9.jpg';
import pic5 from './pictures/image.jpeg';
import pic6 from './pictures/Meal-Plan-plate-protein.png';
import { Meal } from '../interfaces/Meal';

export const meals: Meal[] = [
    {
        id: 'meal1',
        picture: pic1,
        date: new Date(2021, 11, 3),
        calories: 600,
        fats: 2,
        carbs: 30,
        protein: 3,
    },
    {
        id: 'meal2',
        picture: pic2,
        date: new Date(2021, 11, 4),
        calories: 600,
        fats: 2,
        carbs: 30,
        protein: 3,
    },
    {
        id: 'meal3',
        picture: pic3,
        date: new Date(2021, 11, 2),
        calories: 600,
        fats: 2,
        carbs: 30,
        protein: 3,
    },
    {
        id: 'meal4',
        picture: pic4,
        date: new Date(2021, 11, 1),
        calories: 600,
        fats: 2,
        carbs: 30,
        protein: 3,
    },
    {
        id: 'meal5',
        picture: pic5,
        date: new Date(2021, 11, 1),
        calories: 600,
        fats: 2,
        carbs: 30,
        protein: 3,
    },
    {
        id: 'meal6',
        picture: pic6,
        date: new Date(2021, 11, 3),
        calories: 600,
        fats: 2,
        carbs: 30,
        protein: 3,
    },
];
