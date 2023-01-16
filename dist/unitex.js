/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });

const singloid = x => x.charAt() == '-'
  ? singloid(x.substring(1))
  : x.length <= 1

const Proper = new Object()
Proper.wrap = (ls, rs) => x => singloid(x) ? x : ls + x + rs
Proper.paren = Proper.wrap('(', ')')
Proper.bracket = Proper.wrap('[', ']')
Proper.brace = Proper.wrap('{', '}')

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Proper);

/***/ }),
/* 2 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);



// Object.prototype.map = proxy((x, morph) => morph(x))

Number.prototype.boundedIn = (0,_link_js__WEBPACK_IMPORTED_MODULE_0__.proxy)((x, a, b) => a <= x && x <= b)
String.prototype.code = (0,_link_js__WEBPACK_IMPORTED_MODULE_0__.proxy)(x => x.codePointAt(0))
String.prototype.boundedIn = (0,_link_js__WEBPACK_IMPORTED_MODULE_0__.proxy)((x, a, b) => x.code().boundedIn(a.code(), b.code()))

const Unicode = {
  typeface: {},
  isLetter: x => x.boundedIn('a', 'z') || x.boundedIn('A', 'Z'),

  series: function (a, b) {
    let [code1, code2] = [a.code(), b.code()]
    let length = code2 - code1 + 1
    let codes = Array.from({ length: length }, (_, x) => x + code1)
    return String.fromCodePoint(...codes)
  },

  alphabets: function () {
    let map = new Object()
    Unicode.letterArray.forEach((x, i) => map[x] = arguments[i])
    return map
  },

  block: function (a, b, names) {
    let map = new Object()
    let data = Unicode.series(a, b)
    names.forEach((name, i) => name && (map[name] = data[i]))
    return map
  },

  render: (s, name) => Array.from(s)
    .map(x => Unicode.typeface[name][x] || x)
    .join(''),
}

Unicode.letterUppers = Unicode.series('A', 'Z')
Unicode.letterLowers = Unicode.series('a', 'z')
Unicode.letters = Unicode.letterUppers + Unicode.letterLowers
Unicode.letterArray = Array.from(Unicode.letters)

Unicode.greekUppers = Unicode.series('Α', 'Ρ') + Unicode.series('Σ', 'Ω')
Unicode.greekLowers = Unicode.series('α', 'ρ') + Unicode.series('σ', 'ω')
Unicode.greeks = Unicode.greekUppers + Unicode.greekLowers


// typeface
const series = Unicode.series
const alphabets = Unicode.alphabets

const typeface = function (name, alphabet) {
  Unicode.typeface[name] = alphabet
}

typeface('mathbb', alphabets(...'𝔸𝔹ℂ', ...series('𝔻', '𝔾'),
  'ℍ', ...series('𝕀', '𝕄'), ...'ℕ𝕆ℙℚℝ', ...series('𝕊', '𝕐'),
  'ℤ', ...series('𝕒', '𝕫'))
)
typeface('mathfrak', alphabets(...series('𝕬', '𝖟')))
typeface('mathscr', alphabets('𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ', ...series('𝒩', '𝒬'),
  'ℛ', ...series('𝒮', '𝒹'), 'ℯ', '𝒻', 'g', ...series('𝒽', '𝓃'),
  'ℴ', ...series('𝓅', '𝓏'))
)
typeface('mathbf', alphabets(...series('𝐀', '𝐳')))

typeface('textit', alphabets(...series('𝐴', '𝑔'), 'h', ...series('𝑖', '𝑧')))
typeface('textsf', alphabets(...series('𝖠', '𝗓')))
typeface('texttt', alphabets(...series('𝙰', '𝚣')))
typeface('textbf', Unicode.typeface.mathbf)


// supscript & subscript

Unicode.supscripts = Unicode.block('ᵃ', 'ᵡ', [
  'a',
  'ɐ',
  'α', // pending
  undefined, // ae
  'b',
  'd',
  'e',
  undefined, // schwa
  undefined, // open e
  undefined, // turned open e
  'g',
  undefined, // turned i
  'k',
  'm',
  undefined, // eng
  'o',
  undefined, // open o
  undefined, // top half o
  undefined, // bottom half o
  'p',
  't',
  'u',
])

Unicode.supscripts.x = 'ˣ' // u02e3
Unicode.supscripts.n = 'ⁿ' // u207f

Unicode.supscripts[3] = '³' // u00b3


Unicode.subscripts = {}
Unicode.subscripts.p = 'ₚ' // u209a

// console.log(Unicode.supscripts)

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Unicode);



/***/ }),
/* 3 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "link": () => (/* binding */ link),
/* harmony export */   "proxy": () => (/* binding */ proxy)
/* harmony export */ });

