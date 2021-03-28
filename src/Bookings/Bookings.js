import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { UserContext } from '../App';

const Bookings = () => {
    const [bookings ,setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:5000/bookings?email='+ loggedInUser.email,{
            method:'GET',
                headers: {
                'Content-Type': 'application/json',
                authorization:`Bearer ${sessionStorage.getItem('token')}`

            }
        })

        .then(res =>res.json())
        .then(data =>setBookings(data))

    },[])
    return (
        <div>
            <h3>you have:{bookings.length} bookings now</h3>
        {
            bookings.map((book, id)=> <li key={id}>{book.name} from {new Date(book.checkIn).toDateString('dd/MM/yyyy')} to {new Date(book.checkOut).toDateString('dd/MM/yyyy')}</li>)
        }

            
        </div>
    );
};

export default Bookings;