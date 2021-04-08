import React, { useState } from 'react';
import { connect } from 'react-redux';
import { dbService, storageSevice } from '../fbase';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => {
    return {
        user: state.user,
    }
}

const Nweet = ({ nweet, user }) => {
    const [editing, setEditing] = useState(false)
    const [newNweet, setNweNweet] = useState(nweet.text)

    const onDeleteClick = async () => {
        const ok = window.confirm("뉴윗을 정말 지우겠습니까?")
        if (ok) {
            await dbService.doc(`nweets/${nweet.id}`).delete()
            if (nweet.imgUrl !== "") {
                await storageSevice.refFromURL(nweet.imgUrl).delete()
            }
        }
    }
    const toggleEditing = () => {
        setEditing(prev => !prev)
    }
    const onSubmit = async (e) => {
        e.preventDefault()
        await dbService.doc(`nweets/${nweet.id}`).update({
            text: newNweet
        })
        setEditing(false)
    }
    const onChange = (e) => {
        const { target: { value } } = e
        setNweNweet(value)
    }
    return (
        <div className="nweet">
            {editing ? <>
                {nweet.creatorId === user.id && (
                    <>
                        <form onSubmit={onSubmit} className="container nweetEdit">
                            <input
                                onChange={onChange}
                                type="text"
                                placeholder="Editing your nweet!"
                                value={newNweet}
                                autoFocus
                                className="formInput" />
                            <input type="submit" value="Change" />
                        </form>
                        <input className="formBtn cancelBtn" type="button" onClick={toggleEditing} value="Cancle Editing"></input>
                    </>
                )}
            </> : <>
                <div>{nweet.text}</div>
                {nweet.imgUrl && <img src={nweet.imgUrl} />}
                {nweet.creatorId === user.id && (
                    <div className="nweet__actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={toggleEditing}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>
                )}
                <div className="nweet_creator">creator: {nweet.creator}</div>
            </>}
        </div>
    )


}

export default connect(mapStateToProps)(Nweet)