const proxy = f => function (...xs) {
  return f(this, ...xs)
}

// Link

const defined = x => x != undefined
const point = (x, f) => ({ x: x, y: f(x) })

const Link = function (exec, chain = true) {
  this.exec = exec
  this.chain = chain
  this.suspend = () => this.chain = false
  this.transfer = () => defined(this.next)
    ? (this.next.chain = this.chain) : true
  this.transphism = f => x => this.transfer() ? f(x) : undefined

  this.check = (predicate = defined) => this.next = new Link((...xs) =>
    (x => x.y ? x.x : (this.next.suspend(), undefined))
      (point(this.exec(...xs), this.transphism(predicate))))

  this.glue = next => this.next = new Link((...xs) =>
    (x => defined(x.y) ? [x.x, x.y] : (this.next.suspend(), undefined))
      (point(this.exec(...xs), this.transphism(next.exec))))

  this.map = morph => this.next = new Link((...xs) =>
    this.transphism(morph)(this.exec(...xs)))
}

const link = exec => new Link(exec).check()


/***/ }),
/* 4 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_proper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);



const Binary = {
  frac: (x, y) => `${_utils_proper_js__WEBPACK_IMPORTED_MODULE_0__["default"].paren(x)}/${_utils_proper_js__WEBPACK_IMPORTED_MODULE_0__["default"].paren(y)}`
}
Binary['cfrac'] = Binary.frac
Binary['dfrac'] = Binary.frac
Binary['tfrac'] = Binary.frac

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Binary);


/***/ }),
/* 5 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_proper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);




const Unary = {
  id: x => x,
  text: x => x,

  sqrt: x => '√' + _utils_proper_js__WEBPACK_IMPORTED_MODULE_0__["default"].paren(x),

  hat: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0302' : '-hat'),
  tilde: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0303' : '-tilde'),
  bar: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0304' : '-bar'), 
  overline: x => x,
  breve: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0306' : '-breve'),

  kern: x => x.endsWith('em') ? ' '.repeat(x.substring(0, x.length - 2)) : ' ',
}

const typefaceNames = Object.keys(_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].typeface)
typefaceNames.forEach(x => Unary[x] = s => _utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].render(s, x))

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Unary);


/***/ }),
/* 6 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);



const Fixed = {
  N: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.N,
  Z: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.Z,
  Q: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.Q,
  R: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.R,
  C: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.C,
  CC: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.C,
  A: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.A,
  F: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.F,

  natnums: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.N,
  reals: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.R,
  Reals: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.R,
  cnums: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.C,
  Complex: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.C,
  Bbbk: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.k,

  /* Theorem */

  proposition: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render('Proposition', 'textbf'),
  lemma: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render('Lemma', 'textbf'),
  theorem: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render('Theorem', 'textbf'),
  corollary: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render('Corollary', 'textbf'),
  definition: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render('Definition', 'textbf'),
  remark: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render('Remark', 'textbf'),
  hypothesis: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render('Hypothesis', 'textbf'),
  conjecture: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render('Conjecture', 'textbf'),
  axiom: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render('Axiom', 'textbf'),
  example: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render('Example', 'textbf'),
  proof: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render('proof', 'textit'),

  cdot: '⋅',
  cdotp: '⋅',
  circ: '∘',

  dots: '…',
  cdots: '⋯',
  ldots: '…',
  ddots: '⋱',
  vdots: '⋮',

  prime: '′',
  Box: '□',
  S: '§',
  sect: '§',


  /* Block 79 : Mathematical Operators */
  forall: '∀',
  complement: '∁',
  partial: '∂',
  exist: '∃',
  exists: '∃',
  noexist: '∄',
  empty: '∅',
  emptyset: '∅',
  varnothing: '∅',
  increment: '∆', // original
  nabla: '∇',
  in: '∈',
  isin: '∈',
  notin: '∉',
  smallin: '∊', // original
  ni: '∋',
  notni: '∌',
  smallni: '∍', // original
  blacksquare: '∎',
  prod: '∏',

  coprod: '∐',
  sum: '∑',
  minus: '−',
  mp: '∓',
  dotplus: '∔',
  division: '∕', // original
  backslash: '∖',
  ast: '∗',
  circ: '∘',
  bullet: '∙',
  infty: '∞',
  infin: '∞',
  mid: '∣',
  nmid: '∤',
  parallel: '∥',
  nparallel: '∦',
  land: '∧',
  lor: '∨',
  cap: '∩',
  cup: '∪',
  int: '∫',
  iint: '∬',
  iiint: '∭',
  oint: '∮',
  oiint: '∯',
  oiiint: '∰',
  cint: '∱', // original
  intclockwise: '∱',
  ccint: '∲', // original
  lcirclerightint: '∲',
  accint: '∳', // original
  rcirclerightint: '∳',

  sim: '∼',
  backsim: '∽',
  nsim: '≁',
  simeq: '≃',
  nsimeq: '≄',
  cong: '≅',
  congneq: '≆',
  ncong: '≇',


  subset: '⊂',
  supset: '⊃',
  defeq: '≝',


  le: '≤',
  leq: '≤',
  leqslant: '⩽',
  ge: '≥',
  geq: '≥',
  geqslant: '⩾',

  to: '→',
  mapsto: '↦',
  larr: '←',
  lArr: '⇐',
  Larr: '⇐',
  rarr: '→',
  rArr: '⇒',
  Rarr: '⇒',

  longmapsto: '⟼',
  longrightarrow: '⟶',
  longleftarrow: '⟵',
  implies: '⟹',
  impliedby: '⟸',
  iff: '⟺',

  pm: '±',
  plusmn: '±',
  times: '×',
  ltimes: '⋉',
  rtimes: '⋊',

  aleph: 'ℵ',
  alef: 'ℵ',
  alefsym: 'ℵ',
  ell: 'ℓ',
  wp: '℘',
  weierp: '℘',
  quad: ' '.repeat(4),
  qquad: ' '.repeat(6),
  ',': ' ',
  ';': ' '.repeat(2),
  '\\': '\n',
}

