import {count, gte, pipe, allPass, prop, equals, __, not, filter} from 'ramda'

const white = 'white';
const red = 'red';
const green = 'green';
const blue = 'blue';
const orange = 'orange';

const isWhite = equals(white);
const isRed = equals(red);
const isGreen = equals(green);
const isBlue = equals(blue);
const isOrange = equals(orange);

const getStar = prop('star');
const getSquare = prop('square');
const getTriangle = prop('triangle');
const getCircle = prop('circle');

const getRedStar = pipe(getStar, isRed);
const getGreenSquare = pipe(getSquare, isGreen);
const getWhiteTriangle = pipe(getTriangle, isWhite);
const getWhiteCircle = pipe(getCircle, isWhite);
const getWhiteStar = pipe(getStar, isWhite);
const getBlueCircle = pipe(getCircle, isBlue);
const getOrangeSquare = pipe(getSquare, isOrange);
const getWhiteSquare = pipe(getSquare, isWhite);
const getGreenTriangle = pipe(getTriangle, isGreen);

let notGetRedStar = pipe(getRedStar, not);
let notGetWhiteStar = pipe(getWhiteStar, not);
let notGetWhiteSquare = pipe(getWhiteSquare, not);
let notGetWhiteTriangle = pipe(getWhiteTriangle, not);

const getAllColors = (...args) => Object.values(...args);

const atLeastTwoFigure = gte(__, 2); 
const atLeastFourFigure = gte(__, 4);

const countGreenColors = count(isGreen);

const countNColor = (color) => pipe(getAllColors, count(color));

const allFiguresNColor = (color) => pipe(countNColor(color), atLeastFourFigure); 

const redEqBlue = (colors) => count(isRed, colors) === count(isBlue, colors);

const triangleEqSquare = (args) => getTriangle(args) === getSquare(args);

const twoGreenColorFigure = pipe(getAllColors, countGreenColors, equals(__, 2));
const oneRedColorFigure = pipe(getAllColors, countNColor(isRed), equals(__, 1));

const getCountsColorsWithoutWhite = (args) => getAllColors(args).reduce((counts, element) => element !== white ? (counts[element] = (counts[element] || 0) + 1, counts) : counts, {});
const isThreeFigureOneColor = (args) => gte(filter((x) => x >= 3, Object.values(getCountsColorsWithoutWhite(args))).length, 1); 

// Валидаторы

export const validateFieldN1 = allPass([getRedStar, getGreenSquare, getWhiteTriangle, getWhiteCircle]);

export const validateFieldN2 = pipe(getAllColors, countGreenColors, atLeastTwoFigure);

export const validateFieldN3 = pipe(getAllColors, redEqBlue);

export const validateFieldN4 = allPass([getBlueCircle, getRedStar, getOrangeSquare]);

export const validateFieldN5 = allPass([isThreeFigureOneColor]);

export const validateFieldN6 = allPass([getGreenTriangle, twoGreenColorFigure, oneRedColorFigure]);

export const validateFieldN7 = allFiguresNColor(isOrange);

export const validateFieldN8 = allPass([notGetRedStar, notGetWhiteStar]);

export const validateFieldN9 = allFiguresNColor(isGreen);

export const validateFieldN10 = allPass([triangleEqSquare, notGetWhiteSquare, notGetWhiteTriangle]);