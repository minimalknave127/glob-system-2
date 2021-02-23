import React from "react";
import PropTypes from "prop-types";

export const GlobCard = (props) => {
    return (
        <React.Fragment>
            <h4 className="mb-3"><strong>{props.name}</strong></h4>
            <div className="globCard p-5">
                {props.children}
            </div>
        </React.Fragment>
    )
}

export const GlobCardSection = (props) => {
    return (
        <section className={`mb-5 ${props.className}`}>
            <h6 className="mb-3"><strong>{props.name}</strong></h6>
            {props.children}
        </section>
    )
}
export const GlobCardFooter = (props) => {
    return (
        <section className={"footer mt-5 pt5" + props.className}>
            <hr />
            {props.right ?
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    {props.children}
                </div> : props.children}
        </section>
    )
}
GlobCard.propTypes = {
    name: PropTypes.string
}
GlobCardSection.propTypes = {
    name: PropTypes.string,
    className: PropTypes.string
}
GlobCardFooter.propTypes = {
    right: PropTypes.bool
}