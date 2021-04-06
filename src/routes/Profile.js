import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { authService } from '../fbase';

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch({ type: "LOGOUG" }),
        changeDisplayName: () => dispatch({ type: "DISPLAY_NAME" })
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        nweets: state.nweets
    }
}

const Profile = ({ logout, user, nweets, refreshUser }) => {
    const [newDisplayName, setNewDisplayName] = useState(user.displayName)

    let history = useHistory()

    const userNweets = nweets.filter(nweet => nweet.creatorId === user.id)

    const onClick = () => {
        authService.signOut()
        logout()
        history.push("/")
    }

    const onChange = (e) => {
        setNewDisplayName(e.target.value)
    }

    const onSubmit = async (e) => {
        if (user.displayName !== newDisplayName) {
            e.preventDefault()
            await authService.currentUser.updateProfile({ displayName: newDisplayName })
            refreshUser()
        }
    }
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    type="text"
                    placeholder="Change Nickname"
                    value={newDisplayName}
                    onChange={onChange}
                    autoFocus
                    className="formInput" />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onClick}>
                Log Out
      </span>
            <div>
                {userNweets.map((nweet => <div className="nweet" key={nweet.id} style={{ marginTop: 50 }}>{nweet.text}</div>))}
            </div>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);