const greeks = [
  'Alpha', 'Beta', 'Gamma', 'Delta',
  'Epsilon', 'Zeta', 'Eta', 'Theta',
  'Iota', 'Kappa', 'Lambda', 'Mu',
  'Nu', 'Xi', 'Omicron', 'Pi',
  'Rho', 'Sigma', 'Tau', 'Upsilon',
  'Phi', 'Chi', 'Psi', 'Omega',

  'alpha', 'beta', 'gamma', 'delta',
  'epsilon', 'zeta', 'eta', 'theta',
  'iota', 'kappa', 'lambda', 'mu',
  'nu', 'xi', 'omicron', 'pi',
  'rho', 'sigma', 'tau', 'upsilon',
  'phi', 'chi', 'psi', 'omega'
]
greeks.forEach((x, i) => Fixed[x] = _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].greeks[i])

// fixed symbol as supscripts
_utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].supscripts[Fixed.times] = _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].supscripts.x

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Fixed);


/***/ }),
/* 7 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _fixed_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);



const Environment = {
  // matrix family
  matrix: xs => matred(xs, ' ', ' ', '; '),
  smallmatrix: xs => matred(xs, ' ', ' ', '; '),

  bmatrix: xs => matrix(xs, '[', ']'),
  pmatrix: xs => matrix(xs, '(', ')'),
  vmatrix: xs => matred(xs, '|', '|', '; '),

  Bmatrix: xs => matrix(xs, '{', '}'),
  Vmatrix: xs => matred(xs, '||', '||', '; '),

  // theorem family
  proposition: xs => theoremstyle('proposition', xs),
  lemma: xs => theoremstyle('lemma', xs),
  theorem: xs => theoremstyle('theorem', xs),
  corollary: xs => theoremstyle('corollary', xs),
  definition: xs => theoremstyle('definition', xs),
  remark: xs => theoremstyle('remark', xs),
  hypothesis: xs => theoremstyle('hypothesis', xs),
  conjecture: xs => theoremstyle('conjecture', xs),
  axiom: xs => theoremstyle('axiom', xs),
  example: xs => theoremstyle('example', xs),
  proof: xs => theoremstyle('proof', xs), 

  // misc family
  // center: xs => xs,

  // document: xs => xs, 
}

const matrim = x => x.replace(/\s/g, '').replace(/&/g, ' ')
const matrix = function (xs, ls, rs, lg = ls, rg = rs) {
  let s = ''.concat(...xs.map(x => ls + matrim(x) + rs))
  return xs.length > 1 ? lg + s + rg : s
}
const matred = (xs, lg, rg, sep) => lg + xs.map(matrim).join(sep) + rg

const regexpDoubleLine = /\r\n\r\n|\n\n/


/**
 * Adjustments to text formatting (such as spaces, line breaks, and indents) 
 * are made after macro replacement Therefore, the current processing is not 
 * friendly to macros such as quad The specific scheme for the format in the 
 * environment is still under discussion, so this question will be put on 
 * hold temporarily.
 * 
 */
