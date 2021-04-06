import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Nweet from '../components/Nweet';
import { dbService } from '../fbase';
import NweetFactory from '../components/NweetFactory';
import { getAllByPlaceholderText } from '@testing-library/dom';


const mapStateToProps = (state) => {
    return {
        nweets: state.nweets
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setNweets: (nweetArray) => dispatch({ type: "SET_NWEETS", nweetArray })
    }
}

const Home = ({ setNweets, nweets }) => {
    useEffect(() => {
        const getData = dbService.collection("nweets").orderBy("createdAt").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(nweetArray);
        })
        return () => getData()
    }, [])
    return (
        <div className="container">
            <NweetFactory />
            <div style={{ marginTop: 30 }}>
                {nweets.map(nweet => (<Nweet key={nweet.id} nweet={nweet} />))}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)