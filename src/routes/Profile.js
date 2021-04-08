import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import { authService, storageSevice } from '../fbase';
import { v4 as uuidv4 } from "uuid"

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
    const [myPhoto, setMyPhoto] = useState(user.photoURL)

    let history = useHistory()

    const userNweets = nweets.filter(nweet => nweet.creatorId === user.id)

    const onClick = () => {
        authService.signOut()
        logout()
        history.push("/")
    }

    const onChange = (e) => {
        if (e.target.name === "name") {
            setNewDisplayName(e.target.value)
        } else if (e.target.name === "photo") {
            const { target: { files } } = e
            const theFile = files[0]
            const reader = new FileReader()
            reader.readAsDataURL(theFile)
            reader.onload = (finishEvent) => {
                const { target: { result: img } } = finishEvent
                setMyPhoto(img);
            }
        }
    }

    const onSubmit = async (e) => {
        if (user.displayName !== newDisplayName) {
            e.preventDefault()
            await authService.currentUser.updateProfile({ displayName: newDisplayName })
            refreshUser()
        }
        if (user.photoURL !== myPhoto) {
            e.preventDefault()
            let photoUrl = ""
            const imgRef = storageSevice.ref().child(`${user.id}/${uuidv4()}`)
            const response = await imgRef.putString(myPhoto, "data_url")
            photoUrl = await response.ref.getDownloadURL();
            await authService.currentUser.updateProfile({ photoURL: photoUrl })
            refreshUser()
        }
    }

    return (<>
        {user.photoURL ?
            <img className="profilePhoto" src={myPhoto} />
            :
            <a href="/">
                <img className="profilePhoto" src="data:image/png;base64,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" />
            </a>
        }
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    type="text"
                    placeholder="Change Nickname"
                    value={newDisplayName}
                    onChange={onChange}
                    name="name"
                    autoFocus
                    className="formInput" />
                <label htmlFor="photoUrl" className="photoBtn">
                    Change My Photo
                </label>
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
                <input
                    onChange={onChange}
                    name="photo"
                    id="photoUrl"
                    type="file"
                    accept="image/*"
                    style={{
                        opacity: 0,
                    }} />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onClick}>
                Log Out
            </span>
            <div>
                {userNweets.map((nweet => <div className="nweet" key={nweet.id} style={{ marginTop: 50 }}>{nweet.text}</div>))}
            </div>
        </div>
    </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);