const polymerizeTeX = function (s) {
  let result = s.trim()
    .replace(/ *\r\n *| *\n *| (?= )/g, '')
    .replace(/ *(\,|\.) */g, '$1 ')
  return result
}

const theoremstyle = function (type, content) {
  let title = _fixed_js__WEBPACK_IMPORTED_MODULE_0__["default"][type] + '. '
  return title + content
    .split(regexpDoubleLine)
    .map(polymerizeTeX)
    .join('\n')
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Environment);


/***/ }),
/* 8 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);




// Parse<A>.parse: String -> [A, String]
const Parser = function (parse) {
  this.parse = parse
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Parser);

Parser.prototype.many = function () {
  return new Parser(source => {
    let [list, residue, tuple] = [[], source]
    while (tuple = this.parse(residue)) {
      list.push(tuple[0])
      residue = tuple[1]
    }
    return [list, residue]
  })
}

Parser.prototype.some = function () {
  return new Parser(source => {
    let tuple = this.many().parse(source)
    return tuple[0].length >= 1 ? tuple : undefined
  })
}

Parser.prototype.asterisk = function () {
  return new Parser(source => {
    let [buffer, residue, tuple] = ['', source,]
    while (tuple = this.parse(residue)) {
      buffer += tuple[0]
      residue = tuple[1]
    }
    return [buffer, residue]
  })
}

Parser.prototype.plus = function () {
  return new Parser(source => {
    let tuple = this.asterisk().parse(source)
    return tuple[0].length >= 1 ? tuple : undefined
  })
}



/*
 *  tuple? -> [a, residue]
 *         -> [morph a, residue]
 */
