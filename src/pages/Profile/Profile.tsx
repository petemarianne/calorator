import React, { useEffect, useState } from 'react';
import { meals } from '../../mock-data/meals';
import { useScreenSize } from '../../hooks/useScreenSize';
import avatar from '../../mock-data/pictures/43f5bfb35855873024c03e7507f31ec5.jpeg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import './Profile.scss';
import { IconButton } from '@material-ui/core';
import { Meal } from '../../interfaces/Meal';

const Profile: React.FC = (): JSX.Element => {
    const {desktop} = useScreenSize();

    const [date, setDate] = useState<Date>(new Date);
    const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
    const [total, setTotal] = useState<{
        calories: number,
        fats: number,
        carbs: number,
        protein: number,
    }>({
        calories: 0,
        fats: 0,
        carbs: 0,
        protein: 0,
    })

    useEffect(() => {
        setTotal({
            calories: 0,
            fats: 0,
            carbs: 0,
            protein: 0,
        });
        const array: Meal[] = meals.filter(item => item.date.getFullYear() === date.getFullYear() && item.date.getMonth() === date.getMonth() && item.date.getDate() === date.getDate());
        setFilteredMeals(array);
        array.forEach(item => {
            setTotal(prevState => ({
                calories: prevState.calories + item.calories,
                fats: prevState.fats + item.fats,
                carbs: prevState.carbs + item.carbs,
                protein: prevState.protein + item.protein,
            }))
        })
    }, [date])

    const mealWrapper = filteredMeals.map((item, index) => {
            return (
                <div
                    key={index}
                    className='ad-wrapper'
                >
                    <div className='pic-wrapper'><img src={item.picture} alt='dog'/></div>
                    <div className='info-wrapper'>
                        <div className='description'>Calories: {item.calories}</div>
                        <div className='description'>Fat: {item.fats}g</div>
                        <div className='description'>Protein: {item.protein}g</div>
                        <div className='description'>Carbs: {item.carbs}g</div>
                    </div>
                </div>
            );
    });

    return (
        <div className='profile-page'>
            {desktop && (
                <div className='profile-info'>
                    <div className='avatar'><img src={avatar} alt='avatar'/></div>
                    <div>
                        <div className='name-edit-button'>
                            <div className='name'>Emma Chemberlain</div>
                        </div>
                        <div className='date'>
                            Date of registration: {new Date(2021, 11, 1).toLocaleString('default', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'})}
                        </div>
                    </div>
                </div>
            )}
            {!desktop && (
                <div className='profile-info-mobile'>
                    <div className='avatar'><img src={avatar} alt='avatar'/></div>
                    <div className='name-edit-button'>
                        <div className='name'>Emma Chemberlain</div>
                    </div>
                    <div className='date'>Date of registration: {new Date(2021, 11, 1).toLocaleString('default', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'})}
                    </div>
                </div>
            )}
            <div className='date-controller-wrapper'>
                <IconButton
                    aria-label='lose'
                    size='medium'
                    color='primary'
                    className='edit-button'
                    onClick={() => setDate(prevState => new Date(prevState.getFullYear(), prevState.getMonth(), prevState.getDate() - 1))}
                >
                    <ArrowBackIosIcon fontSize='medium'/>
                </IconButton>
                <div className='diary-date'>{date.toLocaleString('default', {day: 'numeric', month: 'long', year: 'numeric'})}</div>
                <IconButton
                    aria-label='lose'
                    size='medium'
                    color='primary'
                    className='edit-button'
                    onClick={() => setDate(prevState => new Date(prevState.getFullYear(), prevState.getMonth(), prevState.getDate() + 1))}
                >
                    <ArrowForwardIosIcon fontSize='medium'/>
                </IconButton>
            </div>
            {filteredMeals.length === 0 ? <div className='nothing-added'>Nothing added this day!</div> : mealWrapper}
            {filteredMeals.length === 0 ? null : <div className='total'>Total: {total.calories} calories, {total.fats}g fats, {total.protein}g proteins, {total.carbs}g carbs</div>}
        </div>
    );
}

export default Profile;