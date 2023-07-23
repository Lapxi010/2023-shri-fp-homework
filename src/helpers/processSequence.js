import {gt, allPass, test, pipe, partial, ifElse, prop, otherwise} from 'ramda'

import Api from '../tools/api';

const api = new Api();

const urlNumbersApi = 'https://api.tech/numbers/base'
const urlAnimalsApi = 'https://animals.tech/'
const validationMessage = 'ValidationError'

const moreThenTwoNumbers = (value) => gt(value.length, 2)
const lessThenThreeNumbers = (value) => gt(10, value.length)
const isNumber = test(/^[0-9]+(\.[0-9]+)?$/)

const asyncThen = (fn, p) => fn.then(x => p(x));

const numberAndRoundString = pipe(Number, Math.round)
const translateResInString = pipe(prop('result'), String);
const getLengthString = (args) => args.length;
const getSquareNumber = (args) => args ** 2
const getRemainderDivisionThreeNumber = (args) => args % 3;
const getTransformUrl = (args) => urlAnimalsApi + args
const getAnimal = (args) => api.get(args, {})

const getResultFromRes = (args) => asyncThen(args, translateResInString);
const getLengthFromRes = (args) => asyncThen(args, getLengthString);
const getSquareFromRes = (args) => asyncThen(args, getSquareNumber)
const getRemainderDivisionThreeFromRes = (args) => asyncThen(args, getRemainderDivisionThreeNumber)
const getTransformUrlFromRes = (args) => asyncThen(args, getTransformUrl)
const getAnimalFromRes = (args) => asyncThen(args, getAnimal)

const translateNumberFromTenInTwo = (value) => api.get(urlNumbersApi, {from: 10, to: 2, number: value})

const validateInputString = allPass([moreThenTwoNumbers, lessThenThreeNumbers, isNumber])

const processSequence = ({value, writeLog, handleSuccess, handleError}) => {
  const curVal = (value) => (writeLog(value), value);
  const asyncCurValThen = (fn) => fn.then((x) => curVal(x));
  const getHandleSuccess = (args) => asyncThen(args, handleSuccess)
  const getHandleError = otherwise(handleError)

  const handleValidateError = partial(handleError, [validationMessage]);

  const bodyProcess = pipe(
    numberAndRoundString,
    curVal,
    translateNumberFromTenInTwo,
    getResultFromRes,
    asyncCurValThen,
    getLengthFromRes,
    asyncCurValThen,
    getSquareFromRes,
    asyncCurValThen,
    getRemainderDivisionThreeFromRes,
    asyncCurValThen,
    getTransformUrlFromRes,
    getAnimalFromRes,
    getResultFromRes,
    getHandleSuccess,
    getHandleError
  )

  const checkInputStringBefore = ifElse(validateInputString, bodyProcess, handleValidateError)
    
  const run = pipe(curVal, checkInputStringBefore)
     
  run(value)
}

export default processSequence;