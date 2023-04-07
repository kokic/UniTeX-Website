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
  /* harmony import */ var _link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
  /* harmony import */ var _proper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
  
  
  
  
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
      .map(x => Unicode.typeface[name][x] || x).join(''),
  
    corender: function (charset, str, otherwise) {
      const array = Array.from(str)
      let through = true
      for (const element of array)
        through &&= charset[element]
      return through
        ? array.map(x => charset[x]).join('')
        : otherwise(str)
    },
  
    suprender: s => Unicode.corender(Unicode.supscripts, s, x => '^' + _proper_js__WEBPACK_IMPORTED_MODULE_1__["default"].brace(x)),
    subrender: s => Unicode.corender(Unicode.subscripts, s, x => '_' + _proper_js__WEBPACK_IMPORTED_MODULE_1__["default"].brace(x)),
  }
  
  Unicode.letterUppers = Unicode.series('A', 'Z')
  Unicode.letterLowers = Unicode.series('a', 'z')
  Unicode.letters = Unicode.letterUppers + Unicode.letterLowers
  Unicode.letterArray = Array.from(Unicode.letters)
  
  Unicode.greekUppers = Unicode.series('Α', 'Ρ') + Unicode.series('Σ', 'Ω')
  Unicode.greekLowers = Unicode.series('α', 'ρ') + Unicode.series('σ', 'ω')
  Unicode.greeks = Unicode.greekUppers + Unicode.greekLowers
  
  
  // typeface (Mathematical Alphanumeric Symbols)
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
  typeface('mathscr', alphabets(...'𝒜ℬ𝒞𝒟ℰℱ𝒢ℋℐ𝒥𝒦ℒℳ', ...series('𝒩', '𝒬'),
    'ℛ', ...series('𝒮', '𝒹'), 'ℯ', '𝒻', 'g', ...series('𝒽', '𝓃'),
    'ℴ', ...series('𝓅', '𝓏'))
  )
  typeface('mathcal', Unicode.typeface.mathscr) // remark
  typeface('mathbf', alphabets(...series('𝐀', '𝐳')))
  typeface('mathit', alphabets(...series('𝐴', '𝑔'), 'h', ...series('𝑖', '𝑧')))
  typeface('mathsf', alphabets(...series('𝖠', '𝗓')))
  
  typeface('textbf', Unicode.typeface.mathbf)
  typeface('textit', Unicode.typeface.mathit)
  typeface('textsf', Unicode.typeface.mathsf)
  typeface('texttt', alphabets(...series('𝙰', '𝚣')))
  
  typeface('textscr', Unicode.typeface.mathscr) // original
  typeface('textcal', Unicode.typeface.mathcal) // original
  
  typeface('sf', Unicode.typeface.mathsf)
  typeface('bf', Unicode.typeface.mathbf)
  typeface('bold', Unicode.typeface.mathbf)
  
  typeface('boldsymbol', Unicode.typeface.mathbf)
  typeface('bm', Unicode.typeface.mathbf)
  
  typeface('tt', Unicode.typeface.texttt)
  typeface('it', Unicode.typeface.mathit)
  
  typeface('frak', Unicode.typeface.mathfrak)
  typeface('cal', Unicode.typeface.mathcal)
  
  typeface('Bbb', Unicode.typeface.mathbb)
  // typeface('text', alphabets(...series('A', 'Z'), ...series('a', 'z')))
  
  Unicode.typefaceNames = Object.keys(Unicode.typeface)
  
  // supscript & subscript
  
  // Unicode Block
  /*
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
  */
  
  // supscripts
  
  Unicode.supscripts = {}
  
  Unicode.supscripts[0] = '⁰'
  Unicode.supscripts[1] = '¹'
  Unicode.supscripts[2] = '²'
  Unicode.supscripts[3] = '³' // u00b3
  Unicode.supscripts[4] = '⁴'
  Unicode.supscripts[5] = '⁵'
  Unicode.supscripts[6] = '⁶'
  Unicode.supscripts[7] = '⁷'
  Unicode.supscripts[8] = '⁸'
  Unicode.supscripts[9] = '⁹'
  
  Unicode.supscripts.a = 'ᵃ'
  Unicode.supscripts.b = 'ᵇ'
  Unicode.supscripts.c = 'ᶜ'
  Unicode.supscripts.d = 'ᵈ'
  Unicode.supscripts.e = 'ᵉ'
  Unicode.supscripts.f = 'ᶠ'
  Unicode.supscripts.g = 'ᵍ'
  Unicode.supscripts.h = 'ʰ'
  // Unicode.supscripts.i = '^i'
  Unicode.supscripts.j = 'ʲ'
  Unicode.supscripts.k = 'ᵏ'
  Unicode.supscripts.l = 'ˡ'
  Unicode.supscripts.m = 'ᵐ'
  Unicode.supscripts.n = 'ⁿ' // u207f
  Unicode.supscripts.o = 'ᵒ'
  Unicode.supscripts.p = 'ᵖ'
  Unicode.supscripts.r = 'ʳ'
  Unicode.supscripts.s = 'ˢ'
  Unicode.supscripts.t = 'ᵗ'
  Unicode.supscripts.u = 'ᵘ'
  Unicode.supscripts.v = 'ᵛ'
  Unicode.supscripts.w = 'ʷ'
  Unicode.supscripts.x = 'ˣ' // u02e3
  Unicode.supscripts.y = 'ʸ'
  Unicode.supscripts.z = 'ᶻ'
  
  Unicode.supscripts['+'] = '⁺'
  Unicode.supscripts['-'] = '⁻'
  Unicode.supscripts['='] = '⁼'
  Unicode.supscripts['('] = '⁽'
  Unicode.supscripts[')'] = '⁾'
  
  // Unicode: Phonetic Extensions
  Unicode.supscripts.A = 'ᴬ'
  // Unicode.supscripts. = 'ᴭ'
  Unicode.supscripts.B = 'ᴮ'
  // Unicode.supscripts. = 'ᴯ'
  Unicode.supscripts.D = 'ᴰ'
  Unicode.supscripts.E = 'ᴱ'
  // Unicode.supscripts. = 'ᴲ'
  Unicode.supscripts.G = 'ᴳ'
  Unicode.supscripts.H = 'ᴴ'
  Unicode.supscripts.I = 'ᴵ'
  Unicode.supscripts.J = 'ᴶ'
  Unicode.supscripts.K = 'ᴷ'
  Unicode.supscripts.L = 'ᴸ'
  Unicode.supscripts.M = 'ᴹ'
  Unicode.supscripts.N = 'ᴺ'
  // Unicode.supscripts. = 'ᴻ'
  
  Unicode.supscripts['α'] = 'ᵅ'
  
  
  Unicode.supscripts['′'] = '′'
  
  
  // subscripts
  
  Unicode.subscripts = {}
  
  Unicode.subscripts[0] = '₀'
  Unicode.subscripts[1] = '₁'
  Unicode.subscripts[2] = '₂'
  Unicode.subscripts[3] = '₃'
  Unicode.subscripts[4] = '₄'
  Unicode.subscripts[5] = '₅'
  Unicode.subscripts[6] = '₆'
  Unicode.subscripts[7] = '₇'
  Unicode.subscripts[8] = '₈'
  Unicode.subscripts[9] = '₉'
  
  Unicode.subscripts.a = 'ₐ'
  Unicode.subscripts.e = 'ₑ'
  Unicode.subscripts.h = 'ₕ'
  Unicode.subscripts.i = 'ᵢ' // u1d62
  Unicode.subscripts.j = 'ⱼ'
  Unicode.subscripts.k = 'ₖ'
  Unicode.subscripts.l = 'ₗ'
  Unicode.subscripts.m = 'ₘ'
  Unicode.subscripts.n = 'ₙ'
  Unicode.subscripts.o = 'ₒ'
  Unicode.subscripts.p = 'ₚ' // u209a
  Unicode.subscripts.r = 'ᵣ'
  Unicode.subscripts.s = 'ₛ'
  Unicode.subscripts.t = 'ₜ'
  Unicode.subscripts.u = 'ᵤ'
  Unicode.subscripts.v = 'ᵥ'
  Unicode.subscripts.x = 'ₓ'
  
  Unicode.subscripts['+'] = '₊'
  Unicode.subscripts['-'] = '₋'
  Unicode.subscripts['='] = '₌'
  Unicode.subscripts['('] = '₍'
  Unicode.subscripts[')'] = '₎'
  
  
  
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Unicode);
  
  
  
  /***/ }),
  /* 2 */
  /***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "link": () => (/* binding */ link),
  /* harmony export */   "proxy": () => (/* binding */ proxy)
  /* harmony export */ });
  
  const proxy = f => function (...xs) {
    return f(this, ...xs)
  }
  
  // Object.prototype.map = proxy((x, morph) => morph(x))
  
  // Link
  
  const defined = x => x != undefined
  const point = (x, f) => ({ x: x, y: f(x) })
  
  const Link = function (run, chain = true) {
    this.run = run
    this.chain = chain
    this.suspend = () => this.chain = false
    this.transfer = () => defined(this.next)
      ? (this.next.chain = this.chain) : true
    this.transphism = f => x => this.transfer() ? f(x) : undefined
  
    this.check = (predicate = defined) => this.next = new Link((...xs) =>
      (x => x.y ? x.x : (this.next.suspend(), undefined))
        // eslint-disable-next-line no-unexpected-multiline
        (point(this.run(...xs), this.transphism(predicate))))
  
    this.pip = next => this.next = new Link((...xs) =>
      (x => defined(x.y) ? [x.x, x.y] : (this.next.suspend(), undefined))
        // eslint-disable-next-line no-unexpected-multiline
        (point(this.run(...xs), this.transphism(next.run))))
  
    this.map = morph => this.next = new Link((...xs) =>
      this.transphism(morph)(this.run(...xs)))
  }
  
  const link = run => new Link(run).check()
  
  
  /***/ }),
  /* 3 */
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
  /* 4 */
  /***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _utils_block_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
  /* harmony import */ var _utils_proper_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
  /* harmony import */ var _fixed_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
  
  
  
  
  
  const Binary = {
    frac: (x, y) => `${_utils_proper_js__WEBPACK_IMPORTED_MODULE_1__["default"].paren(x)}/${_utils_proper_js__WEBPACK_IMPORTED_MODULE_1__["default"].paren(y)}`,
    overset: function (x, y) {
      if (x == '?' && y == '=') return _fixed_js__WEBPACK_IMPORTED_MODULE_2__["default"].qeq
      if (x == 'm' && y == '=') return _fixed_js__WEBPACK_IMPORTED_MODULE_2__["default"].meq
      if (x == 'def' && y == '=') return _fixed_js__WEBPACK_IMPORTED_MODULE_2__["default"].defeq
      if (x == _fixed_js__WEBPACK_IMPORTED_MODULE_2__["default"].star && y == '=') return _fixed_js__WEBPACK_IMPORTED_MODULE_2__["default"].stareq
      if (x == _fixed_js__WEBPACK_IMPORTED_MODULE_2__["default"].Delta && y == '=') return _fixed_js__WEBPACK_IMPORTED_MODULE_2__["default"].deltaeq
      return `\\overset{${x}}{${y}}`
    }, 
    binom: (n, k) => `(${n} ${k})`, 
  
    __block__: {
      frac: (x, y) => _utils_block_js__WEBPACK_IMPORTED_MODULE_0__["default"].frac(x, y), 
      overset: (x, y) => Binary.overset(x.string, y.string).toBlock()
    }, 
  
    __infix__: {
      choose: (n, k) => Binary.binom(n, k)
    }
  }
  
  Binary['cfrac'] = Binary.frac
  Binary['dfrac'] = Binary.frac
  Binary['tfrac'] = Binary.frac
  
  Binary['dbinom'] = Binary.binom
  Binary['tbinom'] = Binary.binom
  
  Binary.__block__['cfrac'] = Binary.__block__.frac
  Binary.__block__['dfrac'] = Binary.__block__.frac
  Binary.__block__['tfrac'] = Binary.__block__.frac
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Binary);
  
  
  /***/ }),
  /* 5 */
  /***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  
  String.prototype.fill = function (n) {
    const residue = n - this.length
    if (residue == n) return ' '.repeat(n)
    if (residue == 0) return this
    if (residue < 0) return this.substring(0, n)
    const left = Math.floor(residue / 2)
    const right = residue - left
    return ' '.repeat(left) + this + ' '.repeat(right)
  }
  
  const Block = function (data, baseline = 0) {
    this.width = Math.max(...data.map(x => x.length))
    this.height = data.length
    this.data = data.map(x => x.fill(this.width))
    this.string = this.data.join('\n')
    this.baseline = baseline
  
    this.blocklift = function (n, offset) {
      const residue = n - this.height
      if (residue == 0) return this
      const topline = Array(offset).fill('')
      const bottomline = Array(residue - offset).fill('')
      return new Block(topline.concat(this.data).concat(bottomline))
    }
  
    this.append = function (block) {
      const major = this.height > block.height
      const supbase = this.baseline > block.baseline
      const offset = supbase
        ? this.baseline - block.baseline
        : block.baseline - this.baseline
      const baseline = supbase ? this.baseline : block.baseline
      const [left, right] = major
        ? [this.data, block.blocklift(this.height, offset).data]
        : [this.blocklift(block.height, offset).data, block.data]
      return new Block(left.map((v, i) => v + right[i]), baseline)
    }
    
    this.add = block => this.append(Block.plus).append(block)
  
    this.over = function (block) {
      const width = Math.max(this.width, block.width) + 2
      const fracline = '-'.repeat(width)
      const data = [...this.data, fracline, ...block.data]
      return new Block(data.map(x => x.fill(width)), this.height)
    }
  }
  
  String.prototype.toBlock = function () {
    return new Block([this])
  }
  Block.of = s => s.toBlock()
  
  Block.empty = ''.toBlock()
  Block.plus = ' + '.toBlock()
  
  const fracByString = function (x, y) {
    const width = Math.max(x.length, y.length) + 2
    const data = [x.fill(width), '-'.repeat(width), y.fill(width)]
    return new Block(data, 1)
  }
  
  const frac = function (a, b) {
    if (a instanceof Block && b instanceof Block) return a.over(b)
    if (typeof a == 'string' && typeof b == 'string') return fracByString(a, b)
    if (typeof a == 'string') return frac(new Block([a]), b)
    if (typeof b == 'string') return frac(a, new Block([b]))
  }
  Block.frac = frac
  
  String.prototype.add = function (x) {
    const other = typeof x == 'string' ? x.toBlock() : x
    return this.toBlock().add(other)
  }
  
  
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Block);
  
  // const frac1 = frac('a', 'b')
  // const frac2 = frac('x', 'y + z')
  
  // const frac3 = frac('u', x.add(frac1))
  
  
  
  
  /***/ }),
  /* 6 */
  /***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
  
  
  
  const Fixed = {
    N: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.N,
    Z: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.Z,
    Q: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.Q,
    R: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.R,
    C: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.C,
    CC: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.C,
    A: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.A,
    F: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.F,
    SS: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.S,
  
    natnums: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.N,
    reals: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.R,
    Reals: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.R,
    cnums: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.C,
    Complex: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.C,
    Bbbk: _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].typeface.mathbb.k,
  
  
    /**
     * In order to express my respect to all TeX-related project developers, 
     * I reserve these special macro commands and follow the consistent tradition 
     * to implement UniTeX.
     */
  
    TeX: 'TᴇX', 
    LaTeX: 'LᴬTᴇX', 
    KaTeX: 'KᴬTᴇX', 
    UniTeX: 'UⁿᵢTᴇX', 
  
    /* Accents */
    hat: '\u0302', 
    tilde: '\u0303', 
    bar: '\u0304', 
    overline: '\u0305', 
    breve: '\u0306', 
  
    widetilde: '\u0360', 
  
    uwidebreve: '\u035c', 
    widebreve: '\u035d', 
    widepreve: '\u0361', 
  
    uvec: '\u0362', 
  
    overa: '\u0363', // original
    overe: '\u0364', // original
    overi: '\u0365', // original
    overo: '\u0366', // original
    overu: '\u0367', // original
  
    overc: '\u0368', // original
    overd: '\u0369', // original
    overh: '\u036A', // original
    overm: '\u036B', // original
    overr: '\u036C', // original
    overt: '\u036E', // original
    overx: '\u036F', // original
  
    
  
    /* Frequent */
    degree: '°', 
  
    /* Variant */
    varGamma: 'Γ', 
    varDelta: 'Δ', 
    varTheta: 'Θ', 
    varLambda: 'Λ', 
    varXi: 'Ξ', 
    varPi: 'ϖ', 
    varSigma: 'Σ', 
    varUpsilon: 'Υ', 
    varPhi: 'Φ', 
    varPsi: 'Ψ', 
    varOmega: 'Ω', 
  
    varepsilon: 'ε', 
    varkappa: 'ϰ', 
    vartheta: 'ϑ', 
    thetasym: 'ϑ', 
    varpi: 'ϖ', 
    varrho: 'ϱ', 
    varsigma: 'ς', 
    varphi: 'φ', 
    digamma: 'ϝ', 
    
    
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
  
    /* Combined Operatorname */
    argmax: 'arg max',
    argmin: 'arg min',
    injlim: 'inj lim',
    liminf: 'lim inf',
    limsup: 'lim sup',
    projlim: 'proj lim',
  
  
    /* Infix Names */ 
    infixs: [
      'plus',            'minus',         /* stub */
      'cdot',            'gtrdot',        'cdotp',
      'intercal',        'centerdot',     'land',
      'rhd',             'circ',          'leftthreetimes',
      'rightthreetimes', 'amalg',         'circledast',
      'ldotp',           'rtimes',        'And',
      'circledcirc',     'lor',           'setminus',
      'ast',             'circleddash',   'lessdot',
      'smallsetminus',   'barwedge',      'Cup',
      'lhd',             'sqcap',         'bigcirc',
      'cup',             'ltimes',        'sqcup',
      'bmod',            'curlyvee',      'mod',
      'times',           'boxdot',        'curlywedge',
      'mp',              'unlhd',         'boxminus',
      'div',             'odot',          'unrhd',
      'boxplus',         'divideontimes', 'ominus',
      'uplus',           'boxtimes',      'dotplus',
      'oplus',           'vee',           'bullet',
      'doublebarwedge',  'otimes',        'veebar',
      'Cap',             'doublecap',     'oslash',
      'wedge',           'cap',           'doublecup',
      'pm',              'plusmn',        'wr'
    ], 
  
    cdot: '⋅',
    cdotp: '⋅',
  
    dots: '…',
    cdots: '⋯',
    ldots: '…',
    ddots: '⋱',
    vdots: '⋮',
  
    prime: '′',
    Box: '□',
    S: '§',
    sect: '§',
  
    /* Delimiters */
    '|': '∥', 
    lang: '⟨', 
    rang: '⟩', 
    vert: '∣', 
    Vert: '∥', 
    lVert: '∥', 
    rVert: '∥', 
    lceil: '⌈', 
    rceil: '⌉', 
    lfloor: '⌊',
    rfloor: '⌋', 
    lmoustache: '⎰', 
    rmoustache: '⎱', 
    lgroup: '⟮', 
    rgroup: '⟯', 
    ulcorner: '┌', 
    urcorner: '┐', 
    llcorner: '└', 
    lrcorner: '┘', 
    llbracket: '[[', 
    rlbracket: ']]', 
    lBrace: '{[', 
    rBrace: ']}', 
  
  
    /* Big Operators */
    bigotimes: '⨂',
    bigvee: '⋁',
    bigoplus: '⨁',
    bigwedge: '⋀',
    bigodot: '⨀',
    bigcap: '⋂',
    biguplus: '⨄',
    bigcup: '⋃',
    bigsqcup: '⨆',
  
    wedge: '∧',
    curlywedge: '⋏',
    barwedge: '⊼', 
    doublebarwedge: '⩞',
    vee: '∨',
    curlyvee: '⋎',
    veebar: '⊻',
    sqcap: '⊓',
    sqcup: '⊔',
    boxdot: '⊡',
    boxplus: '⊞',
    boxminus: '⊟',
    boxtimes: '⊠',
  
    oplus: '⊕',
    ominus: '⊖',
    otimes: '⊗',
    oslash: '⊘',
  
    uplus: '⊎', 
    divideontimes: '⋇', 
  
    lhd: '⊲',
    unlhd: '⊴',
    rhd: '⊳',
    unrhd: '⊵',
    setminus: '∖',
    smallsetminus: '∖',
    
  
  
    /* Block 79 : Mathematical Operators */
    forall: '∀',
    complement: '∁',
    partial: '∂',
    exist: '∃',
    exists: '∃',
    noexist: '∄',
    empty: '∅',
    emptyset: '∅',
    varnothing: '⌀', // u2300 diameter sign
    increment: '∆', // original
    nabla: '∇',
    smallin: '∊', // original
    ni: '∋',
    smallni: '∍', // original
    blacksquare: '∎',
    prod: '∏',
  
    coprod: '∐',
    sum: '∑',
    plus: '+', 
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
    iiiint: '⨌',
    oint: '∮',
    oiint: '∯',
    oiiint: '∰',
    cint: '∱', // original
    intclockwise: '∱',
    ccint: '∲', // original
    lcirclerightint: '∲',
    accint: '∳', // original
    rcirclerightint: '∳',
  
    /* --- */
  
    nsimeq: '≄',
    congneq: '≆',
    napprox: '≉', // original
  
    eq: '=',
    ne: '≠',
    neq: '≠',
    stareq: '≛', // original
    deltaeq: '≜', // original
    triangleq: '≜',
    meq: '≞', // original
    defeq: '≝', // original
    qeq: '≟', // original
  
    questeq: '≟', // fcitx & ibus
    arceq: '≘', // fcitx & ibus
    wedgeq: '≙', // fcitx & ibus
    veeeq: '≚', // fcitx & ibus
    circeq: '≗', // fcitx & ibus
  
    /* Relations */
    doteqdot: '≑',
    lessapprox: '⪅',
    smile: '⌣',
    eqcirc: '≖',
    lesseqgtr: '⋚',
    sqsubset: '⊏',
    eqcolon: '∹',
    minuscolon: '∹',
    lesseqqgtr: '⪋',
    sqsubseteq: '⊑',
    Eqcolon: '−∷',
    minuscoloncolon: '-∷',
    lessgtr: '≶',
    sqsupset: '⊐',
    approx: '≈',
    eqqcolon: '≕',
    equalscolon: '≕',
    lesssim: '≲',
    sqsupseteq: '⊒',
    approxcolon: '≈:',
    Eqqcolon: '=∷',
    equalscoloncolon: '=∷',
    ll: '≪',
    Subset: '⋐',
    approxcoloncolon: '≈∷',
    eqsim: '≂',
    lll: '⋘',
    subset: '⊂',
    sub: '⊂',
    approxeq: '≊',
    eqslantgtr: '⪖',
    llless: '⋘',
    subseteq: '⊆',
    sube: '⊆',
    asymp: '≍',
    eqslantless: '⪕',
    lt: '<',
    subseteqq: '⫅',
    backepsilon: '∍',
    equiv: '≡',
    // mid: '∣', 
    succ: '≻',
    backsim: '∽',
    fallingdotseq: '≒',
    models: '⊨',
    succapprox: '⪸',
    backsimeq: '⋍',
    frown: '⌢',
    multimap: '⊸',
    succcurlyeq: '≽',
    between: '≬',
    ge: '≥',
    origof: '⊶',
    succeq: '⪰',
    bowtie: '⋈',
    geq: '≥',
    owns: '∋',
    succsim: '≿',
    bumpeq: '≏',
    geqq: '≧',
    // parallel: '∥',
    Supset: '⋑',
    Bumpeq: '≎',
    geqslant: '⩾',
    perp: '⊥',
    supset: '⊃',
    // circeq: '≗',
    gg: '≫',
    pitchfork: '⋔',
    supseteq: '⊇',
    supe: '⊇',
    colonapprox: ':≈',
    ggg: '⋙',
    prec: '≺',
    supseteqq: '⫆',
    Colonapprox: '∷≈',
    coloncolonapprox: '∷≈',
    gggtr: '⋙',
    precapprox: '⪷',
    thickapprox: '≈',
    coloneq: ':−',
    colonminus: ':-',
    gt: '>',
    preccurlyeq: '≼',
    thicksim: '∼',
    Coloneq: '∷−',
    coloncolonminus: '∷−',
    gtrapprox: '⪆',
    preceq: '⪯',
    trianglelefteq: '⊴',
    coloneqq: '≔',
    colonequals: '≔',
    gtreqless: '⋛',
    precsim: '≾',
    // triangleq: '≜',
    Coloneqq: '∷=',
    coloncolonequals: '∷=',
    gtreqqless: '⪌',
    propto: '∝',
    trianglerighteq: '⊵',
    colonsim: ':∼',
    gtrless: '≷',
    risingdotseq: '≓',
    varpropto: '∝',
    Colonsim: '∷∼',
    coloncolonsim: '∷∼',
    gtrsim: '≳',
    shortmid: '∣',
    vartriangle: '△',
    cong: '≅',
    imageof: '⊷',
    shortparallel: '∥',
    vartriangleleft: '⊲',
    curlyeqprec: '⋞',
    in: '∈',
    isin: '∈',
    sim: '∼',
    vartriangleright: '⊳',
    curlyeqsucc: '⋟',
    Join: '⋈',
    simcolon: '∼:',
    vcentcolon: ':',
    ratio: ':',
    dashv: '⊣',
    le: '≤',
    simcoloncolon: '∼∷',
    vdash: '⊢',
    dblcolon: '∷',
    coloncolon: '∷',
    leq: '≤',
    simeq: '≃',
    vDash: '⊨',
    doteq: '≐',
    leqq: '≦',
    smallfrown: '⌢',
    Vdash: '⊩',
    Doteq: '≑',
    leqslant: '⩽',
    smallsmile: '⌣',
    Vvdash: '⊪',
  
    gnapprox: '⪊',
    ngeqslant: '≱',
    nsubseteq: '⊈',
    precneqq: '⪵',
    gneq: '⪈',
    ngtr: '≯',
    nsubseteqq: '⊈',
    precnsim: '⋨',
    gneqq: '≩',
    nleq: '≰',
    nsucc: '⊁',
    subsetneq: '⊊',
    gnsim: '⋧',
    nleqq: '≰',
    nsucceq: '⋡',
    subsetneqq: '⫋',
    gvertneqq: '≩',
    nleqslant: '≰',
    nsupseteq: '⊉',
    succnapprox: '⪺',
    lnapprox: '⪉',
    nless: '≮',
    nsupseteqq: '⊉',
    succneqq: '⪶',
    lneq: '⪇',
    // nmid: '∤',
    ntriangleleft: '⋪',
    succnsim: '⋩',
    lneqq: '≨',
    notin: '∉',
    ntrianglelefteq: '⋬',
    supsetneq: '⊋',
    lnsim: '⋦',
    notni: '∌',
    ntriangleright: '⋫',
    supsetneqq: '⫌',
    lvertneqq: '≨',
    // nparallel: '∦',
    ntrianglerighteq: '⋭',
    varsubsetneq: '⊊',
    ncong: '≆',
    nprec: '⊀',
    nvdash: '⊬',
    varsubsetneqq: '⫋',
    npreceq: '⋠',
    nvDash: '⊭',
    varsupsetneq: '⊋',
    // neq: '≠',
    nshortmid: '∤',
    nVDash: '⊯',
    varsupsetneqq: '⫌',
    ngeq: '≱',
    nshortparallel: '∦',
    nVdash: '⊮',
    ngeqq: '≱',
    nsim: '≁',
    precnapprox: '⪹',
  
    /* Arrows */
  
    circlearrowleft: '↺',
    leftharpoonup: '↼',
    rArr: '⇒',
    circlearrowright: '↻',
    leftleftarrows: '⇇',
    rarr: '→',
    curvearrowleft: '↶',
    leftrightarrow: '↔',
    restriction: '↾',
    curvearrowright: '↷',
    Leftrightarrow: '⇔',
    rightarrow: '→',
    Darr: '⇓',
    leftrightarrows: '⇆',
    Rightarrow: '⇒',
    dArr: '⇓',
    leftrightharpoons: '⇋',
    rightarrowtail: '↣',
    darr: '↓',
    leftrightsquigarrow: '↭',
    rightharpoondown: '⇁',
    dashleftarrow: '⇠',
    Lleftarrow: '⇚',
    rightharpoonup: '⇀',
    dashrightarrow: '⇢',
    longleftarrow: '⟵',
    rightleftarrows: '⇄',
    downarrow: '↓',
    Longleftarrow: '⟸',
    rightleftharpoons: '⇌',
    Downarrow: '⇓',
    longleftrightarrow: '⟷',
    rightrightarrows: '⇉',
    downdownarrows: '⇊',
    Longleftrightarrow: '⟺',
    rightsquigarrow: '⇝',
    downharpoonleft: '⇃',
    longmapsto: '⟼',
    Rrightarrow: '⇛',
    downharpoonright: '⇂',
    longrightarrow: '⟶',
    Rsh: '↱',
    gets: '←',
    Longrightarrow: '⟹',
    searrow: '↘',
    Harr: '⇔',
    looparrowleft: '↫',
    swarrow: '↙',
    hArr: '⇔',
    looparrowright: '↬',
    to: '→',
    harr: '↔',
    Lrarr: '⇔',
    twoheadleftarrow: '↞',
    hookleftarrow: '↩',
    lrArr: '⇔',
    twoheadrightarrow: '↠',
    hookrightarrow: '↪',
    lrarr: '↔',
    Uarr: '⇑',
    iff: '⟺',
    Lsh: '↰',
    uArr: '⇑',
    impliedby: '⟸',
    mapsto: '↦',
    uarr: '↑',
    implies: '⟹',
    nearrow: '↗',
    uparrow: '↑',
    Larr: '⇐',
    nleftarrow: '↚',
    Uparrow: '⇑',
    lArr: '⇐',
    nLeftarrow: '⇍',
    updownarrow: '↕',
    larr: '←',
    nleftrightarrow: '↮',
    Updownarrow: '⇕',
    leadsto: '⇝',
    nLeftrightarrow: '⇎',
    upharpoonleft: '↿',
    leftarrow: '←',
    nrightarrow: '↛',
    upharpoonright: '↾',
    Leftarrow: '⇐',
    nRightarrow: '⇏',
    upuparrows: '⇈',
    leftarrowtail: '↢',
    nwarrow: '↖',
    leftharpoondown: '↽',
    Rarr: '⇒',
  
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
  
    /* Spacing */
    ',': ' ',
    '>': ' ',
    ':': ' ',
    ';': ' '.repeat(2),
    '!': '', // stub
    quad: ' '.repeat(4),
    qquad: ' '.repeat(6),
    thinspace: ' ',
    medspace: ' ',
    thickspace: ' '.repeat(2),
    enspace: ' '.repeat(2),
    negthickspace: '', // stub
    negthinspace: '', // stub
    negmedspace: '', // stub
  
  
  
    '(': '(',
    ')': ')',
    '[': '[',
    ']': ']',
    '{': '{',
    '}': '}',
    '_': '_',
    '%': '%',
    '\\': '\n',
    'newline': '\n',
  
    /* Symbols and Punctuation */
    surd: '√',
    checkmark: '✓',
    top: '⊤',
    bot: '⊥',
    mho: '℧',
    star: '⋆', 
    bigstar: '★', 
    Game: '⅁', 
  
    /* exp */
    sumtop: '⎲', 
    sumbottom: '⎳', 
    lbraceuend: '⎧', 
    lbracemid: '⎨', 
    lbracelend: '⎩', 
  }
  
  const operatornames = [
    'arcsin', 'arccos', 'arctan', 'arctg',
    'arcctg', 'arg',    'ch',     'cos',
    'det',    'gcd',    'inf',    'cosec',
    'cosh',   'cot',    'cotg',   'coth',
    'csc',    'ctg',    'cth',    'lim',
    'max',    'deg',    'dim',    'exp',
    'hom',    'ker',    'lg',     'ln',
    'log',    'min',    'plim',   'Pr',
    'sup',    'sec',    'sin',    'sinh',
    'sh',     'tan',    'tanh',   'tg',
    'th'
  ]
  operatornames.forEach(x => Fixed[x] = x)
  
  
  const greeks = [
    'Alpha',   'Beta',  'Gamma',   'Delta',
    'Epsilon', 'Zeta',  'Eta',     'Theta',
    'Iota',    'Kappa', 'Lambda',  'Mu',
    'Nu',      'Xi',    'Omicron', 'Pi',
    'Rho',     'Sigma', 'Tau',     'Upsilon',
    'Phi',     'Chi',   'Psi',     'Omega',
    'alpha',   'beta',  'gamma',   'delta',
    'epsilon', 'zeta',  'eta',     'theta',
    'iota',    'kappa', 'lambda',  'mu',
    'nu',      'xi',    'omicron', 'pi',
    'rho',     'sigma', 'tau',     'upsilon',
    'phi',     'chi',   'psi',     'omega'
  ]
  greeks.forEach((x, i) => Fixed[x] = _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].greeks[i])
  Fixed.epsilon = 'ϵ'
  
  
  // fixed symbol as supscripts
  _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].supscripts[Fixed.times] = _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].supscripts.x
  
  // fixed symbol as subscripts
  _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].subscripts[Fixed.in] = Fixed.smallin
  _utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].subscripts[Fixed.ni] = Fixed.smallni
  
  
  // Gothic
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const gothics = ['ahsa', 'bairkan', 'giba', 'dags', 'aihvus']
  
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Fixed);
  
  
  /***/ }),
  /* 7 */
  /***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _utils_proper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
  /* harmony import */ var _utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
  
  
  
  
  const Unary = {
    id: x => x,
    text: x => x, 
    mathrm: x => x, 
  
    sqrt: x => '√' + _utils_proper_js__WEBPACK_IMPORTED_MODULE_0__["default"].paren(x),
    cbrt: x => '∛' + _utils_proper_js__WEBPACK_IMPORTED_MODULE_0__["default"].paren(x), // original
    furt: x => '∜' + _utils_proper_js__WEBPACK_IMPORTED_MODULE_0__["default"].paren(x), // original
  
    grave: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0300' : '-grave'),
    '`': x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0300' : ''),
  
    acute: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0301' : '-acute'),
    '\'': x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0301' : ''),
    
    hat: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0302' : '-hat'),
    '^': x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0302' : ''),
    
    tilde: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0303' : '-tilde'),
    '~': x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0303' : ''),
  
    bar: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0304' : '-bar'),
    '=': x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0304' : ''),
    
    overline: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0305' : '-underline'),
    breve: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0306' : '-breve'),
    u: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0306' : ''),
  
    '.': x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0307' : ''),
    '"': x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u0308' : ''),
    
    
    r: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u030A' : ''),
    H: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u030B' : ''),
    v: x => x + (_utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].isLetter(x) ? '\u030C' : ''),
  
  
    kern: x => x.endsWith('em') ? ' '.repeat(x.substring(0, x.length - 2)) : ' ',
  
    __optional__: {
      sqrt: (n, x) =>
        n == 2 ? Unary.sqrt(x) :
          n == 3 ? Unary.cbrt(x) :
            n == 4 ? Unary.furt(x) :
              _utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].suprender(n) + Unary.sqrt(x), 
    }
  }
  Unary.mkern = Unary.kern
  Unary.mskip = Unary.kern
  Unary.hskip = Unary.kern
  Unary.hspace = Unary.kern
  
  _utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].typefaceNames.forEach(x => Unary[x] = s => _utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].render(s, x))
  
  /* just for typeface: Parser */
  Unary.typefaceNames = ['text', 'mathrm', ..._utils_unicode_js__WEBPACK_IMPORTED_MODULE_1__["default"].typefaceNames]
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Unary);
  
  
  /***/ }),
  /* 8 */
  /***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
  /* harmony export */ });
  /* harmony import */ var _fixed_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
  
  
  
  const Environment = {
    // matrix family
    matrix: xs => sepMatrix(xs, ' ', ' ', '; '),
    smallmatrix: xs => sepMatrix(xs, ' ', ' ', '; '),
  
    bmatrix: xs => regMatrix(xs, '[', ']'),
    pmatrix: xs => regMatrix(xs, '(', ')'),
    vmatrix: xs => sepMatrix(xs, '|', '|', '; '),
  
    Bmatrix: xs => regMatrix(xs, '{', '}'),
    Vmatrix: xs => sepMatrix(xs, '||', '||', '; '),
  
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
  
  const doubleBackslash = '\\\\'
  
  const matrim = x => x.replace(/\s/g, '').replace(/&/g, ' ')
  
  const regMatrix = function (gel, ls, rs, lg = ls, rg = rs) {
    const xs = gel.split(doubleBackslash)
    const s = ''.concat(...xs.map(x => ls + matrim(x) + rs))
    return xs.length > 1 ? lg + s + rg : s
  }
  
  const sepMatrix = function (gel, lg, rg, sep) {
    const xs = gel.split(doubleBackslash)
    return lg + xs.map(matrim).join(sep) + rg
  }
  
  
  
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
      .replace(/ *(,|\.) */g, '$1 ')
    return result
  }
  
  const regexpDoubleLine = /\r\n\r\n|\n\n/
  
  const theoremstyle = function (type, content) {
    let title = _fixed_js__WEBPACK_IMPORTED_MODULE_0__["default"][type] + '. '
    return title + content
      .split(regexpDoubleLine)
      .map(polymerizeTeX)
      .join('\n')
  }
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Environment);
  
  
  /***/ }),
  /* 9 */
  /***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {
  
  __webpack_require__.r(__webpack_exports__);
  /* harmony export */ __webpack_require__.d(__webpack_exports__, {
  /* harmony export */   "character": () => (/* binding */ character),
  /* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
  /* harmony export */   "digit": () => (/* binding */ digit),
  /* harmony export */   "digits": () => (/* binding */ digits),
  /* harmony export */   "includes": () => (/* binding */ includes),
  /* harmony export */   "inclusive": () => (/* binding */ inclusive),
  /* harmony export */   "letter": () => (/* binding */ letter),
  /* harmony export */   "letters": () => (/* binding */ letters),
  /* harmony export */   "loose": () => (/* binding */ loose),
  /* harmony export */   "soft": () => (/* binding */ soft),
  /* harmony export */   "space": () => (/* binding */ space),
  /* harmony export */   "spacea": () => (/* binding */ spacea),
  /* harmony export */   "spaces": () => (/* binding */ spaces),
  /* harmony export */   "string": () => (/* binding */ string),
  /* harmony export */   "token": () => (/* binding */ token),
  /* harmony export */   "tokens": () => (/* binding */ tokens)
  /* harmony export */ });
  /* harmony import */ var _utils_link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
  
  
  
  // Parse<A>.parse: String -> [A, String]
  const Parser = function (parse) {
    this.parse = parse
  }
  Parser.create = parse => new Parser(parse)
  
  /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Parser);
  
  Parser.prototype.many = function () {
    return new Parser(source => {
      let [list, residue, tuple] = [[], source]
      // eslint-disable-next-line no-cond-assign
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
      // eslint-disable-next-line no-cond-assign
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
        .run()
    )
  }
  
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
        .pip((0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(xs => next.parse(xs[1])))
        .map(xs => [[xs[0][0], xs[1][0]], xs[1][1]])
        .run()
    )
  }
  
  /*
   *  tuple1? -> [a, phase1]                 (check)
   *          -> [[a, phase1], tuple2?]      (glue )
   *          -> [[a, phase1], [b, phase2]]  (check)
   *          -> [a, phase2]
   */
  Parser.prototype.skip = function (next) {
    return new Parser(source =>
      (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(() => this.parse(source))
        .pip((0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(xs => next.parse(xs[1])))
        .map(xs => [xs[0][0], xs[1][1]])
        .run()
    )
  }
  
  
  /*
   *  tuple1? -> [a, phase1]                 (check)
   *          -> [[a, phase1], tuple2?]      (glue )
   *          -> [[a, phase1], [b, phase2]]  (check)
   *          -> [b, phase2]
   */
  Parser.prototype.move = function (next) {
    return new Parser(source =>
      (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(() => this.parse(source))
        .pip((0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(xs => next.parse(xs[1])))
        .map(xs => xs[1])
        .run()
    )
  }
  
  
  /*
   *  tuple? -> [a, residue]
   *         -> [a, residue] (check predicate)
   */
  Parser.prototype.check = function (predicate) {
    return new Parser(source =>
      (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(() => this.parse(source))
        .check(x => predicate(...x))
        .run()
    )
  }
  
  /*
   *  tuple1? -> tuple1 (check)
   *        ! -> tuple2
   */
  Parser.prototype.or = function (next) {
    return new Parser(source =>
      this.parse(source) || next.parse(source)
    )
  }
  
  Parser.prototype.log = function (s) {
    return this.map(x => (console.log(s + x), x))
  }
  
  
  const token = predicate => new Parser(
    source => source.length > 0
      ? predicate(source[0])
        ? [source[0], source.substring(1)]
        : undefined
      : undefined
  )
  
  const tokens = (n, predicate) => new Parser(
    source => source.length >= n ?
      (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.link)(() => source.substring(0, n))
        .check(predicate)
        .map(x => [x, source.substring(n)])
        .run()
      : undefined
  )
  const inclusive = (n, ...xs) => tokens(n, x => xs.includes(x))
  
  const character = char => token(x => x == char)
  const includes = (...xs) => token(x => xs.includes(x))
  
  const string = str => new Parser(
    source => source.length >= str.length
      ? source.startsWith(str)
        ? [str, source.substring(str.length)]
        : undefined
      : undefined
  )
  
  const space = character(' ')
  const spacea = space.asterisk()
  const spaces = space.plus()
  
  const loose = x => spacea.follow(x).second()
  const soft = x => loose(x).skip(spacea)
  
  Number.prototype.boundedIn = (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.proxy)((x, a, b) => a <= x && x <= b)
  String.prototype.code = (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.proxy)(x => x.codePointAt(0))
  String.prototype.boundedIn = (0,_utils_link_js__WEBPACK_IMPORTED_MODULE_0__.proxy)((x, a, b) => x.code().boundedIn(a.code(), b.code()))
  
  const digit = token(x => x.boundedIn('0', '9'))
  const digits = digit.plus()
  
  const letter = token(x => x.boundedIn('a', 'z') || x.boundedIn('A', 'Z'))
  const letters = letter.plus()
  
  
  
  
  
  
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
  /* harmony export */   "UniTeX": () => (/* binding */ UniTeX)
  /* harmony export */ });
  /* harmony import */ var _src_utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
  /* harmony import */ var _src_macro_binary_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
  /* harmony import */ var _src_macro_unary_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
  /* harmony import */ var _src_macro_fixed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
  /* harmony import */ var _src_macro_environment_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
  /* harmony import */ var _src_utils_block_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5);
  /* harmony import */ var _src_parsec_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9);
  
  
  
  
  
  
  
  
  
  
  
  const backslash = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.character)('\\')
  
  const lbrace = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.character)('{')
  const rbrace = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.character)('}')
  const braceWrap = x => lbrace.move(x).skip(rbrace)
  
  const lbracket = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.character)('[')
  const rbracket = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.character)(']')
  const bracketWrap = x => lbracket.move(x).skip(rbracket)
  
  const special = x => '\\{}_^%$'.includes(x)
  // const unit = digit.skip(string('em'))
  
  const literal = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.token)(x => !special(x))
  const literals = literal.plus()
  
  const solid = x => x.trim().length == 1
  const valuesymbol = literal.check(solid)
  const single = _src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.digit.or(_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.letter).or(valuesymbol).or(() => fixedMacro)
  const value = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.loose)(single.or(braceWrap(() => text)))
  const optional = bracketWrap(value) // [value]
  
  const symbolMacros = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.includes)(...'|,>:!()[]{}_%\\`^~=."\'')
  
  const macroName = _src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.letters.or(symbolMacros)
  const macroh = backslash.move(macroName)
  
  const fixedMacro = macroh.check(x => _src_macro_fixed_js__WEBPACK_IMPORTED_MODULE_3__["default"][x] != undefined)
    .map(x => _src_macro_fixed_js__WEBPACK_IMPORTED_MODULE_3__["default"][x])
  
  // [macro, value]
  const unaryOrdinaryMacro = macroh.check(x => _src_macro_unary_js__WEBPACK_IMPORTED_MODULE_2__["default"][x])
    .follow(value)
    .map(xs => _src_macro_unary_js__WEBPACK_IMPORTED_MODULE_2__["default"][xs[0]](xs[1]))
  
  // [[marco, optional], value]
  const unaryOptionalMacro = macroh.check(x => _src_macro_unary_js__WEBPACK_IMPORTED_MODULE_2__["default"].__optional__[x])
    .follow(optional)
    .follow(value)
    .map(xs => _src_macro_unary_js__WEBPACK_IMPORTED_MODULE_2__["default"].__optional__[xs[0][0]](xs[0][1], xs[1]))
  
  const unaryMacro = unaryOptionalMacro.or(unaryOrdinaryMacro)
  
  // [[macro, value1], value2]
  const binaryMacro = macroh.check(x => _src_macro_binary_js__WEBPACK_IMPORTED_MODULE_1__["default"][x])
    .follow(value)
    .follow(value)
    .map(xs => _src_macro_binary_js__WEBPACK_IMPORTED_MODULE_1__["default"][xs[0][0]](xs[0][1], xs[1]))
  
  // [[value1, macro], value2]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const infixMacro = value
    .follow(macroh.check(x => _src_macro_binary_js__WEBPACK_IMPORTED_MODULE_1__["default"].__infix__[x]))
    .follow(value)
    .map(xs => _src_macro_binary_js__WEBPACK_IMPORTED_MODULE_1__["default"][xs[0][1]](xs[0][0], xs[1]))
  
  
  const envira = braceWrap(_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.letters)
  const begin = backslash.skip((0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.string)('begin')).move(envira)
  const end = backslash.skip((0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.string)('end')).move(envira)
  // [[begin, text], end]
  const environ = begin.follow(() => section).follow(end)
    .check(xs => xs[0][0] == xs[1])
    .map(xs => _src_macro_environment_js__WEBPACK_IMPORTED_MODULE_4__["default"][xs[1]](xs[0][1]))
  //
  
  
  const supscript = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.character)('^').move(value)
    .map(_src_utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].suprender)
  const subscript = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.character)('_').move(value)
    .map(_src_utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].subrender)
  const suporsub = supscript.or(subscript)
  
  const comment = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.character)('%')
    .skip((0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.token)(x => x != '\n').asterisk())
    .skip((0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.character)('\n'))
    .map(() => '')
  //
  
  
  const typeface = macroh.check(x => _src_macro_unary_js__WEBPACK_IMPORTED_MODULE_2__["default"].typefaceNames.includes(x))
    .follow(value)
    .map(xs => _src_macro_unary_js__WEBPACK_IMPORTED_MODULE_2__["default"][xs[0]](xs[1]))
  
  //
  
  
  // inline
  const inlineElem = literals
    // .or(infixMacro)
    .or(suporsub)
    .or(environ)
    .or(unaryMacro)
    .or(binaryMacro)
    .or(value)
  
  const italicRender = s => _src_utils_unicode_js__WEBPACK_IMPORTED_MODULE_0__["default"].render(s, 'mathit')
  
  const inlineCluster = typeface
    // .or(fixedMacro)
    .or(inlineElem.map(italicRender))
    .plus()
  const dollar = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.character)('$')
  const inlineMath = dollar.move(inlineCluster).skip(dollar)
  
  
  
  
  // block
  const blockInfix = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.token)(x => '+-*/<>~'.includes(x))
    .or(macroh.check(x => _src_macro_fixed_js__WEBPACK_IMPORTED_MODULE_3__["default"].infixs.includes(x)).map(x => _src_macro_fixed_js__WEBPACK_IMPORTED_MODULE_3__["default"][x]))
    .map(x => ` ${x} `.toBlock())
  
  const blockValue = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.loose)(single
    .map(x => x.toBlock())
    .or(braceWrap(() => blockCluster)))
  const blockBinaryMacro = macroh.check(x => _src_macro_binary_js__WEBPACK_IMPORTED_MODULE_1__["default"].__block__[x])
    .follow(blockValue)
    .follow(blockValue)
    .map(xs => _src_macro_binary_js__WEBPACK_IMPORTED_MODULE_1__["default"].__block__[xs[0][0]](xs[0][1], xs[1]))
  
  const blockElem = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.loose)(blockInfix)
    .or(blockValue) // csp. value
    .or(suporsub.map(_src_utils_block_js__WEBPACK_IMPORTED_MODULE_5__["default"].of))
    .or(fixedMacro.map(_src_utils_block_js__WEBPACK_IMPORTED_MODULE_5__["default"].of))
    .or(unaryMacro.map(_src_utils_block_js__WEBPACK_IMPORTED_MODULE_5__["default"].of))
    .or(blockBinaryMacro) // csp. binary
    .or((0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.token)(x => !solid(x)).some().map(() => _src_utils_block_js__WEBPACK_IMPORTED_MODULE_5__["default"].empty))
  
  const blockCluster = blockElem.some()
    .map(x => x.reduce((s, t) => s.append(t)))
  
  const doubleDollar = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.string)('$$')
  const blockMath = doubleDollar
    .move(blockCluster.map(x => x.string))
    .skip(doubleDollar)
  //
  
  const mathstyle = blockMath.or(inlineMath)
  
  /** 
   * because there is a simplified version of 
   * the theorem style (as fixed macro), it is 
   * necessary to ensure that the environment 
   * takes precedence over those macros. 
   *
   */
  const element = literals
    .or(comment)
    .or(mathstyle)
    .or(inlineElem)
  //
  
  const doubleBackslash = (0,_src_parsec_js__WEBPACK_IMPORTED_MODULE_6__.string)('\\\\')
  const section = doubleBackslash.or(element).plus()
  
  const unknownMacro = macroh.map(x => '\\' + x)
  
  const spectrum = element.or(unknownMacro)
  const text = spectrum.plus()
  
  const UniTeX = {
    parse: s => (x => x ? x[0] : '')(text.parse(s)), 
    fixeds: () => Object.keys(_src_macro_fixed_js__WEBPACK_IMPORTED_MODULE_3__["default"]), 
    unaries: () => Object.keys(_src_macro_unary_js__WEBPACK_IMPORTED_MODULE_2__["default"]), 
    binaries: () => Object.keys(_src_macro_binary_js__WEBPACK_IMPORTED_MODULE_1__["default"]), 
  }
  
  })();
  
  var __webpack_export_target__ = window;
  for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
  if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
  /******/ })()
  ;