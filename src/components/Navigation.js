import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const Navigaton = ({ user }) => {
    return (
        <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
            <li><Link to="/" style={{ marginRight: 10 }}>
                <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
            </Link>
            </li>
            <li>
                <Link
                    to="/profile"
                    style={{
                        marginLeft: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontSize: 12,
                    }}>
                    <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
                    <span style={{ marginTop: 10 }}>
                        {user.displayName}'s Profile
                    </span>
                </Link>
            </li>
        </ul >
    );
}

export default connect(mapStateToProps)(Navigaton);