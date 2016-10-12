// -*- mode: js2 -*-
// -*- coding: utf-8 -*-
// @flow


/**
 * Rabbit/Runtime/random string
 */

import {
  randomNumber,
  randomNumberString,
  randomString
} from './core'


type StringOptions = {
  min?: number,
  max?: number,
  pattern: RegExp
}

export default function string(opt?: StringOptions): string {
  let { min = 3, max = 5, pattern } = opt || {}

  if(!pattern) return randomString(randomNumber(min, max))

  let regexScope = /\\d(?:\{(\d+)?,\s?(\d+)?\})?/g

  return String(pattern)
    .replace(/\/|\^|\$/g, '')
    .replace(/\\d\+/g, randomNumberString(randomNumber(min, max)))
    .replace(/\\w\+/g, randomString(randomNumber(min, max)))
    .replace(/\\d(?:\{(\d+)?,\s?(\d+)?\})?/g, function(_, rmin, rmax) {
      return randomNumberString(rmin || min, rmax || max)
    })
    .replace(/\\w(?:\{(\d+)?,\s?(\d+)?\})?/g, function(_, rmin, rmax) {
      return randomString(rmin || min, rmax || max)
    })
    .replace(/\\d/, randomNumberString(1))
    .replace(/\\w/, randomString(1))
}