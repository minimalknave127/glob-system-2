import React from "react";
import styled from "styled-components";

const Styles = styled.div`
    .glob-title-wrapper{
        width: 100%;
        height: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
    .glob-title-image-wrapper{
        border-radius: 50%;
        background-color: #EAF1F9;
        padding: 1.3rem;
    }
    .glob-title-image-wrapper img{
        width: 50px;
        height: 50px;
    } hr{
        width: 100%;
    }
    h4{
        font-weight: 400 !important;
    }
`;


export const Title = (props) => {
    return (
        <Styles>
            <div className={"glob-title-wrapper mb-4 " + props.className}>
                <div className="glob-title-image-wrapper mb-3">
                    <img src={props.icon || require("../../../assets/icons/shopping-bag.svg")} alt="description icon" />
                </div>
                <h4>{props.title || "Nadpis"}</h4>
                <hr />
            </div>
        </Styles>
    )
}