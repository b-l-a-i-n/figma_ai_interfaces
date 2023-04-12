import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFigmaRawFile } from '../store/figmaFileSlice';

import './counter.scss'

export const Counter = () => {
    const dispatch = useDispatch();
    const figmaFile = useSelector(state => state.figmaFile)

    useEffect(() => {
        console.log(figmaFile)
    }, [figmaFile])

    const fetchFigmaFile = async () => {
        dispatch(getFigmaRawFile())
    }
    return (
        <div>
            <button onClick={fetchFigmaFile}>{figmaFile.status === 'success' ? 'Get markup' : 'Fetch figma file'}</button>
        </div>
    )
}