import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SVG, { Circle, Defs, G, Line, Rect, Text, Use } from 'react-svg-draw';

const lineHeight = '8';
const solidLineDim = { height: lineHeight, width: 70, x:'0', y:'0' };
const dottedLineDim = { height: lineHeight, width: '32', x:'0', x2: '38', y:'0' };
const textDim = { x: 5, height: 25 };
const trigramDim = { margin: { top: 5, bottom: 5, left: 5, right: 5 } };
const hexagramDim = { margin: { top: 5, bottom: 5, left: 5, right: 5 } };

const SymbolDefs = () => (
    <Defs>
        <G id='solidLine'>
            <Rect x={ solidLineDim.x } y={ solidLineDim.y } width={ solidLineDim.width } height={ solidLineDim.height } style={ solidLineStyle } />
        </G>
        <G id='dottedLine'>
            <Rect x={ dottedLineDim.x } y={ dottedLineDim.y } width={ dottedLineDim.width } height={ dottedLineDim.height } style={ dottedLineStyle } />
            <Rect x={ dottedLineDim.x2 } y={ dottedLineDim.y } width={ dottedLineDim.width } height={ dottedLineDim.height } style={ dottedLineStyle } />
        </G>
    </Defs>
)

export const Trigram = ({data}) => {
    let binStr = decToBinStr(data.gramDec, true);
    return (
    <SVG width={ solidLineDim.width + trigramDim.margin.left + trigramDim.margin.right } height={ lineHeight * 4 + textDim.height + trigramDim.margin.top + trigramDim.margin.bottom }>
        <SymbolDefs /> 
        <Use xlinkHref={lineStyle(binStr, 2)} x={ trigramDim.margin.left } y={ lineHeight * 0 + trigramDim.margin.top } />
        <Use xlinkHref={lineStyle(binStr, 1)} x={ trigramDim.margin.left } y={ lineHeight * 2 + trigramDim.margin.top } />
        <Use xlinkHref={lineStyle(binStr, 0)} x={ trigramDim.margin.left } y={ lineHeight * 4 + trigramDim.margin.top } />
        {
            data.showName &&
            <Text x={ trigramDim.margin.left + textDim.x } y={ lineHeight * 4 + textDim.height + trigramDim.margin.top } style={ textStyle }>{trigramName(data.t, data.gramDec, data.nameType)}</Text>
        }
    </SVG>
    )
}

export const Hexagram = ({data}) => {
    let binStr = decToBinStr(data.gramDec, false);
    return (
    <SVG width={ solidLineDim.width + hexagramDim.margin.left + hexagramDim.margin.right } height={ lineHeight * 10 + textDim.height + hexagramDim.margin.top + hexagramDim.margin.bottom }>
        <SymbolDefs /> 
        <Use xlinkHref={lineStyle(binStr, 5)} x={ hexagramDim.margin.left } y={ lineHeight * 0 + hexagramDim.margin.top } />
        <Use xlinkHref={lineStyle(binStr, 4)} x={ hexagramDim.margin.left } y={ lineHeight * 2 + hexagramDim.margin.top } />
        <Use xlinkHref={lineStyle(binStr, 3)} x={ hexagramDim.margin.left } y={ lineHeight * 4 + hexagramDim.margin.top } />
        <Use xlinkHref={lineStyle(binStr, 2)} x={ hexagramDim.margin.left } y={ lineHeight * 6 + hexagramDim.margin.top } />
        <Use xlinkHref={lineStyle(binStr, 1)} x={ hexagramDim.margin.left } y={ lineHeight * 8 + hexagramDim.margin.top } />
        <Use xlinkHref={lineStyle(binStr, 0)} x={ hexagramDim.margin.left } y={ lineHeight * 10 + hexagramDim.margin.top } />
        {
            data.showName &&
            <Text x={ hexagramDim.margin.left + textDim.x } y={ lineHeight * 10 + textDim.height + hexagramDim.margin.top } style={ textStyle }>{hexagramName(data.t, data.gramDec, data.nameType)}</Text>
        }
    </SVG>
    )
}

export const trigramName = (t, gramDec, nameType) => {
    let prefix = nameType ? nameType : 'trigramName';
    return t(prefix + '.' + gramDec);
}

export const hexagramName = (t, gramDec, nameType) => {
    let prefix = nameType ? nameType : 'hexagramName';
    return t(prefix + '.' + gramDec);
}

const solidLineStyle = {
    stroke: '#006600',
    fill: '#ee0000',
}

const dottedLineStyle = {
    stroke: '#006600',
    fill: '#0000ee',
}

const textStyle = {
}

const lineStyle = ( binStr, index ) => (
    +binStr.charAt(index) ? '#solidLine' : '#dottedLine'
)

const decToBinStr = (dec, isTrigram) => {
    let bin = dec.toString(2);
    return isTrigram ? ('000'+bin).slice(-3) : ('000000'+bin).slice(-6);
}
const binStrToDec = (bin) => {
    return parseInt(+bin, 2);
}
