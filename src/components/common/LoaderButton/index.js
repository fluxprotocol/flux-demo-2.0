import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Loader from '../Loader';

const LoaderButton = (props) => {
    return (
        <Button onClick={props.onClick} margin={props.margin} color={props.color}>
            {props.children}
            {props.loading && <Loader scale={0.2} inline/>}
        </Button>
    )
}

export default LoaderButton;
