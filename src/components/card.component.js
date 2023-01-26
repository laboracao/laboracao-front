import React from 'react';
import {Card, Box, Typography} from '@material-ui/core';
import styled from 'styled-components';

import img1 from '../assets/1.png';
import img2 from '../assets/2.png';
import img3 from '../assets/3.png';
import img4 from '../assets/4.png';

const CustomCard = styled(Card)`
    border-radius: 12px !important;
    overflow: hidden;
    height: 150px;
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
    padding: 16px;
    cursor: pointer;
    background: ${props => props.background}
`;

const CardContent = styled('div')`
    display: block;
    position: relative;
    z-index: 1;
    width: 100%;
`

const CardTitle = styled(Typography)`
    font-size: 30px !important;
    color: #fff;
    font-weight: 900 !important;
    text-shadow: -3px 3px 3px rgba(0,0,0,0.5);
    position: relative;
    z-index: 1;
    // position: absolute;
`

const CustomImg = styled('img')`
    
    height: auto;
    position: absolute;
    right: 0px;
    margin-top: ${(props) => props.ajust && props.ajust};

    @media(min-width: 960px){
        width: 100%;
        height: auto;
        min-height: 100%;
        margin-top: inherit;
        margin-top: ${(props) => props.ajustDesktop && props.ajustDesktop};
    }
`

const Bg = ({img, ajust, ajustDesktop}) => {
    return (
        <>
            <CustomImg src={img} alt="img" ajust={ajust} ajustDesktop={ajustDesktop} />
        </>
    )
}

const CardComponent = ({title, bg, ajust, action, ajustDesktop, children}) => {

    const img = bg === 1 ? img1 : bg === 2 ? img2 : bg === 3 ? img3 : img4;

    const background = bg === 1 ? "#DA3941" : bg === 2 ? '#E2572F' : bg === 3 ? "#E9751D" : "#4c993f"  

    return (
        <CustomCard bg={img} background={background} onClick={action && action}>
            <Box width="100%">
                <CardTitle>
                    {title}
                </CardTitle>
                <CardContent>
                    {children}
                </CardContent>
            </Box>
            {/* <Bg {...{img, ajust, ajustDesktop}}/> */}
        </CustomCard>
    )
};

export default CardComponent;