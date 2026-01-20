import React, { createContext, useEffect, useState, useContext } from 'react';
import Peer from 'peerjs';

interface PeerContextType {
    peer: Peer | null;
    myPeerId: string;
}

const PeerContext = createContext<PeerContextType>({ peer: null, myPeerId: '' });

export const usePeer = () => useContext(PeerContext);

export const PeerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [peer, setPeer] = useState<Peer | null>(null);
    const [myPeerId, setMyPeerId] = useState<string>('');

    useEffect(() => {
        // Initializing Peer
        const newPeer = new Peer();

        newPeer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
            setMyPeerId(id);
        });

        newPeer.on('error', (err) => {
            console.error('Peer error:', err);
        });

        setPeer(newPeer);

        return () => {
            newPeer.destroy();
        };
    }, []);

    return (
        <PeerContext.Provider value={{ peer, myPeerId }}>
            {children}
        </PeerContext.Provider>
    );
};