Parser.prototype.map = function (morph) {
  return new Parser(source =>
    (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(() => this.parse(source))
      .map(xs => [morph(xs[0]), xs[1]])
      .exec()
  )
}

// let tuple = this.parse(source)
// if (!tuple) return undefined

// let [a, residue] = tuple
// return [morph(a), residue]

Parser.prototype.first = (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.proxy)(x => x.map(tuple => tuple[0]))
Parser.prototype.second = (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.proxy)(x => x.map(tuple => tuple[1]))


Function.prototype.parse = (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.proxy)((x, s) => x().parse(s))

/*
 *  tuple1? -> [a, phase1]                 (check)
 *          -> [[a, phase1], tuple2?]      (glue )
 *          -> [[a, phase1], [b, phase2]]  (check)
 *          -> [[a, b], phase2]
 */
Parser.prototype.follow = function (next) {
  return new Parser(source =>
    (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(() => this.parse(source))
      .glue((0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(xs => next.parse(xs[1])))
      .map(xs => [[xs[0][0], xs[1][0]], xs[1][1]])
      .exec()
  )
}

//  -> [a, phase1, b, phase2]      (flat )
// flat version: ((a, _, b, s) => [[a, b], s])(...xs.flat())

// let link1 = new Link(() => this.parse(source)).check()
// let link2 = new Link(xs => next.parse(xs[1])).check()
// let morph = xs => xs && ((a, _, b, s) => [[a, b], s])(...xs.flat())

// let tuple1 = this.parse(source)
// if (!tuple1) return undefined

// let [a, phase1] = tuple1

// let tuple2 = next.parse(phase1)
// if (!tuple2) return undefined

// let [b, phase2] = tuple2
// return [[a, b], phase2]


/*
 *  tuple1? -> [a, phase1]                 (check)
 *          -> [[a, phase1], tuple2?]      (glue )
 *          -> [[a, phase1], [b, phase2]]  (check)
 *          -> [a, phase2]
 */
Parser.prototype.skip = function (next) {
  return new Parser(source =>
    (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(() => this.parse(source))
      .glue((0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(xs => next.parse(xs[1])))
      .map(xs => [xs[0][0], xs[1][1]])
      .exec()
  )
}

// let tuple1 = this.parse(source)
// if (!tuple1) return undefined

// let [a, phase1] = tuple1
// let tuple2 = next.get().parse(phase1)
// if (!tuple2) return undefined

// let [, phase2] = tuple2
// return [a, phase2]




/*
 *  tuple? -> [a, residue]
 *         -> [a, residue] (check predicate)
 */
Parser.prototype.check = function (predicate) {
  return new Parser(source => 
    (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(() => this.parse(source))
      .check(x => predicate(...x))
      .exec()
  )
}
// let tuple1 = this.parse(source)
// if (!tuple1) return undefined

// let [a, phase1] = tuple1
// if (!predicate(a, phase1)) return undefined
// return tuple1


/*
 *  tuple1? -> tuple1 (check)
 *        ! -> tuple2
 */
Parser.prototype.or = function (next) {
  return new Parser(source =>
    this.parse(source) || next.parse(source)
  )
}

// let tuple = this.parse(source)
// if (tuple) return tuple
// return next.get().parse(source)


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "text": () => (/* binding */ text)
/* harmony export */ });
/* harmony import */ var _src_utils_proper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _src_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _src_macro_binary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);
/* harmony import */ var _src_macro_unary_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5);
/* harmony import */ var _src_macro_fixed_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6);
/* harmony import */ var _src_macro_environment_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);
/* harmony import */ var _src_parsec_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8);











const token = predicate => new _src_parsec_js__WEBPACK_IMPORTED_MODULE_6__["default"](
  source => source.length > 0
    ? predicate(source[0])
      ? [source[0], source.substring(1)]
      : undefined
    : undefined
)
const character = char => token(x => x == char)

const string = str => new _src_parsec_js__WEBPACK_IMPORTED_MODULE_6__["default"](
  source => source.length > 0
    ? source.startsWith(str)
      ? [str, source.substring(str.length)]
      : undefined
    : undefined
)

const digit = token(x => x.boundedIn('0', '9'))


