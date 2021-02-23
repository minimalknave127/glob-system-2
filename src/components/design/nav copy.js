import React, { useEffect, useState } from 'react';
import { MDBIcon, MDBSideNavCat, MDBSideNavNav, MDBSideNav, MDBSideNavLink, MDBContainer, MDBRow, MDBBtn } from 'mdbreact';
import { BrowserRouter as Router, withRouter, useHistory } from 'react-router-dom';
import styled from "styled-components";

const Styles = styled.div`
    .logo-wrapper{
        border: none;
    }
    .logo-wrapper > a{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .logo-wrapper > a > img{
        width: 200px;
    }
`;

const NavBar = (props) => {

    const history = useHistory();

    const [show, setShow] = useState(false);

    // alert(props.location.state.from.pathname);
    
    useEffect(() => {
        if(props.location.pathname !== "/login"){
            setShow(true);
        }
        history.listen((location) => {
            if(location.pathname != "/login"){
                setShow(true);
            }else{
                setShow(false);
            }
        })
    })
    if(!show){
        return null;
    }
        return (
               <Styles>
                <MDBContainer>

                    <MDBSideNav

                        logo={require("../../media/GLOB logotype v1-1 - negative - PMS.svg")}
                        fixed
                        breakWidth={1300}
                        className="blue darken-4"

                    >
                        <MDBSideNavNav>
                            <MDBSideNavLink to="/">Domů</MDBSideNavLink>
                            <MDBSideNavCat
                                name="Objednávky"
                                id="submit-blog"
                                icon="chevron-right"
                            >
                                <MDBSideNavLink to="/objednavky">Všechny objednávky</MDBSideNavLink>
                                <MDBSideNavLink to="/objednavky">Vytvořit objednávku</MDBSideNavLink>
                            </MDBSideNavCat>
                            <MDBSideNavCat
                                name="Dodávky"
                                id="instruction"
                                iconRegular
                                icon="hand-pointer"
                                href="#"
                            >
                                <MDBSideNavLink to="/dodavky?action=all">Dodávky</MDBSideNavLink>
                                <MDBSideNavLink>Přidat dodávky</MDBSideNavLink>
                            </MDBSideNavCat>
                        </MDBSideNavNav>
                    </MDBSideNav>
                </MDBContainer>
               </Styles>
        );
    
}
export default withRouter(NavBar);