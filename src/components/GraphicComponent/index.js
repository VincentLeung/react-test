import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import SVG, { Circle, Defs, G, Line, Rect, Text, Use } from 'react-svg-draw';

const lineHeight = '8';
const solidLineDim = { height: lineHeight, width: 70, x:'0', y:'0' };
const dottedLineDim = { height: lineHeight, width: '32', x:'0', x2: '38', y:'0' };
const textDim = { x: 5, height: 25 };
const blockDim = { margin: { top: 5, bottom: 5, left: 5, right: 5 } };
const unitDim = { margin: { top: 5, bottom: 5, left: 5, right: 5 } };

export const SymbolDefs = () => (
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

export const Block = ({data}) => (
    <SVG width={ solidLineDim.width + blockDim.margin.left + blockDim.margin.right } height={ lineHeight * 4 + textDim.height + blockDim.margin.top + blockDim.margin.bottom }>
        <SymbolDefs /> 
        <Use xlinkHref={lineStyle(data.line3)} x={ blockDim.margin.left } y={ lineHeight * 0 + blockDim.margin.top } />
        <Use xlinkHref={lineStyle(data.line2)} x={ blockDim.margin.left } y={ lineHeight * 2 + blockDim.margin.top } />
        <Use xlinkHref={lineStyle(data.line1)} x={ blockDim.margin.left } y={ lineHeight * 4 + blockDim.margin.top } />
        <Text x={ blockDim.margin.left + textDim.x } y={ lineHeight * 4 + textDim.height + blockDim.margin.top }>{blockName(data)}</Text>
    </SVG>
)

export const Unit = ({data}) => (
    <SVG width={ solidLineDim.width + unitDim.margin.left + unitDim.margin.right } height={ lineHeight * 10 + textDim.height + unitDim.margin.top + unitDim.margin.bottom }>
        <SymbolDefs /> 
        <Use xlinkHref={lineStyle(data.line6)} x={ unitDim.margin.left } y={ lineHeight * 0 + unitDim.margin.top } />
        <Use xlinkHref={lineStyle(data.line5)} x={ unitDim.margin.left } y={ lineHeight * 2 + unitDim.margin.top } />
        <Use xlinkHref={lineStyle(data.line4)} x={ unitDim.margin.left } y={ lineHeight * 4 + unitDim.margin.top } />
        <Use xlinkHref={lineStyle(data.line3)} x={ unitDim.margin.left } y={ lineHeight * 6 + unitDim.margin.top } />
        <Use xlinkHref={lineStyle(data.line2)} x={ unitDim.margin.left } y={ lineHeight * 8 + unitDim.margin.top } />
        <Use xlinkHref={lineStyle(data.line1)} x={ unitDim.margin.left } y={ lineHeight * 10 + unitDim.margin.top } />
        <Text x={ unitDim.margin.left + textDim.x } y={ lineHeight * 10 + textDim.height + unitDim.margin.top }>{unitName(data)}</Text>
    </SVG>
)

const solidLineStyle = {
    stroke: '#006600',
    fill: '#ee0000',
}

const dottedLineStyle = {
    stroke: '#006600',
    fill: '#0000ee',
}

const lineStyle = ( data ) => (
    data ? '#solidLine' : '#dottedLine'
)

function blockName(data) {
    var name = 'octagon.b';
    name += data.line1 ? '1' : '0';
    name += data.line2 ? '1' : '0';
    name += data.line3 ? '1' : '0';
    return data.t(name);
}

function unitName(data) {
    var name = 'octagon.u';
    name += data.line1 ? '1' : '0';
    name += data.line2 ? '1' : '0';
    name += data.line3 ? '1' : '0';
    name += data.line4 ? '1' : '0';
    name += data.line5 ? '1' : '0';
    name += data.line6 ? '1' : '0';
    return data.t(name);
}

