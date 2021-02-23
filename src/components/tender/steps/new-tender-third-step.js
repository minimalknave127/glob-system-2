import React, { useEffect } from "react";
import { GlobCardSection } from "../../design/card";
import TenderTabs from "../tender-tabs";

export const TenderThirdStep = (props) => {

    useEffect(() => {
        console.log(props.items);
    }, []);
    return (
        <GlobCardSection name="Potvrzení tenderu">
            <TenderTabs {...props} />
        </GlobCardSection>
    )
}