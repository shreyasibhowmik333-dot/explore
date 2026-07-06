import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { fetchAllBookings } from "../features/bookingSlice";

const Booking = () => {
    const dispatch = useDispatch();
    const { bookings, loading, error } = useSelector((state) => state.booking);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(fetchAllBookings());
    }, [dispatch]);

    return (
        <>
            <Navbar />

            <h2 className="text-center w-full m-auto mt-5 text-4xl font-medium text-yellow-700">Bookings</h2>

            {loading && <p>Loading bookings...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && bookings.length === 0 && <p>No bookings found</p>}

            <div>
                {bookings.map((booking) => {
                    const travel = booking.travelId || {};
                    const price = Number(travel.price) || 0;
                    const seats = Number(booking.seats) || 0;
                    const total = price * seats;

                    return (
                        <div
                            key={booking._id}
                            style={{
                                margin: "10px",
                                padding: "10px",
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                            }}
                        >
                            <img className="max-w-sm"
                                src={travel.image}
                                alt={travel.title}
                                width="150"
                                style={{ objectFit: "cover" }}
                            />
                            <div>
                                <h3 className="text-2xl font-medium">{travel.title}</h3>
                                <p>Price per seat: ${price}</p>
                                <p>Seats booked: {seats}</p>
                                <p>Total: ${total}</p>
                                {user?.role === "admin" && booking.userId && (
                                    <p>Booked by: {booking.userId.name || booking.userId.email}</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Booking;
