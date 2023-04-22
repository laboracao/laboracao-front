import { COLORS } from "../styles/colors";
import { Typography } from "@material-ui/core";
import styled from 'styled-components';

const CustomCard = styled('div')`
    :hover{
        // opacity: 0.8;
        box-shadow: 0px 0px 6px #00000030
    }
`

const CardV2 = ({label, title, subtitle, onClick, icon, iconType, background, height}) => {
    return (
        <CustomCard style={{
            cursor: 'pointer',
            background: COLORS[background],
            width: '100%',
            display: 'block',
            height: height ? height : '150px',
            borderRadius: 20,
            border: '2px solid #00000020'
        }}
            onClick={onClick}
        >
            <div style={{
                display: 'flex',
                justifyContent:'flex-end'
            }}>
                {icon && (
                    <div style={{
                        background: COLORS[iconType],
                        color: COLORS.light0,
                        width: '45px',
                        height: '45px',
                        borderRadius: 16,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {icon}
                    </div>
                )}
            </div>
            <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: title ? '100%' : 'auto'
            }}>
                {label && (
                    <div style={{width: '100%', padding: '0px 24px', display: 'flex', alignItems: 'center'}}>
                        <Typography variant="h3">
                            {label}
                        </Typography>
                    </div>
                    
                )}

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0px 24px'
                }}>

                    {title && (
                        <Typography variant="h2">
                            {title}
                        </Typography>
                    )}

                    {subtitle && (
                        <Typography variant="h6">
                            {subtitle}
                        </Typography>
                    )}
                </div>
            </div>
        </CustomCard>
    )
};

export default CardV2;