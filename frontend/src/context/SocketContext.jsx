import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

// Don't initialize the socket immediately - we'll do it in the component
// This allows us to properly configure it with options
const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // Initialize socket with proper CORS and credentials options
        const socketInstance = io(`${import.meta.env.VITE_BASE_URL}`, {
            withCredentials: true,
            transports: ['websocket', 'polling'],
            extraHeaders: {
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
        });

        // Set up event listeners
        socketInstance.on('connect', () => {
            console.log('Connected to server');
            setIsConnected(true);
        });

        socketInstance.on('disconnect', () => {
            console.log('Disconnected from server');
            setIsConnected(false);
        });

        socketInstance.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
        });

        // Store the socket instance in state
        setSocket(socketInstance);

        // Cleanup function to disconnect socket when component unmounts
        return () => {
            if (socketInstance) {
                socketInstance.disconnect();
            }
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;