/*
const digits = digit.plus()

const add = digits.follow(token(x => x == '+')).follow(digits)
console.log(add.parse('10+33*2'))



*/


const letter = token(_src_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter)
const letters = letter.plus()


const backslash = character('\\')

const lbrace = character('{')
const rbrace = character('}')
const braceWrap = x => lbrace.follow(x).skip(rbrace).second()

const space = character(' ')
const spacea = space.asterisk()
// const spaces = space.plus()

const loose = x => spacea.follow(x).second()
const single = digit.or(letter).or(() => fixedMacro)
const value = loose(single.or(braceWrap(() => text)))




const macroName = letters.or(lbrace).or(rbrace).or(backslash)
  .or(token(x => x == ',' || x == '.' || x == '\\'))

const macroh = backslash.follow(macroName).second()
const fixedMacro = macroh.check(x => _src_macro_fixed_js__WEBPACK_IMPORTED_MODULE_4__["default"][x]).map(x => _src_macro_fixed_js__WEBPACK_IMPORTED_MODULE_4__["default"][x]) // `\\${x}`
// [macro, value]
const unaryMacro = macroh.check(x => _src_macro_unary_js__WEBPACK_IMPORTED_MODULE_3__["default"][x])
  .follow(value)
  .map(xs => _src_macro_unary_js__WEBPACK_IMPORTED_MODULE_3__["default"][xs[0]](xs[1]))
// [[macro, value1], value2]
const binaryMacro = macroh.check(x => _src_macro_binary_js__WEBPACK_IMPORTED_MODULE_2__["default"][x])
  .follow(value)
  .follow(value)
  .map(xs => _src_macro_binary_js__WEBPACK_IMPORTED_MODULE_2__["default"][xs[0][0]](xs[0][1], xs[1]))

const special = x => x == '\\'
  || x == '{' || x == '}'
  || x == '_' || x == '^'
  || x == '%'

const envira = braceWrap(letters)
const begin = backslash.skip(string('begin')).follow(envira).second()
const end = backslash.skip(string('end')).follow(envira).second()
// [[begin, text], end]
const environ = begin.follow(() => section).follow(end)
  .check(xs => xs[0][0] == xs[1])
  .map(xs => _src_macro_environment_js__WEBPACK_IMPORTED_MODULE_5__["default"][xs[1]](xs[0][1]))
//

const supscript = character('^').follow(value).second()
  .map(x => _src_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].supscripts[x] || '^' + _src_utils_proper_js__WEBPACK_IMPORTED_MODULE_0__["default"].brace(x))
const subscript = character('_').follow(value).second()
  .map(x => _src_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].subscripts[x] || '_' + _src_utils_proper_js__WEBPACK_IMPORTED_MODULE_0__["default"].brace(x))
const suporsub = supscript.or(subscript)


const comment = character('%')
  .skip(token(x => x != '\n').asterisk())
  .skip(character('\n'))
  .map(x => '')

/** 
 * because there is a simplified version of 
 * the theorem style (as fixed macro), it is 
 * necessary to ensure that the environment 
 * takes precedence over those macros. 
 *
 */
const element = token(x => !special(x)).plus()
  .or(comment)
  .or(suporsub)
  .or(environ)
  .or(fixedMacro)
  .or(unaryMacro)
  .or(binaryMacro)
//
const section = element.plus()

/*
console.log(environ.parse(String.raw`\begin{bmatrix} 
  0 & 1 \\ 
  1 & 0 
\end{bmatrix}`))
*/

const unknownMacro = macroh.map(x => '\\' + x)


const text = element.or(unknownMacro).plus()

// import fs from 'fs'

// const read = path => fs.readFileSync(path, 'utf8')

// const state = text.parse(read('./test/modular.tex'))
// state && fs.writeFile('./output.txt', state[0], () => {})



// console.log(text.parse(String.raw`we can assume \Q \rarr \Z \rarr 1`))


})();

var __webpack_export_target__ = window;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;

