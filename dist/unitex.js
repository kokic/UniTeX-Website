// src/impl/unicode/proper.ts
var shouldWrap = (x) => x.charAt(0) == "-" ? shouldWrap(x.substring(1)) : x.length <= 1;
var Proper;
((Proper) => {
  Proper.wrap = (ls, rs) => (x) => shouldWrap(x) ? x : `${ls}${x}${rs}`;
  Proper.paren = Proper.wrap("(", ")");
  Proper.bracket = Proper.wrap("[", "]");
  Proper.brace = Proper.wrap("{", "}");
})(Proper ||= {});
var proper_default = Proper;

// src/parsec/string-iterator.ts
class StringIterator {
  source;
  index;
  constructor(source, index) {
    this.source = source;
    this.index = index;
  }
  extract(pos) {
    const end = typeof pos == "number" ? pos : pos.index;
    return this.source.substring(this.index, end);
  }
  hasNext() {
    return this.index < this.source.length;
  }
  curr() {
    return this.source.charAt(this.index);
  }
  next() {
    return new StringIterator(this.source, this.index + 1);
  }
  forward(length) {
    return new StringIterator(this.source, this.index + length);
  }
}

// src/parsec/declare-global.ts
Number.prototype.boundedIn = function(a, b) {
  return a <= this && this <= b;
};
String.prototype.boundedIn = function(a, b) {
  const [code, start, end] = [this, a, b].map((s) => s.codePointAt(0));
  return code.boundedIn(start, end);
};
String.prototype.toIterator = function() {
  return new StringIterator(this, 0);
};

// src/impl/unicode/unicode-table.ts
var Unicode = {
  typeface: {},
  isLetterOrGreek: (s) => s.boundedIn("a", "z") || s.boundedIn("A", "Z") || s.boundedIn("α", "϶") || s.boundedIn("Α", "Ω"),
  series: (a, b) => {
    let [start, end] = [a.codePointAt(0), b.codePointAt(0)];
    let length = end - start + 1;
    let codes = Array.from({ length }, (_, x) => x + start);
    return String.fromCodePoint(...codes);
  },
  make_smap: (from, to) => {
    let map = Object.create(null);
    from.forEach((x, i) => map[x] = to[i]);
    return map;
  },
  merge_smap: (...smaps) => Object.assign(Object.create(null), ...smaps),
  alphabets: (...table) => Unicode.make_smap(Unicode["letterArray"], table),
  apply_smap: (s, smap) => Array.from(s).map((x) => smap[x] || x).join(""),
  block: (a, b, names) => {
    let map = new Object;
    let data = Unicode.series(a, b);
    names.forEach((name, i) => name && (map[name] = data[i]));
    return map;
  },
  render_if_exists: (s, name) => Unicode.apply_smap(s, Unicode.typeface[name]),
  render_if_forall: (charset, str, otherwise = (x) => x) => {
    const array = Array.from(str);
    let through = true;
    for (const element of array)
      through &&= !!charset[element];
    return through ? array.map((x) => charset[x]).join("") : otherwise(str);
  },
  recover_placeholders: (s) => Unicode.apply_smap(s, recover),
  typefaceNames: [],
  suprender: (s) => Unicode.render_if_forall(Unicode["supscripts"], s, (x) => "^" + proper_default.brace(x)),
  subrender: (s) => Unicode.render_if_forall(Unicode["subscripts"], s, (x) => "_" + proper_default.brace(x)),
  supscripts: {},
  subscripts: {},
  greeks: {}
};
Unicode["letterUppers"] = Unicode.series("A", "Z");
Unicode["letterLowers"] = Unicode.series("a", "z");
Unicode["letters"] = Unicode["letterUppers"] + Unicode["letterLowers"];
Unicode["letterArray"] = Array.from(Unicode["letters"]);
Unicode["greekUppers"] = Unicode.series("Α", "Ρ") + Unicode.series("Σ", "Ω");
Unicode["greekLowers"] = Unicode.series("α", "ρ") + Unicode.series("σ", "ω");
Unicode["greeks"] = Unicode["greekUppers"] + Unicode["greekLowers"];
Unicode["greekArray"] = Array.from(Unicode["greeks"]);
Unicode["digits"] = Unicode.series("0", "9");
Unicode["digitArray"] = Array.from(Unicode["digits"]);
var series = Unicode.series;
var make_smap = Unicode.make_smap;
var merge_smap = Unicode.merge_smap;
var alphabets = Unicode.alphabets;
var typeface = function(name, alphabet) {
  Unicode.typeface[name] = alphabet;
};
var mathbf = [...series("\uD835\uDC00", "\uD835\uDC33")];
var mathit = [...series("\uD835\uDC34", "\uD835\uDC54"), "ℎ", ...series("\uD835\uDC56", "\uD835\uDC67")];
var mathbfit = [...series("\uD835\uDC68", "\uD835\uDC9B")];
var mathscr = [..."\uD835\uDC9Cℬ\uD835\uDC9E\uD835\uDC9Fℰℱ\uD835\uDCA2ℋℐ\uD835\uDCA5\uD835\uDCA6ℒℳ\uD835\uDCA9\uD835\uDCAA\uD835\uDCAB\uD835\uDCACℛ\uD835\uDCAE\uD835\uDCAF\uD835\uDCB0\uD835\uDCB1\uD835\uDCB2\uD835\uDCB3\uD835\uDCB4\uD835\uDCB5\uD835\uDCB6\uD835\uDCB7\uD835\uDCB8\uD835\uDCB9ℯ\uD835\uDCBBℊ\uD835\uDCBD\uD835\uDCBE\uD835\uDCBF\uD835\uDCC0\uD835\uDCC1\uD835\uDCC2\uD835\uDCC3ℴ\uD835\uDCC5\uD835\uDCC6\uD835\uDCC7\uD835\uDCC8\uD835\uDCC9\uD835\uDCCA\uD835\uDCCB\uD835\uDCCC\uD835\uDCCD\uD835\uDCCE\uD835\uDCCF"];
var mathbfscr = [...series("\uD835\uDCD0", "\uD835\uDD03")];
var mathfrak = [..."\uD835\uDD04\uD835\uDD05ℭ\uD835\uDD07\uD835\uDD08\uD835\uDD09\uD835\uDD0A\uD835\uDD09\uD835\uDD0A\uD835\uDD0D\uD835\uDD0E\uD835\uDD0F\uD835\uDD10\uD835\uDD11\uD835\uDD12\uD835\uDD13\uD835\uDD14ℜ\uD835\uDD16\uD835\uDD17\uD835\uDD18\uD835\uDD19\uD835\uDD1A\uD835\uDD1B\uD835\uDD1Cℨ", ...series("\uD835\uDD1E", "\uD835\uDD37")];
var mathbb = [..."\uD835\uDD38\uD835\uDD39ℂ\uD835\uDD3B\uD835\uDD3C\uD835\uDD3D\uD835\uDD3Eℍ\uD835\uDD40\uD835\uDD41\uD835\uDD42\uD835\uDD43\uD835\uDD44ℕ\uD835\uDD46ℙℚℝ\uD835\uDD4A\uD835\uDD4B\uD835\uDD4C\uD835\uDD4D\uD835\uDD4E\uD835\uDD4F\uD835\uDD50ℤ", ...series("\uD835\uDD52", "\uD835\uDD6B")];
var mathbffrak = [...series("\uD835\uDD6C", "\uD835\uDD9F")];
var mathsf = [...series("\uD835\uDDA0", "\uD835\uDDD3")];
var mathbfsf = [...series("\uD835\uDDD4", "\uD835\uDE07")];
var mathitsf = [...series("\uD835\uDE08", "\uD835\uDE3B")];
var mathbfitsf = [...series("\uD835\uDE3C", "\uD835\uDE6F")];
var mathtt = [...series("\uD835\uDE70", "\uD835\uDEA3")];
var mathbf_greek = [...series("\uD835\uDEA8", "\uD835\uDEB8"), ...series("\uD835\uDEBA", "\uD835\uDEC0"), ...series("\uD835\uDEC2", "\uD835\uDED2"), ...series("\uD835\uDED4", "\uD835\uDEDA")];
var mathit_greek = [...series("\uD835\uDEE2", "\uD835\uDEF2"), ...series("\uD835\uDEF4", "\uD835\uDEFA"), ...series("\uD835\uDEFC", "\uD835\uDF0C"), ...series("\uD835\uDF0E", "\uD835\uDF14")];
var mathbfit_greek = [...series("\uD835\uDF1C", "\uD835\uDF2C"), ...series("\uD835\uDF2E", "\uD835\uDF34"), ...series("\uD835\uDF36", "\uD835\uDF46"), ...series("\uD835\uDF48", "\uD835\uDF4E")];
var mathsf_greek_placeholder = [...series("\uDB80\uDC00", "\uDB80\uDC2F")];
var mathbfsf_greek = [...series("\uD835\uDF56", "\uD835\uDF66"), ...series("\uD835\uDF68", "\uD835\uDF6E"), ...series("\uD835\uDF70", "\uD835\uDF80"), ...series("\uD835\uDF82", "\uD835\uDF88")];
var mathitsf_greek_placeholder = [...series("\uDB80\uDC30", "\uDB80\uDC5F")];
var mathbfitsf_greek = [...series("\uD835\uDF90", "\uD835\uDFA0"), ...series("\uD835\uDFA2", "\uD835\uDFA8"), ...series("\uD835\uDFAA", "\uD835\uDFBA"), ...series("\uD835\uDFBC", "\uD835\uDFC2")];
var mathbf_digit = [...series("\uD835\uDFCE", "\uD835\uDFD7")];
var mathbb_digit = [...series("\uD835\uDFD8", "\uD835\uDFE1")];
var mathsf_digit = [...series("\uD835\uDFE2", "\uD835\uDFEB")];
var mathbfsf_digit = [...series("\uD835\uDFEC", "\uD835\uDFF5")];
var mathtt_digit = [...series("\uD835\uDFF6", "\uD835\uDFFF")];
var misc = [..."ϴ∇ς∂ϵϑϰϕϱϖ"];
var mathbf_misc = [..."\uD835\uDEB9\uD835\uDEC1\uD835\uDED3", ...series("\uD835\uDEDB", "\uD835\uDEE1")];
var mathit_misc = [..."\uD835\uDEF3\uD835\uDEFB\uD835\uDF0D", ...series("\uD835\uDF15", "\uD835\uDF1B")];
var mathsf_misc_placeholder = [...series("\uDB80\uDC60", "\uDB80\uDC69")];
var mathbfit_misc = [..."\uD835\uDF2D\uD835\uDF35\uD835\uDF47", ...series("\uD835\uDF4F", "\uD835\uDF55")];
var mathbfsf_misc = [..."\uD835\uDF67\uD835\uDF6F\uD835\uDF81", ...series("\uD835\uDF89", "\uD835\uDF8F")];
var mathitsf_misc_placeholder = [...series("\uDB80\uDC6A", "\uDB80\uDC73")];
var mathbfitsf_misc = [..."\uD835\uDFA1\uD835\uDFA9\uD835\uDFBB", ...series("\uD835\uDFC3", "\uD835\uDFC9")];
typeface("mathbb", merge_smap(alphabets(...mathbb), make_smap(Unicode["digitArray"], mathbb_digit), make_smap([..."πγΓΠ∑\uD835\uDC37\uD835\uDC51\uD835\uDC52\uD835\uDC56\uD835\uDC57"], [..."ℼℽℾℿ⅀ⅅⅆⅇⅈⅉ"])));
typeface("mathfrak", merge_smap(alphabets(...mathfrak), make_smap(mathbf, mathbffrak)));
typeface("mathscr", merge_smap(alphabets(...mathscr), make_smap(mathbf, mathbfscr)));
typeface("mathcal", Unicode.typeface["mathscr"]);
typeface("mathbf", merge_smap(alphabets(...mathbf), make_smap(mathit, mathbfit), make_smap(mathscr, mathbfscr), make_smap(mathfrak, mathbffrak), make_smap(mathsf, mathbfsf), make_smap(mathitsf, mathbfitsf), make_smap(Unicode["greekArray"], mathbf_greek), make_smap(mathit_greek, mathbfit_greek), make_smap(mathsf_greek_placeholder, mathbfsf_greek), make_smap(mathitsf_greek_placeholder, mathbfitsf_greek), make_smap(Unicode["digitArray"], mathbf_digit), make_smap(mathsf_digit, mathbfsf_digit), make_smap(misc, mathbf_misc), make_smap(mathit_misc, mathbfit_misc), make_smap(mathsf_misc_placeholder, mathbfsf_misc), make_smap(mathitsf_misc_placeholder, mathbfitsf_misc), make_smap(["Ϝ", "ϝ"], ["\uD835\uDFCA", "\uD835\uDFCB"])));
typeface("mathit", merge_smap(alphabets(...mathit), make_smap(mathbf, mathbfit), make_smap(mathsf, mathitsf), make_smap(mathbfsf, mathbfitsf), make_smap(Unicode["greekArray"], mathit_greek), make_smap(mathbf_greek, mathbfit_greek), make_smap(mathsf_greek_placeholder, mathitsf_greek_placeholder), make_smap(mathbfsf_greek, mathbfitsf_greek), make_smap(misc, mathit_misc), make_smap(mathbf_misc, mathbfit_misc), make_smap(mathsf_misc_placeholder, mathitsf_misc_placeholder), make_smap(mathbfsf_misc, mathbfitsf_misc), make_smap([..."ħıȷ\uD835\uDD3B\uD835\uDD55\uD835\uDD56\uD835\uDD5A\uD835\uDD5B"], [..."ℏ\uD835\uDEA4\uD835\uDEA5ⅅⅆⅇⅈⅉ"])));
typeface("mathsf", merge_smap(alphabets(...mathsf), make_smap(mathbf, mathbfsf), make_smap(mathit, mathitsf), make_smap(mathbfit, mathbfitsf), make_smap(Unicode["greekArray"], mathsf_greek_placeholder), make_smap(mathbf_greek, mathbfsf_greek), make_smap(mathit_greek, mathitsf_greek_placeholder), make_smap(mathbfit_greek, mathbfitsf_greek), make_smap(Unicode["digitArray"], mathsf_digit), make_smap(mathbf_digit, mathbfsf_digit), make_smap(misc, mathsf_misc_placeholder), make_smap(mathbf_misc, mathbfsf_misc), make_smap(mathit_misc, mathitsf_misc_placeholder), make_smap(mathbfit_misc, mathbfitsf_misc)));
typeface("mathtt", merge_smap(alphabets(...mathtt), make_smap(Unicode["digitArray"], mathtt_digit)));
typeface("textbf", Unicode.typeface.mathbf);
typeface("textit", Unicode.typeface.mathit);
typeface("textsf", Unicode.typeface.mathsf);
typeface("texttt", Unicode.typeface.mathtt);
typeface("textscr", Unicode.typeface.mathscr);
typeface("textcal", Unicode.typeface.mathcal);
typeface("sf", Unicode.typeface.mathsf);
typeface("bf", Unicode.typeface.mathbf);
typeface("bold", Unicode.typeface.mathbf);
typeface("boldsymbol", Unicode.typeface.mathbf);
typeface("bm", Unicode.typeface.mathbf);
typeface("tt", Unicode.typeface.mathtt);
typeface("it", Unicode.typeface.mathit);
typeface("frak", Unicode.typeface.mathfrak);
typeface("cal", Unicode.typeface.mathcal);
typeface("Bbb", Unicode.typeface.mathbb);
var recover = merge_smap(make_smap(mathsf_greek_placeholder, Unicode["greekArray"]), make_smap(mathitsf_greek_placeholder, mathit_greek), make_smap(mathsf_misc_placeholder, misc), make_smap(mathitsf_misc_placeholder, mathit_misc));
Unicode.typefaceNames = Object.keys(Unicode.typeface);
Object.assign(Unicode.supscripts, {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  a: "ᵃ",
  b: "ᵇ",
  c: "ᶜ",
  d: "ᵈ",
  e: "ᵉ",
  f: "ᶠ",
  g: "ᵍ",
  h: "ʰ",
  i: "ⁱ",
  j: "ʲ",
  k: "ᵏ",
  l: "ˡ",
  m: "ᵐ",
  n: "ⁿ",
  o: "ᵒ",
  p: "ᵖ",
  q: "\uD801\uDFA5",
  r: "ʳ",
  s: "ˢ",
  t: "ᵗ",
  u: "ᵘ",
  v: "ᵛ",
  w: "ʷ",
  x: "ˣ",
  y: "ʸ",
  z: "ᶻ",
  "+": "⁺",
  "-": "⁻",
  "=": "⁼",
  "(": "⁽",
  ")": "⁾",
  "ɦ": "ʱ",
  "ɹ": "ʴ",
  "ɻ": "ʵ",
  "ʁ": "ʶ",
  A: "ᴬ",
  "Æ": "ᴭ",
  B: "ᴮ",
  "ᴃ": "ᴯ",
  C: "ꟲ",
  D: "ᴰ",
  E: "ᴱ",
  "Ǝ": "ᴲ",
  F: "ꟳ",
  G: "ᴳ",
  H: "ᴴ",
  I: "ᴵ",
  J: "ᴶ",
  K: "ᴷ",
  L: "ᴸ",
  M: "ᴹ",
  N: "ᴺ",
  "ᴎ": "ᴻ",
  O: "ᴼ",
  "Ȣ": "ᴽ",
  P: "ᴾ",
  Q: "ꟴ",
  R: "ᴿ",
  S: "꟱",
  T: "ᵀ",
  U: "ᵁ",
  V: "ⱽ",
  W: "ᵂ",
  "ɐ": "ᵄ",
  "ɑ": "ᵅ",
  "α": "ᵅ",
  "ᴂ": "ᵆ",
  "ə": "ᵊ",
  "ɛ": "ᵋ",
  "ᴉ": "ᵎ",
  "ŋ": "ᵑ",
  "ɔ": "ᵓ",
  "ᴖ": "ᵔ",
  "ᴗ": "ᵕ",
  "ᴝ": "ᵙ",
  "ɯ": "ᵚ",
  "ᴥ": "ᵜ",
  "β": "ᵝ",
  "γ": "ᵞ",
  "δ": "ᵟ",
  "φ": "ᵠ",
  "χ": "ᵡ",
  "н": "ᵸ",
  "ɒ": "ᶛ",
  "ɕ": "ᶝ",
  "ð": "ᶞ",
  "ɜ": "ᶟ",
  "ɟ": "ᶡ",
  "ɡ": "ᶢ",
  "ɥ": "ᶣ",
  "ɨ": "ᶤ",
  "ɩ": "ᶥ",
  "ɪ": "ᶦ",
  "ᵻ": "ᶧ",
  "ʝ": "ᶨ",
  "ɭ": "ᶩ",
  "ᶅ": "ᶪ",
  "ʟ": "ᶫ",
  "ɱ": "ᶬ",
  "ɰ": "ᶭ",
  "ɲ": "ᶮ",
  "ɳ": "ᶯ",
  "ɴ": "ᶰ",
  "ɵ": "ᶱ",
  "ɸ": "ᶲ",
  "ʂ": "ᶳ",
  "ʃ": "ᶴ",
  "ƫ": "ᶵ",
  "ʉ": "ᶶ",
  "ʊ": "ᶷ",
  "ᴜ": "ᶸ",
  "υ": "ᶸ",
  "ʋ": "ᶹ",
  "ʌ": "ᶺ",
  "ʐ": "ᶼ",
  "ʑ": "ᶽ",
  "ʒ": "ᶾ",
  "θ": "ᶿ",
  "Ħ": "ꟸ",
  "œ": "ꟹ"
});
Object.assign(Unicode.subscripts, {
  "0": "₀",
  "1": "₁",
  "2": "₂",
  "3": "₃",
  "4": "₄",
  "5": "₅",
  "6": "₆",
  "7": "₇",
  "8": "₈",
  "9": "₉",
  a: "ₐ",
  c: "\uD838\uDC5E",
  e: "ₑ",
  h: "ₕ",
  i: "ᵢ",
  j: "ⱼ",
  k: "ₖ",
  l: "ₗ",
  m: "ₘ",
  n: "ₙ",
  o: "ₒ",
  p: "ₚ",
  r: "ᵣ",
  s: "ₛ",
  t: "ₜ",
  u: "ᵤ",
  v: "ᵥ",
  x: "ₓ",
  "+": "₊",
  "-": "₋",
  "=": "₌",
  "(": "₍",
  ")": "₎",
  "β": "ᵦ",
  "γ": "ᵧ",
  "ρ": "ᵨ",
  "φ": "ᵩ",
  "χ": "ᵪ",
  "ə": "ₔ"
});
var unicode_table_default = Unicode;

// src/impl/unicode/fixed.ts
var stableFixed = {
  N: unicode_table_default.typeface.mathbb.N,
  Z: unicode_table_default.typeface.mathbb.Z,
  Q: unicode_table_default.typeface.mathbb.Q,
  R: unicode_table_default.typeface.mathbb.R,
  C: unicode_table_default.typeface.mathbb.C,
  CC: unicode_table_default.typeface.mathbb.C,
  A: unicode_table_default.typeface.mathbb.A,
  F: unicode_table_default.typeface.mathbb.F,
  SS: unicode_table_default.typeface.mathbb.S,
  natnums: unicode_table_default.typeface.mathbb.N,
  reals: unicode_table_default.typeface.mathbb.R,
  Reals: unicode_table_default.typeface.mathbb.R,
  cnums: unicode_table_default.typeface.mathbb.C,
  Complex: unicode_table_default.typeface.mathbb.C,
  Bbbk: unicode_table_default.typeface.mathbb.k,
  Re: unicode_table_default.typeface.mathfrak.R,
  Im: unicode_table_default.typeface.mathfrak.I,
  TeX: "TᴇX",
  LaTeX: "LᴬTᴇX",
  hat: "̂",
  tilde: "̃",
  bar: "̄",
  overline: "̅",
  breve: "̆",
  widetilde: "͠",
  uwidebreve: "͜",
  widebreve: "͝",
  widepreve: "͡",
  uvec: "͢",
  degree: "°",
  varGamma: "Γ",
  varDelta: "Δ",
  varTheta: "Θ",
  varLambda: "Λ",
  varXi: "Ξ",
  varPi: "ϖ",
  varSigma: "Σ",
  varUpsilon: "Υ",
  varPhi: "Φ",
  varPsi: "Ψ",
  varOmega: "Ω",
  varepsilon: "ε",
  varkappa: "ϰ",
  vartheta: "ϑ",
  thetasym: "ϑ",
  varpi: "ϖ",
  varrho: "ϱ",
  varsigma: "ς",
  varphi: "φ",
  digamma: "ϝ",
  argmax: "arg max",
  argmin: "arg min",
  injlim: "inj lim",
  liminf: "lim inf",
  limsup: "lim sup",
  projlim: "proj lim",
  cdot: "⋅",
  cdotp: "·",
  dots: "…",
  cdots: "⋯",
  ldots: "…",
  ddots: "⋱",
  vdots: "⋮",
  prime: "′",
  Box: "□",
  "|": "‖",
  lang: "⟨",
  langle: "⟨",
  rang: "⟩",
  rangle: "⟩",
  vert: "∣",
  Vert: "‖",
  lVert: "‖",
  rVert: "‖",
  Vvert: "⦀",
  lVvert: "⦀",
  rVvert: "⦀",
  lceil: "⌈",
  rceil: "⌉",
  lfloor: "⌊",
  rfloor: "⌋",
  lmoustache: "⎰",
  rmoustache: "⎱",
  lgroup: "⟮",
  rgroup: "⟯",
  ulcorner: "┌",
  urcorner: "┐",
  llcorner: "└",
  lrcorner: "┘",
  llbracket: "⟦",
  rlbracket: "⟧",
  lBrace: "⦃",
  rBrace: "⦄",
  lbrbrak: "❲",
  rbrbrak: "❳",
  lbag: "⟅",
  rbag: "⟆",
  lBrack: "⟦",
  rBrack: "⟧",
  lAngle: "⟪",
  rAngle: "⟫",
  Lbrbrak: "⟬",
  Rbrbrak: "⟭",
  lParen: "⦅",
  rParen: "⦆",
  llparenthesis: "⦇",
  rrparenthesis: "⦈",
  llangle: "⦉",
  rrangle: "⦊",
  lbrackubar: "⦋",
  rbrackubar: "⦌",
  lbrackultick: "⦍",
  rbrackultick: "⦎",
  lbracklltick: "⦏",
  rbracklltick: "⦐",
  langledot: "⦑",
  rangledot: "⦒",
  lparenless: "⦓",
  rparenptr: "⦔",
  Lparengtr: "⦕",
  Rparenless: "⦖",
  lblkbrbrak: "⦗",
  rblkbrbrak: "⦘",
  lvzigzag: "⧘",
  rvzigzag: "⧙",
  Lvzigzag: "⧚",
  Rvzigzag: "⧛",
  lcurvyangle: "⧼",
  rcurvyangle: "⧽",
  longdivision: "⟌",
  bigotimes: "⨂",
  bigvee: "⋁",
  bigoplus: "⨁",
  bigwedge: "⋀",
  bigodot: "⨀",
  bigcap: "⋂",
  biguplus: "⨄",
  bigcup: "⋃",
  bigsqcup: "⨆",
  wedge: "∧",
  curlywedge: "⋏",
  barwedge: "⊼",
  doublebarwedge: "⩞",
  vee: "∨",
  curlyvee: "⋎",
  veebar: "⊻",
  sqcap: "⊓",
  sqcup: "⊔",
  boxdot: "⊡",
  boxplus: "⊞",
  boxminus: "⊟",
  boxtimes: "⊠",
  oplus: "⊕",
  ominus: "⊖",
  otimes: "⊗",
  oslash: "⊘",
  uplus: "⊎",
  divideontimes: "⋇",
  lhd: "⊲",
  unlhd: "⊴",
  rhd: "⊳",
  unrhd: "⊵",
  setminus: "∖",
  smallsetminus: "∖",
  Bbbsum: "⅀",
  leftouterjoin: "⟕",
  rightouterjoin: "⟖",
  fullouterjoin: "⟗",
  bigbot: "⟘",
  bigtop: "⟙",
  xsol: "⧸",
  xbsol: "⧹",
  bigcupdot: "⨃",
  bigsqcap: "⨅",
  conjquant: "⨇",
  disjquant: "⨈",
  bigtimes: "⨉",
  modtwosum: "⨊",
  sumint: "⨋",
  intbar: "⨍",
  intBar: "⨎",
  fint: "⨏",
  cirfnint: "⨐",
  awint: "⨑",
  rppolint: "⨒",
  scpolint: "⨓",
  npolint: "⨔",
  pointint: "⨕",
  sqint: "⨖",
  intlarhk: "⨗",
  intx: "⨘",
  intcap: "⨙",
  intcup: "⨚",
  upint: "⨛",
  lowint: "⨜",
  bigtriangleleft: "⨞",
  zcmp: "⨟",
  zpipe: "⨠",
  zproject: "⨡",
  biginterleave: "⫼",
  bigtalloblong: "⫿",
  arabicmaj: "\uD83B\uDEF0",
  arabichad: "\uD83B\uDEF1",
  forall: "∀",
  complement: "∁",
  partial: "∂",
  exist: "∃",
  exists: "∃",
  noexist: "∄",
  empty: "∅",
  emptyset: "∅",
  varnothing: "∅",
  nabla: "∇",
  ni: "∋",
  blacksquare: "∎",
  prod: "∏",
  _: "_",
  infty: "∞",
  textunderscore: "_",
  dotsb: "⋯",
  infin: "∞",
  dotsc: "…",
  checkmark: "✓",
  textendash: "–",
  dotsi: "⋯",
  dag: "†",
  dotsm: "⋯",
  dagger: "†",
  textemdash: "—",
  dotso: "…",
  textdagger: "†",
  textasciitilde: "~",
  sdot: "⋅",
  ddag: "‡",
  textasciicircum: "^",
  mathellipsis: "…",
  ddagger: "‡",
  "`": "‘",
  textellipsis: "…",
  textdaggerdbl: "‡",
  textquoteleft: "‘",
  Dagger: "‡",
  lq: "‘",
  square: "□",
  angle: "∠",
  textquoteright: "’",
  measuredangle: "∡",
  rq: "′",
  triangle: "△",
  sphericalangle: "∢",
  textquotedblleft: "“",
  triangledown: "▿",
  top: "⊤",
  '"': '"',
  triangleleft: "◁",
  bot: "⊥",
  textquotedblright: "”",
  triangleright: "▷",
  $: "$",
  colon: ":",
  bigtriangledown: "▽",
  textdollar: "$",
  backprime: "‵",
  bigtriangleup: "△",
  pounds: "£",
  blacktriangle: "▴",
  mathsterling: "£",
  textless: "<",
  blacktriangledown: "▾",
  textsterling: "£",
  textgreater: ">",
  blacktriangleleft: "◀",
  yen: "¥",
  textbar: "|",
  blacktriangleright: "▶",
  surd: "√",
  textbardbl: "∥",
  diamond: "⋄",
  textbraceleft: "{",
  Diamond: "◊",
  textdegree: "°",
  textbraceright: "}",
  lozenge: "◊",
  mho: "℧",
  textbackslash: "\\",
  blacklozenge: "⧫",
  diagdown: "⟍",
  P: "¶",
  star: "⋆",
  diagup: "⟋",
  S: "§",
  bigstar: "★",
  flat: "♭",
  sect: "§",
  clubsuit: "♣",
  natural: "♮",
  copyright: "©",
  clubs: "♣",
  sharp: "♯",
  circledR: "®",
  diamondsuit: "♢",
  heartsuit: "♡",
  textregistered: "®",
  diamonds: "♢",
  hearts: "♡",
  circledS: "Ⓢ",
  spadesuit: "♠",
  spades: "♠",
  maltese: "✠",
  minuso: "∘−",
  coprod: "∐",
  sum: "∑",
  plus: "+",
  minus: "−",
  mp: "∓",
  dotplus: "∔",
  backslash: "\\",
  ast: "∗",
  circ: "∘",
  bullet: "∙",
  mid: "∣",
  nmid: "∤",
  parallel: "∥",
  nparallel: "∦",
  land: "∧",
  lor: "∨",
  cap: "∩",
  cup: "∪",
  int: "∫",
  iint: "∬",
  iiint: "∭",
  iiiint: "⨌",
  oint: "∮",
  oiint: "∯",
  oiiint: "∰",
  intclockwise: "∱",
  lcirclerightint: "∲",
  varointclockwise: "∲",
  rcirclerightint: "∳",
  ointctrclockwise: "∳",
  nsimeq: "≄",
  congneq: "≆",
  eq: "=",
  ne: "≠",
  neq: "≠",
  triangleq: "≜",
  smblkcircle: "•",
  tieconcat: "⁀",
  fracslash: "⁄",
  upand: "⅋",
  divslash: "∕",
  vysmwhtcircle: "∘",
  vysmblkcircle: "∙",
  dotminus: "∸",
  invlazys: "∾",
  wr: "≀",
  cupleftarrow: "⊌",
  cupdot: "⊍",
  odot: "⊙",
  circledcirc: "⊚",
  circledast: "⊛",
  circledequal: "⊜",
  circleddash: "⊝",
  intercal: "⊺",
  barvee: "⊽",
  smwhtdiamond: "⋄",
  leftthreetimes: "⋋",
  rightthreetimes: "⋌",
  Cap: "⋒",
  Cup: "⋓",
  varbarwedge: "⌅",
  vardoublebarwedge: "⌆",
  obar: "⌽",
  mdlgwhtcircle: "○",
  boxbar: "◫",
  veedot: "⟇",
  wedgedot: "⟑",
  lozengeminus: "⟠",
  concavediamond: "⟡",
  concavediamondtickleft: "⟢",
  concavediamondtickright: "⟣",
  whitesquaretickleft: "⟤",
  whitesquaretickright: "⟥",
  circlehbar: "⦵",
  circledvert: "⦶",
  circledparallel: "⦷",
  obslash: "⦸",
  operp: "⦹",
  olessthan: "⧀",
  ogreaterthan: "⧁",
  boxdiag: "⧄",
  boxbslash: "⧅",
  boxast: "⧆",
  boxcircle: "⧇",
  boxbox: "⧈",
  triangleserifs: "⧍",
  hourglass: "⧖",
  blackhourglass: "⧗",
  shuffle: "⧢",
  mdlgblklozenge: "⧫",
  reversesolidus: "⧵",
  dsol: "⧶",
  rsolbar: "⧷",
  doubleplus: "⧺",
  tripleplus: "⧻",
  tplus: "⧾",
  tminus: "⧿",
  ringplus: "⨢",
  plushat: "⨣",
  simplus: "⨤",
  plusdot: "⨥",
  plussim: "⨦",
  plussubtwo: "⨧",
  plustrif: "⨨",
  commaminus: "⨩",
  minusdot: "⨪",
  minusfdots: "⨫",
  minusrdots: "⨬",
  opluslhrim: "⨭",
  oplusrhrim: "⨮",
  vectimes: "⨯",
  dottimes: "⨰",
  timesbar: "⨱",
  btimes: "⨲",
  smashtimes: "⨳",
  otimeslhrim: "⨴",
  otimesrhrim: "⨵",
  otimeshat: "⨶",
  Otimes: "⨷",
  odiv: "⨸",
  triangleplus: "⨹",
  triangleminus: "⨺",
  triangletimes: "⨻",
  intprod: "⨼",
  intprodr: "⨽",
  fcmp: "⨾",
  amalg: "⨿",
  capdot: "⩀",
  uminus: "⩁",
  barcup: "⩂",
  barcap: "⩃",
  capwedge: "⩄",
  cupvee: "⩅",
  cupovercap: "⩆",
  capovercup: "⩇",
  cupbarcap: "⩈",
  capbarcup: "⩉",
  twocups: "⩊",
  twocaps: "⩋",
  closedvarcup: "⩌",
  closedvarcap: "⩍",
  Sqcap: "⩎",
  Sqcup: "⩏",
  closedvarcupsmashprod: "⩐",
  wedgeodot: "⩑",
  veeodot: "⩒",
  Wedge: "⩓",
  Vee: "⩔",
  wedgeonwedge: "⩕",
  veeonvee: "⩖",
  bigslopedvee: "⩗",
  bigslopedwedge: "⩘",
  wedgemidvert: "⩚",
  veemidvert: "⩛",
  midbarwedge: "⩜",
  midbarvee: "⩝",
  wedgebar: "⩟",
  wedgedoublebar: "⩠",
  varveebar: "⩡",
  doublebarvee: "⩢",
  veedoublebar: "⩣",
  dsub: "⩤",
  rsub: "⩥",
  eqqplus: "⩱",
  pluseqq: "⩲",
  interleave: "⫴",
  nhVvert: "⫵",
  threedotcolon: "⫶",
  trslash: "⫻",
  sslash: "⫽",
  talloblong: "⫾",
  mathyen: "¥",
  mathsection: "§",
  mathparagraph: "¶",
  Zbar: "Ƶ",
  upbackepsilon: "϶",
  horizbar: "―",
  twolowline: "‗",
  enleadertwodots: "‥",
  unicodeellipsis: "…",
  dprime: "″",
  trprime: "‴",
  backdprime: "‶",
  backtrprime: "‷",
  caretinsert: "‸",
  Exclam: "‼",
  hyphenbullet: "⁃",
  Question: "⁇",
  qprime: "⁗",
  euro: "€",
  enclosecircle: "⃝",
  enclosesquare: "⃞",
  enclosediamond: "⃟",
  enclosetriangle: "⃤",
  Eulerconst: "ℇ",
  Planckconst: "ℎ",
  Finv: "Ⅎ",
  Bbbpi: "ℼ",
  sansLturned: "⅂",
  sansLmirrored: "⅃",
  Yup: "⅄",
  mitBbbD: "ⅅ",
  mitBbbd: "ⅆ",
  mitBbbe: "ⅇ",
  mitBbbi: "ⅈ",
  mitBbbj: "ⅉ",
  PropertyLine: "⅊",
  updownarrowbar: "↨",
  linefeed: "↴",
  carriagereturn: "↵",
  barovernorthwestarrow: "↸",
  barleftarrowrightarrowbar: "↹",
  acwopencirclearrow: "↺",
  cwopencirclearrow: "↻",
  nHuparrow: "⇞",
  nHdownarrow: "⇟",
  leftdasharrow: "⇠",
  updasharrow: "⇡",
  rightdasharrow: "⇢",
  downdasharrow: "⇣",
  leftwhitearrow: "⇦",
  upwhitearrow: "⇧",
  rightwhitearrow: "⇨",
  downwhitearrow: "⇩",
  whitearrowupfrombar: "⇪",
  nexists: "∄",
  increment: "∆",
  QED: "∎",
  rightangle: "∟",
  therefore: "∴",
  sinewave: "∿",
  hermitmatrix: "⊹",
  measuredrightangle: "⊾",
  varlrtriangle: "⊿",
  unicodecdots: "⋯",
  diameter: "⌀",
  house: "⌂",
  invnot: "⌐",
  sqlozenge: "⌑",
  profline: "⌒",
  profsurf: "⌓",
  viewdata: "⌗",
  turnednot: "⌙",
  inttop: "⌠",
  intbottom: "⌡",
  varhexagonlrbonds: "⌬",
  conictaper: "⌲",
  topbot: "⌶",
  APLnotbackslash: "⍀",
  APLboxupcaret: "⍓",
  APLboxquestion: "⍰",
  rangledownzigzagarrow: "⍼",
  hexagon: "⎔",
  lparenuend: "⎛",
  lparenextender: "⎜",
  lparenlend: "⎝",
  rparenuend: "⎞",
  rparenextender: "⎟",
  rparenlend: "⎠",
  lbrackuend: "⎡",
  lbrackextender: "⎢",
  lbracklend: "⎣",
  rbrackuend: "⎤",
  rbrackextender: "⎥",
  rbracklend: "⎦",
  lbraceuend: "⎧",
  lbracemid: "⎨",
  lbracelend: "⎩",
  vbraceextender: "⎪",
  rbraceuend: "⎫",
  rbracemid: "⎬",
  rbracelend: "⎭",
  intextender: "⎮",
  harrowextender: "⎯",
  sumtop: "⎲",
  sumbottom: "⎳",
  bbrktbrk: "⎶",
  sqrtbottom: "⎷",
  lvboxline: "⎸",
  rvboxline: "⎹",
  varcarriagereturn: "⏎",
  obrbrak: "⏠",
  ubrbrak: "⏡",
  trapezium: "⏢",
  benzenr: "⏣",
  strns: "⏤",
  fltns: "⏥",
  accurrent: "⏦",
  elinters: "⏧",
  blanksymbol: "␢",
  mathvisiblespace: "␣",
  bdtriplevdash: "┆",
  blockuphalf: "▀",
  blocklowhalf: "▄",
  blockfull: "█",
  blocklefthalf: "▌",
  blockrighthalf: "▐",
  blockqtrshaded: "░",
  blockhalfshaded: "▒",
  blockthreeqtrshaded: "▓",
  mdlgblksquare: "■",
  mdlgwhtsquare: "□",
  squoval: "▢",
  blackinwhitesquare: "▣",
  squarehfill: "▤",
  squarevfill: "▥",
  squarehvfill: "▦",
  squarenwsefill: "▧",
  squareneswfill: "▨",
  squarecrossfill: "▩",
  smblksquare: "▪",
  smwhtsquare: "▫",
  hrectangleblack: "▬",
  hrectangle: "▭",
  vrectangleblack: "▮",
  vrectangle: "▯",
  parallelogramblack: "▰",
  parallelogram: "▱",
  bigblacktriangleup: "▲",
  smallblacktriangleright: "▸",
  smalltriangleright: "▹",
  blackpointerright: "►",
  whitepointerright: "▻",
  bigblacktriangledown: "▼",
  smallblacktriangleleft: "◂",
  smalltriangleleft: "◃",
  blackpointerleft: "◄",
  whitepointerleft: "◅",
  mdlgblkdiamond: "◆",
  mdlgwhtdiamond: "◇",
  blackinwhitediamond: "◈",
  fisheye: "◉",
  mdlgwhtlozenge: "◊",
  dottedcircle: "◌",
  circlevertfill: "◍",
  bullseye: "◎",
  mdlgblkcircle: "●",
  circlelefthalfblack: "◐",
  circlerighthalfblack: "◑",
  circlebottomhalfblack: "◒",
  circletophalfblack: "◓",
  circleurquadblack: "◔",
  blackcircleulquadwhite: "◕",
  blacklefthalfcircle: "◖",
  blackrighthalfcircle: "◗",
  inversebullet: "◘",
  inversewhitecircle: "◙",
  invwhiteupperhalfcircle: "◚",
  invwhitelowerhalfcircle: "◛",
  ularc: "◜",
  urarc: "◝",
  lrarc: "◞",
  llarc: "◟",
  topsemicircle: "◠",
  botsemicircle: "◡",
  lrblacktriangle: "◢",
  llblacktriangle: "◣",
  ulblacktriangle: "◤",
  urblacktriangle: "◥",
  smwhtcircle: "◦",
  squareleftblack: "◧",
  squarerightblack: "◨",
  squareulblack: "◩",
  squarelrblack: "◪",
  trianglecdot: "◬",
  triangleleftblack: "◭",
  trianglerightblack: "◮",
  lgwhtcircle: "◯",
  squareulquad: "◰",
  squarellquad: "◱",
  squarelrquad: "◲",
  squareurquad: "◳",
  circleulquad: "◴",
  circlellquad: "◵",
  circlelrquad: "◶",
  circleurquad: "◷",
  ultriangle: "◸",
  urtriangle: "◹",
  lltriangle: "◺",
  mdwhtsquare: "◻",
  mdblksquare: "◼",
  mdsmwhtsquare: "◽",
  mdsmblksquare: "◾",
  lrtriangle: "◿",
  bigwhitestar: "☆",
  astrosun: "☉",
  danger: "☡",
  blacksmiley: "☻",
  sun: "☼",
  rightmoon: "☽",
  leftmoon: "☾",
  female: "♀",
  male: "♂",
  varspadesuit: "♤",
  varheartsuit: "♥",
  vardiamondsuit: "♦",
  varclubsuit: "♧",
  quarternote: "♩",
  eighthnote: "♪",
  twonotes: "♫",
  acidfree: "♾",
  dicei: "⚀",
  diceii: "⚁",
  diceiii: "⚂",
  diceiv: "⚃",
  dicev: "⚄",
  dicevi: "⚅",
  circledrightdot: "⚆",
  circledtwodots: "⚇",
  blackcircledrightdot: "⚈",
  blackcircledtwodots: "⚉",
  Hermaphrodite: "⚥",
  mdwhtcircle: "⚪",
  mdblkcircle: "⚫",
  mdsmwhtcircle: "⚬",
  neuter: "⚲",
  circledstar: "✪",
  varstar: "✶",
  dingasterisk: "✽",
  draftingarrow: "➛",
  threedangle: "⟀",
  whiteinwhitetriangle: "⟁",
  subsetcirc: "⟃",
  supsetcirc: "⟄",
  diamondcdot: "⟐",
  rdiagovfdiag: "⤫",
  fdiagovrdiag: "⤬",
  seovnearrow: "⤭",
  neovsearrow: "⤮",
  fdiagovnearrow: "⤯",
  rdiagovsearrow: "⤰",
  neovnwarrow: "⤱",
  nwovnearrow: "⤲",
  uprightcurvearrow: "⤴",
  downrightcurvedarrow: "⤵",
  mdsmblkcircle: "⦁",
  fourvdots: "⦙",
  vzigzag: "⦚",
  measuredangleleft: "⦛",
  rightanglesqr: "⦜",
  rightanglemdot: "⦝",
  angles: "⦞",
  angdnr: "⦟",
  gtlpar: "⦠",
  sphericalangleup: "⦡",
  turnangle: "⦢",
  revangle: "⦣",
  angleubar: "⦤",
  revangleubar: "⦥",
  wideangledown: "⦦",
  wideangleup: "⦧",
  measanglerutone: "⦨",
  measanglelutonw: "⦩",
  measanglerdtose: "⦪",
  measangleldtosw: "⦫",
  measangleurtone: "⦬",
  measangleultonw: "⦭",
  measangledrtose: "⦮",
  measangledltosw: "⦯",
  revemptyset: "⦰",
  emptysetobar: "⦱",
  emptysetocirc: "⦲",
  emptysetoarr: "⦳",
  emptysetoarrl: "⦴",
  obot: "⦺",
  olcross: "⦻",
  odotslashdot: "⦼",
  uparrowoncircle: "⦽",
  circledwhitebullet: "⦾",
  circledbullet: "⦿",
  cirscir: "⧂",
  cirE: "⧃",
  boxonbox: "⧉",
  triangleodot: "⧊",
  triangleubar: "⧋",
  triangles: "⧌",
  iinfin: "⧜",
  tieinfty: "⧝",
  nvinfty: "⧞",
  laplac: "⧠",
  thermod: "⧧",
  downtriangleleftblack: "⧨",
  downtrianglerightblack: "⧩",
  blackdiamonddownarrow: "⧪",
  circledownarrow: "⧬",
  blackcircledownarrow: "⧭",
  errbarsquare: "⧮",
  errbarblacksquare: "⧯",
  errbardiamond: "⧰",
  errbarblackdiamond: "⧱",
  errbarcircle: "⧲",
  errbarblackcircle: "⧳",
  perps: "⫡",
  topcir: "⫱",
  squaretopblack: "⬒",
  squarebotblack: "⬓",
  squareurblack: "⬔",
  squarellblack: "⬕",
  diamondleftblack: "⬖",
  diamondrightblack: "⬗",
  diamondtopblack: "⬘",
  diamondbotblack: "⬙",
  dottedsquare: "⬚",
  lgblksquare: "⬛",
  lgwhtsquare: "⬜",
  vysmblksquare: "⬝",
  vysmwhtsquare: "⬞",
  pentagonblack: "⬟",
  pentagon: "⬠",
  varhexagon: "⬡",
  varhexagonblack: "⬢",
  hexagonblack: "⬣",
  lgblkcircle: "⬤",
  mdblkdiamond: "⬥",
  mdwhtdiamond: "⬦",
  mdblklozenge: "⬧",
  mdwhtlozenge: "⬨",
  smblkdiamond: "⬩",
  smblklozenge: "⬪",
  smwhtlozenge: "⬫",
  blkhorzoval: "⬬",
  whthorzoval: "⬭",
  blkvertoval: "⬮",
  whtvertoval: "⬯",
  medwhitestar: "⭐",
  medblackstar: "⭑",
  smwhitestar: "⭒",
  rightpentagonblack: "⭓",
  rightpentagon: "⭔",
  postalmark: "〒",
  hzigzag: "〰",
  doteqdot: "≑",
  lessapprox: "⪅",
  smile: "⌣",
  eqcirc: "≖",
  lesseqgtr: "⋚",
  sqsubset: "⊏",
  eqcolon: "∹",
  minuscolon: "∹",
  lesseqqgtr: "⪋",
  sqsubseteq: "⊑",
  Eqcolon: "−∷",
  minuscoloncolon: "-∷",
  lessgtr: "≶",
  sqsupset: "⊐",
  approx: "≈",
  eqqcolon: "≕",
  equalscolon: "≕",
  lesssim: "≲",
  sqsupseteq: "⊒",
  approxcolon: "≈:",
  Eqqcolon: "=∷",
  equalscoloncolon: "=∷",
  ll: "≪",
  Subset: "⋐",
  approxcoloncolon: "≈∷",
  eqsim: "≂",
  lll: "⋘",
  subset: "⊂",
  sub: "⊂",
  approxeq: "≊",
  eqslantgtr: "⪖",
  llless: "⋘",
  subseteq: "⊆",
  sube: "⊆",
  asymp: "≍",
  eqslantless: "⪕",
  lt: "<",
  subseteqq: "⫅",
  backepsilon: "∍",
  equiv: "≡",
  succ: "≻",
  backsim: "∽",
  fallingdotseq: "≒",
  models: "⊧",
  succapprox: "⪸",
  backsimeq: "⋍",
  frown: "⌢",
  multimap: "⊸",
  succcurlyeq: "≽",
  between: "≬",
  ge: "≥",
  origof: "⊶",
  succeq: "⪰",
  bowtie: "⋈",
  geq: "≥",
  owns: "∋",
  succsim: "≿",
  bumpeq: "≏",
  geqq: "≧",
  Supset: "⋑",
  Bumpeq: "≎",
  geqslant: "⩾",
  perp: "⟂",
  supset: "⊃",
  gg: "≫",
  pitchfork: "⋔",
  supseteq: "⊇",
  supe: "⊇",
  colonapprox: ":≈",
  ggg: "⋙",
  prec: "≺",
  supseteqq: "⫆",
  Colonapprox: "∷≈",
  coloncolonapprox: "∷≈",
  gggtr: "⋙",
  precapprox: "⪷",
  thickapprox: "≈",
  coloneq: ":−",
  colonminus: ":-",
  gt: ">",
  preccurlyeq: "≼",
  thicksim: "∼",
  Coloneq: "∷−",
  coloncolonminus: "∷−",
  gtrapprox: "⪆",
  preceq: "⪯",
  trianglelefteq: "⊴",
  coloneqq: "≔",
  colonequals: "≔",
  gtreqless: "⋛",
  precsim: "≾",
  Coloneqq: "⩴",
  coloncolonequals: "⩴",
  gtreqqless: "⪌",
  propto: "∝",
  trianglerighteq: "⊵",
  colonsim: ":∼",
  gtrless: "≷",
  risingdotseq: "≓",
  varpropto: "∝",
  Colonsim: "∷∼",
  coloncolonsim: "∷∼",
  gtrsim: "≳",
  shortmid: "∣",
  vartriangle: "▵",
  cong: "≅",
  imageof: "⊷",
  shortparallel: "∥",
  vartriangleleft: "⊲",
  curlyeqprec: "⋞",
  in: "∈",
  isin: "∈",
  sim: "∼",
  vartriangleright: "⊳",
  curlyeqsucc: "⋟",
  Join: "⨝",
  simcolon: "∼:",
  vcentcolon: ":",
  ratio: ":",
  dashv: "⊣",
  le: "≤",
  simcoloncolon: "∼∷",
  vdash: "⊢",
  dblcolon: "∷",
  coloncolon: "∷",
  leq: "≤",
  simeq: "≃",
  vDash: "⊨",
  doteq: "≐",
  leqq: "≦",
  smallfrown: "⌢",
  Vdash: "⊩",
  Doteq: "≑",
  leqslant: "⩽",
  smallsmile: "⌣",
  Vvdash: "⊪",
  gnapprox: "⪊",
  ngeqslant: "≱",
  nsubseteq: "⊈",
  precneqq: "⪵",
  gneq: "⪈",
  ngtr: "≯",
  nsubseteqq: "⊈",
  precnsim: "⋨",
  gneqq: "≩",
  nleq: "≰",
  nsucc: "⊁",
  subsetneq: "⊊",
  gnsim: "⋧",
  nleqq: "≰",
  nsucceq: "⋡",
  subsetneqq: "⫋",
  gvertneqq: "≩",
  nleqslant: "≰",
  nsupseteq: "⊉",
  succnapprox: "⪺",
  lnapprox: "⪉",
  nless: "≮",
  nsupseteqq: "⊉",
  succneqq: "⪶",
  lneq: "⪇",
  ntriangleleft: "⋪",
  succnsim: "⋩",
  lneqq: "≨",
  notin: "∉",
  neg: "¬",
  lnot: "¬",
  ntrianglelefteq: "⋬",
  supsetneq: "⊋",
  lnsim: "⋦",
  notni: "∌",
  ntriangleright: "⋫",
  supsetneqq: "⫌",
  lvertneqq: "≨",
  ntrianglerighteq: "⋭",
  varsubsetneq: "⊊",
  ncong: "≇",
  nprec: "⊀",
  nvdash: "⊬",
  varsubsetneqq: "⫋",
  npreceq: "⋠",
  nvDash: "⊭",
  varsupsetneq: "⊋",
  nshortmid: "∤",
  nVDash: "⊯",
  varsupsetneqq: "⫌",
  ngeq: "≱",
  nshortparallel: "∦",
  nVdash: "⊮",
  ngeqq: "≱",
  nsim: "≁",
  precnapprox: "⪹",
  circlearrowleft: "↺",
  leftharpoonup: "↼",
  rArr: "⇒",
  circlearrowright: "↻",
  leftleftarrows: "⇇",
  rarr: "→",
  curvearrowleft: "↶",
  leftrightarrow: "↔",
  restriction: "↾",
  curvearrowright: "↷",
  Leftrightarrow: "⇔",
  rightarrow: "→",
  Darr: "⇓",
  leftrightarrows: "⇆",
  Rightarrow: "⇒",
  dArr: "⇓",
  leftrightharpoons: "⇋",
  rightarrowtail: "↣",
  darr: "↓",
  leftrightsquigarrow: "↭",
  rightharpoondown: "⇁",
  dashleftarrow: "⇠",
  Lleftarrow: "⇚",
  rightharpoonup: "⇀",
  dashrightarrow: "⇢",
  longleftarrow: "⟵",
  rightleftarrows: "⇄",
  downarrow: "↓",
  Longleftarrow: "⟸",
  rightleftharpoons: "⇌",
  Downarrow: "⇓",
  longleftrightarrow: "⟷",
  rightrightarrows: "⇉",
  downdownarrows: "⇊",
  Longleftrightarrow: "⟺",
  rightsquigarrow: "⇝",
  downharpoonleft: "⇃",
  longmapsto: "⟼",
  Rrightarrow: "⇛",
  downharpoonright: "⇂",
  longrightarrow: "⟶",
  Rsh: "↱",
  gets: "←",
  Longrightarrow: "⟹",
  searrow: "↘",
  Harr: "⇔",
  looparrowleft: "↫",
  swarrow: "↙",
  hArr: "⇔",
  looparrowright: "↬",
  to: "→",
  harr: "↔",
  Lrarr: "⇔",
  twoheadleftarrow: "↞",
  hookleftarrow: "↩",
  lrArr: "⇔",
  twoheadrightarrow: "↠",
  hookrightarrow: "↪",
  lrarr: "↔",
  Uarr: "⇑",
  iff: "⟺",
  Lsh: "↰",
  uArr: "⇑",
  impliedby: "⟸",
  mapsto: "↦",
  uarr: "↑",
  implies: "⟹",
  nearrow: "↗",
  uparrow: "↑",
  Larr: "⇐",
  nleftarrow: "↚",
  Uparrow: "⇑",
  lArr: "⇐",
  nLeftarrow: "⇍",
  updownarrow: "↕",
  larr: "←",
  nleftrightarrow: "↮",
  Updownarrow: "⇕",
  leadsto: "⇝",
  nLeftrightarrow: "⇎",
  upharpoonleft: "↿",
  leftarrow: "←",
  nrightarrow: "↛",
  upharpoonright: "↾",
  Leftarrow: "⇐",
  nRightarrow: "⇏",
  upuparrows: "⇈",
  leftarrowtail: "↢",
  nwarrow: "↖",
  leftharpoondown: "↽",
  Rarr: "⇒",
  pm: "±",
  plusmn: "±",
  times: "×",
  ltimes: "⋉",
  rtimes: "⋊",
  div: "÷",
  aleph: "ℵ",
  alef: "ℵ",
  alefsym: "ℵ",
  beth: "ℶ",
  gimel: "ℷ",
  daleth: "ℸ",
  eth: "ð",
  matheth: "ð",
  ell: "ℓ",
  wp: "℘",
  weierp: "℘",
  turnediota: "℩",
  Angstrom: "Å",
  imath: "ı",
  jmath: "ȷ",
  textpilcrow: "¶",
  textborn: "*",
  textdied: "†",
  textlbrackdbl: "⟦",
  textrbrackdbl: "⟧",
  textguarani: "₲",
  mathhyphen: "‐",
  closure: "⁐",
  leftwavearrow: "↜",
  rightwavearrow: "↝",
  twoheaduparrow: "↟",
  twoheaddownarrow: "↡",
  mapsfrom: "↤",
  mapsup: "↥",
  mapsdown: "↧",
  downzigzagarrow: "↯",
  Ldsh: "↲",
  Rdsh: "↳",
  updownarrows: "⇅",
  Nwarrow: "⇖",
  Nearrow: "⇗",
  Searrow: "⇘",
  Swarrow: "⇙",
  leftsquigarrow: "⇜",
  barleftarrow: "⇤",
  rightarrowbar: "⇥",
  circleonrightarrow: "⇴",
  downuparrows: "⇵",
  rightthreearrows: "⇶",
  nvleftarrow: "⇷",
  nvrightarrow: "⇸",
  nvleftrightarrow: "⇹",
  nVleftarrow: "⇺",
  nVrightarrow: "⇻",
  nVleftrightarrow: "⇼",
  leftarrowtriangle: "⇽",
  rightarrowtriangle: "⇾",
  leftrightarrowtriangle: "⇿",
  smallin: "∊",
  nni: "∌",
  smallni: "∍",
  mathratio: "∶",
  Colon: "∷",
  dashcolon: "∹",
  dotsminusdots: "∺",
  kernelcontraction: "∻",
  nsime: "≄",
  sime: "≃",
  simneqq: "≆",
  napprox: "≉",
  approxident: "≋",
  backcong: "≌",
  circeq: "≗",
  arceq: "≘",
  wedgeq: "≙",
  veeeq: "≚",
  stareq: "≛",
  eqdef: "≝",
  measeq: "≞",
  questeq: "≟",
  nequiv: "≢",
  Equiv: "≣",
  nasymp: "≭",
  nlesssim: "≴",
  ngtrsim: "≵",
  nlessgtr: "≸",
  ngtrless: "≹",
  nsubset: "⊄",
  nsupset: "⊅",
  assert: "⊦",
  VDash: "⊫",
  prurel: "⊰",
  scurel: "⊱",
  equalparallel: "⋕",
  lessdot: "⋖",
  gtrdot: "⋗",
  eqless: "⋜",
  eqgtr: "⋝",
  npreccurlyeq: "⋠",
  nsucccurlyeq: "⋡",
  nsqsubseteq: "⋢",
  nsqsupseteq: "⋣",
  sqsubsetneq: "⋤",
  sqsupsetneq: "⋥",
  nvartriangleleft: "⋪",
  nvartriangleright: "⋫",
  adots: "⋰",
  disin: "⋲",
  varisins: "⋳",
  isins: "⋴",
  isindot: "⋵",
  varisinobar: "⋶",
  isinobar: "⋷",
  isinvb: "⋸",
  isinE: "⋹",
  nisd: "⋺",
  varnis: "⋻",
  nis: "⋼",
  varniobar: "⋽",
  niobar: "⋾",
  bagmember: "⋿",
  APLnotslash: "⌿",
  bsolhsub: "⟈",
  suphsol: "⟉",
  upin: "⟒",
  pullback: "⟓",
  pushout: "⟔",
  DashVDash: "⟚",
  dashVdash: "⟛",
  multimapinv: "⟜",
  vlongdash: "⟝",
  longdashv: "⟞",
  cirbot: "⟟",
  UUparrow: "⟰",
  DDownarrow: "⟱",
  acwgapcirclearrow: "⟲",
  cwgapcirclearrow: "⟳",
  rightarrowonoplus: "⟴",
  longmapsfrom: "⟻",
  Longmapsfrom: "⟽",
  Longmapsto: "⟾",
  longrightsquigarrow: "⟿",
  nvtwoheadrightarrow: "⤀",
  nVtwoheadrightarrow: "⤁",
  nvLeftarrow: "⤂",
  nvRightarrow: "⤃",
  nvLeftrightarrow: "⤄",
  twoheadmapsto: "⤅",
  Mapsfrom: "⤆",
  Mapsto: "⤇",
  downarrowbarred: "⤈",
  uparrowbarred: "⤉",
  Uuparrow: "⤊",
  Ddownarrow: "⤋",
  leftbkarrow: "⤌",
  rightbkarrow: "⤍",
  leftdbkarrow: "⤎",
  dbkarrow: "⤏",
  drbkarrow: "⤐",
  rightdotarrow: "⤑",
  baruparrow: "⤒",
  downarrowbar: "⤓",
  nvrightarrowtail: "⤔",
  nVrightarrowtail: "⤕",
  twoheadrightarrowtail: "⤖",
  nvtwoheadrightarrowtail: "⤗",
  nVtwoheadrightarrowtail: "⤘",
  lefttail: "⤙",
  righttail: "⤚",
  leftdbltail: "⤛",
  rightdbltail: "⤜",
  diamondleftarrow: "⤝",
  rightarrowdiamond: "⤞",
  diamondleftarrowbar: "⤟",
  barrightarrowdiamond: "⤠",
  nwsearrow: "⤡",
  neswarrow: "⤢",
  hknwarrow: "⤣",
  hknearrow: "⤤",
  hksearrow: "⤥",
  hkswarrow: "⤦",
  tona: "⤧",
  toea: "⤨",
  tosa: "⤩",
  towa: "⤪",
  rightcurvedarrow: "⤳",
  leftdowncurvedarrow: "⤶",
  rightdowncurvedarrow: "⤷",
  cwrightarcarrow: "⤸",
  acwleftarcarrow: "⤹",
  acwoverarcarrow: "⤺",
  acwunderarcarrow: "⤻",
  curvearrowrightminus: "⤼",
  curvearrowleftplus: "⤽",
  cwundercurvearrow: "⤾",
  ccwundercurvearrow: "⤿",
  acwcirclearrow: "⥀",
  cwcirclearrow: "⥁",
  rightarrowshortleftarrow: "⥂",
  leftarrowshortrightarrow: "⥃",
  shortrightarrowleftarrow: "⥄",
  rightarrowplus: "⥅",
  leftarrowplus: "⥆",
  rightarrowx: "⥇",
  leftrightarrowcircle: "⥈",
  twoheaduparrowcircle: "⥉",
  leftrightharpoonupdown: "⥊",
  leftrightharpoondownup: "⥋",
  updownharpoonrightleft: "⥌",
  updownharpoonleftright: "⥍",
  leftrightharpoonupup: "⥎",
  updownharpoonrightright: "⥏",
  leftrightharpoondowndown: "⥐",
  updownharpoonleftleft: "⥑",
  barleftharpoonup: "⥒",
  rightharpoonupbar: "⥓",
  barupharpoonright: "⥔",
  downharpoonrightbar: "⥕",
  barleftharpoondown: "⥖",
  rightharpoondownbar: "⥗",
  barupharpoonleft: "⥘",
  downharpoonleftbar: "⥙",
  leftharpoonupbar: "⥚",
  barrightharpoonup: "⥛",
  upharpoonrightbar: "⥜",
  bardownharpoonright: "⥝",
  leftharpoondownbar: "⥞",
  barrightharpoondown: "⥟",
  upharpoonleftbar: "⥠",
  bardownharpoonleft: "⥡",
  leftharpoonsupdown: "⥢",
  upharpoonsleftright: "⥣",
  rightharpoonsupdown: "⥤",
  downharpoonsleftright: "⥥",
  leftrightharpoonsup: "⥦",
  leftrightharpoonsdown: "⥧",
  rightleftharpoonsup: "⥨",
  rightleftharpoonsdown: "⥩",
  leftharpoonupdash: "⥪",
  dashleftharpoondown: "⥫",
  rightharpoonupdash: "⥬",
  dashrightharpoondown: "⥭",
  updownharpoonsleftright: "⥮",
  downupharpoonsleftright: "⥯",
  rightimply: "⥰",
  equalrightarrow: "⥱",
  similarrightarrow: "⥲",
  leftarrowsimilar: "⥳",
  rightarrowsimilar: "⥴",
  rightarrowapprox: "⥵",
  ltlarr: "⥶",
  leftarrowless: "⥷",
  gtrarr: "⥸",
  subrarr: "⥹",
  leftarrowsubset: "⥺",
  suplarr: "⥻",
  leftfishtail: "⥼",
  rightfishtail: "⥽",
  upfishtail: "⥾",
  downfishtail: "⥿",
  typecolon: "⦂",
  rtriltri: "⧎",
  ltrivb: "⧏",
  vbrtri: "⧐",
  lfbowtie: "⧑",
  rfbowtie: "⧒",
  fbowtie: "⧓",
  lftimes: "⧔",
  rftimes: "⧕",
  dualmap: "⧟",
  lrtriangleeq: "⧡",
  eparsl: "⧣",
  smeparsl: "⧤",
  eqvparsl: "⧥",
  gleichstark: "⧦",
  ruledelayed: "⧴",
  veeonwedge: "⩙",
  eqdot: "⩦",
  dotequiv: "⩧",
  equivVert: "⩨",
  equivVvert: "⩩",
  dotsim: "⩪",
  simrdots: "⩫",
  simminussim: "⩬",
  congdot: "⩭",
  asteq: "⩮",
  hatapprox: "⩯",
  approxeqq: "⩰",
  eqqsim: "⩳",
  eqeq: "⩵",
  eqeqeq: "⩶",
  ddotseq: "⩷",
  equivDD: "⩸",
  ltcir: "⩹",
  gtcir: "⩺",
  ltquest: "⩻",
  gtquest: "⩼",
  lesdot: "⩿",
  gesdot: "⪀",
  lesdoto: "⪁",
  gesdoto: "⪂",
  lesdotor: "⪃",
  gesdotol: "⪄",
  lsime: "⪍",
  gsime: "⪎",
  lsimg: "⪏",
  gsiml: "⪐",
  lgE: "⪑",
  glE: "⪒",
  lesges: "⪓",
  gesles: "⪔",
  elsdot: "⪗",
  egsdot: "⪘",
  eqqless: "⪙",
  eqqgtr: "⪚",
  eqqslantless: "⪛",
  eqqslantgtr: "⪜",
  simless: "⪝",
  simgtr: "⪞",
  simlE: "⪟",
  simgE: "⪠",
  Lt: "⪡",
  Gt: "⪢",
  partialmeetcontraction: "⪣",
  glj: "⪤",
  gla: "⪥",
  ltcc: "⪦",
  gtcc: "⪧",
  lescc: "⪨",
  gescc: "⪩",
  smt: "⪪",
  lat: "⪫",
  smte: "⪬",
  late: "⪭",
  bumpeqq: "⪮",
  precneq: "⪱",
  succneq: "⪲",
  preceqq: "⪳",
  succeqq: "⪴",
  Prec: "⪻",
  Succ: "⪼",
  subsetdot: "⪽",
  supsetdot: "⪾",
  subsetplus: "⪿",
  supsetplus: "⫀",
  submult: "⫁",
  supmult: "⫂",
  subedot: "⫃",
  supedot: "⫄",
  subsim: "⫇",
  supsim: "⫈",
  subsetapprox: "⫉",
  supsetapprox: "⫊",
  lsqhook: "⫍",
  rsqhook: "⫎",
  csub: "⫏",
  csup: "⫐",
  csube: "⫑",
  csupe: "⫒",
  subsup: "⫓",
  supsub: "⫔",
  subsub: "⫕",
  supsup: "⫖",
  suphsub: "⫗",
  supdsub: "⫘",
  forkv: "⫙",
  topfork: "⫚",
  mlcp: "⫛",
  forks: "⫝̸",
  forksnot: "⫝",
  shortlefttack: "⫞",
  shortdowntack: "⫟",
  shortuptack: "⫠",
  vDdash: "⫢",
  dashV: "⫣",
  Dashv: "⫤",
  DashV: "⫥",
  varVdash: "⫦",
  Barv: "⫧",
  vBar: "⫨",
  vBarv: "⫩",
  barV: "⫪",
  Vbar: "⫫",
  Not: "⫬",
  bNot: "⫭",
  revnmid: "⫮",
  cirmid: "⫯",
  midcir: "⫰",
  nhpar: "⫲",
  parsim: "⫳",
  lllnest: "⫷",
  gggnest: "⫸",
  leqqslant: "⫹",
  geqqslant: "⫺",
  circleonleftarrow: "⬰",
  leftthreearrows: "⬱",
  leftarrowonoplus: "⬲",
  longleftsquigarrow: "⬳",
  nvtwoheadleftarrow: "⬴",
  nVtwoheadleftarrow: "⬵",
  twoheadmapsfrom: "⬶",
  twoheadleftdbkarrow: "⬷",
  leftdotarrow: "⬸",
  nvleftarrowtail: "⬹",
  nVleftarrowtail: "⬺",
  twoheadleftarrowtail: "⬻",
  nvtwoheadleftarrowtail: "⬼",
  nVtwoheadleftarrowtail: "⬽",
  leftarrowx: "⬾",
  leftcurvedarrow: "⬿",
  equalleftarrow: "⭀",
  bsimilarleftarrow: "⭁",
  leftarrowbackapprox: "⭂",
  rightarrowgtr: "⭃",
  rightarrowsupset: "⭄",
  LLeftarrow: "⭅",
  RRightarrow: "⭆",
  bsimilarrightarrow: "⭇",
  rightarrowbackapprox: "⭈",
  similarleftarrow: "⭉",
  leftarrowapprox: "⭊",
  leftarrowbsimilar: "⭋",
  rightarrowbsimilar: "⭌",
  ",": " ",
  ">": " ",
  ":": " ",
  ";": " ".repeat(2),
  "!": "",
  quad: " ".repeat(4),
  qquad: " ".repeat(6),
  thinspace: " ",
  medspace: " ",
  thickspace: " ".repeat(2),
  enspace: " ".repeat(2),
  negthickspace: "",
  negthinspace: "",
  negmedspace: "",
  "(": "(",
  ")": ")",
  "[": "[",
  "]": "]",
  "{": "{",
  "}": "}",
  "%": "%",
  "\\": `
`,
  newline: `
`,
  Game: "⅁",
  because: "∵",
  suchthat: "∴"
};
var FixedInfixes = [
  "plus",
  "minus",
  "cdot",
  "gtrdot",
  "cdotp",
  "intercal",
  "centerdot",
  "land",
  "rhd",
  "circ",
  "leftthreetimes",
  "rightthreetimes",
  "amalg",
  "circledast",
  "ldotp",
  "rtimes",
  "And",
  "circledcirc",
  "lor",
  "setminus",
  "ast",
  "circleddash",
  "lessdot",
  "smallsetminus",
  "barwedge",
  "Cup",
  "lhd",
  "sqcap",
  "bigcirc",
  "cup",
  "ltimes",
  "sqcup",
  "bmod",
  "curlyvee",
  "mod",
  "times",
  "boxdot",
  "curlywedge",
  "mp",
  "unlhd",
  "boxminus",
  "div",
  "odot",
  "unrhd",
  "boxplus",
  "divideontimes",
  "ominus",
  "uplus",
  "boxtimes",
  "dotplus",
  "oplus",
  "vee",
  "bullet",
  "doublebarwedge",
  "otimes",
  "veebar",
  "Cap",
  "doublecap",
  "oslash",
  "wedge",
  "cap",
  "doublecup",
  "pm",
  "plusmn",
  "wr"
];
var operatorNames = [
  "arcsin",
  "arccos",
  "arctan",
  "arctg",
  "arcctg",
  "arg",
  "ch",
  "cos",
  "det",
  "gcd",
  "inf",
  "cosec",
  "cosh",
  "cot",
  "cotg",
  "coth",
  "csc",
  "ctg",
  "cth",
  "lim",
  "max",
  "deg",
  "dim",
  "exp",
  "hom",
  "ker",
  "lg",
  "ln",
  "log",
  "min",
  "plim",
  "Pr",
  "sup",
  "sec",
  "sin",
  "sinh",
  "sh",
  "tan",
  "tanh",
  "tg",
  "th"
];
operatorNames.forEach((x) => stableFixed[x] = x);
var greeks = [
  "Alpha",
  "Beta",
  "Gamma",
  "Delta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
  "Iota",
  "Kappa",
  "Lambda",
  "Mu",
  "Nu",
  "Xi",
  "Omicron",
  "Pi",
  "Rho",
  "Sigma",
  "Tau",
  "Upsilon",
  "Phi",
  "Chi",
  "Psi",
  "Omega",
  "alpha",
  "beta",
  "gamma",
  "delta",
  "epsilon",
  "zeta",
  "eta",
  "theta",
  "iota",
  "kappa",
  "lambda",
  "mu",
  "nu",
  "xi",
  "omicron",
  "pi",
  "rho",
  "sigma",
  "tau",
  "upsilon",
  "phi",
  "chi",
  "psi",
  "omega"
];
greeks.forEach((x, i) => stableFixed[x] = unicode_table_default.greeks[i]);
stableFixed.epsilon = "ϵ";
stableFixed.phi = "ϕ";
var stableValue = (key) => stableFixed[key];
unicode_table_default.supscripts[stableValue("times")] = unicode_table_default.supscripts.x;
unicode_table_default.subscripts[stableValue("in")] = stableValue("smallin");
unicode_table_default.subscripts[stableValue("ni")] = stableValue("smallni");
var fixed_default = stableFixed;

// src/impl/unicode/unary.ts
var unchecked_accents = (unicode) => (x) => `${x}${unicode}`;
var Unary = {
  id: (x) => x,
  text: (x) => x,
  mathrm: (x) => x,
  sqrt: (x) => "√" + proper_default.paren(x),
  cbrt: (x) => "∛" + proper_default.paren(x),
  furt: (x) => "∜" + proper_default.paren(x),
  grave: unchecked_accents("̀"),
  "`": unchecked_accents("̀"),
  acute: unchecked_accents("́"),
  "'": unchecked_accents("́"),
  hat: unchecked_accents("̂"),
  "^": unchecked_accents("̂"),
  tilde: unchecked_accents("̃"),
  "~": unchecked_accents("̃"),
  bar: unchecked_accents("̄"),
  "=": unchecked_accents("̄"),
  overline: (x) => x + (unicode_table_default.isLetterOrGreek(x) ? "̅" : "-underline"),
  breve: (x) => x + (unicode_table_default.isLetterOrGreek(x) ? "̆" : "-breve"),
  u: unchecked_accents("̆"),
  dot: unchecked_accents("̇"),
  ".": unchecked_accents("̇"),
  ddot: unchecked_accents("̈"),
  '"': unchecked_accents("̈"),
  ovhook: unchecked_accents("̉"),
  ocirc: unchecked_accents("̊"),
  r: unchecked_accents("̊"),
  H: unchecked_accents("̋"),
  check: unchecked_accents("̌"),
  v: unchecked_accents("̌"),
  candra: unchecked_accents("̐"),
  oturnedcomma: unchecked_accents("̒"),
  ocommatopright: unchecked_accents("̕"),
  droang: unchecked_accents("̚"),
  utilde: unchecked_accents("̰"),
  mathunderbar: unchecked_accents("̲"),
  not: unchecked_accents("̸"),
  underleftrightarrow: unchecked_accents("͍"),
  leftharpoonaccent: unchecked_accents("⃐"),
  rightharpoonaccent: unchecked_accents("⃑"),
  vertoverlay: unchecked_accents("⃒"),
  overleftarrow: unchecked_accents("⃖"),
  overrightarrow: unchecked_accents("⃗"),
  vec: unchecked_accents("⃗"),
  dddot: unchecked_accents("⃛"),
  ddddot: unchecked_accents("⃜"),
  overleftrightarrow: unchecked_accents("⃡"),
  annuity: unchecked_accents("⃧"),
  threeunderdot: unchecked_accents("⃨"),
  widebridgeabove: unchecked_accents("⃩"),
  underrightharpoondown: unchecked_accents("⃬"),
  underleftharpoondown: unchecked_accents("⃭"),
  underleftarrow: unchecked_accents("⃮"),
  underrightarrow: unchecked_accents("⃯"),
  asteraccent: unchecked_accents("⃰"),
  kern: (x) => x.endsWith("em") ? " ".repeat(+x.substring(0, x.length - 2)) : " "
};
var unary_default = Unary;
var UnaryOptional = {
  sqrt: (n, x) => {
    switch (n) {
      case "2":
        return Unary.sqrt(x);
      case "3":
        return Unary.cbrt(x);
      case "4":
        return Unary.furt(x);
      default:
        return unicode_table_default.suprender(n) + Unary.sqrt(x);
    }
  }
};
for (const key of ["mkern", "mskip", "hskip", "hspace"]) {
  Unary[key] = Unary.kern;
}
unicode_table_default.typefaceNames.forEach((x) => Unary[x] = (s) => unicode_table_default.render_if_exists(s, x));
var UnaryTypefaceNames = ["text", "mathrm", ...unicode_table_default.typefaceNames];

// src/macro-types.ts
var getFixedValue = (fixed, key) => {
  const data = fixed[key];
  if (typeof data === "string") {
    return data;
  } else if (data && typeof data === "object" && "category" in data) {
    return data.value;
  }
  throw new Error(`Fixed macro "${key}" not found or invalid.`);
};

// src/parsec/parse.ts
var success = (pos, res) => ({ type: "success", pos, res });
var defaultMessage = (pos) => `mismatched: ${pos.extract(pos.index + 5)}...`;
var error = (pos, err) => ({ type: "error", pos, err: err ? err : defaultMessage(pos) });
var never = () => error({}, "never");
var pure = (a) => (it) => success(it, a);
var bind = (f, g) => (it) => ((x) => x.type == "success" ? g(x.res)(x.pos) : x.type == "error" ? error(x.pos, x.err) : never())(f(it));
var fail = (msg) => (it) => error(it, msg);
var Flat;
((Flat) => {
  Flat.orElse = (p, q) => (it) => ((x) => x.type == "success" ? x : x.type == "error" ? it == x.pos ? q(it) : x : never())(p(it));
  Flat.attempt = (p) => (it) => ((x) => x.type == "success" ? x : x.type == "error" ? error(it, x.err) : never())(p(it));
  Flat.pstring = (s) => (it, pos = it.forward(s.length), substr = it.extract(pos)) => substr == s ? success(pos, substr) : error(it, `expected: ${s}`);
  const unexpectedEndOfInput = "unexpected end of input";
  Flat.anyChar = (it) => it.hasNext() ? success(it.next(), it.curr()) : error(it, unexpectedEndOfInput);
  Flat.pchar = (c) => Flat.attempt(bind(Flat.anyChar, (u) => u == c ? pure(c) : fail(`expected: ${c}`)));
})(Flat ||= {});

// src/parsec/lazy.ts
var of = (run) => ({ type: "lazy", run });
var run = (val) => ("type" in val) && val.type == "lazy" ? val.run() : val;

// src/parsec/combinator.ts
class Parser {
  parse;
  constructor(parse) {
    this.parse = parse;
  }
  many() {
    return new Parser((it) => {
      const list = [];
      let result;
      let pos = it;
      while ((result = this.parse(pos)).type != "error") {
        list.push(result.res);
        pos = result.pos;
      }
      return success(result.pos, list);
    });
  }
  asterisk(f) {
    const items = this.many();
    return f ? items.map((xs) => xs.reduce((s, t) => f(s, t))) : items.map((xs) => xs.reduce((s, t) => s + t, ""));
  }
  some() {
    return new Parser((it) => {
      const list = [];
      let pos = it;
      let result = this.parse(pos);
      while ((result = this.parse(pos)).type != "error") {
        list.push(result.res);
        pos = result.pos;
      }
      return list.length >= 1 ? success(result.pos, list) : error(it, result.err);
    });
  }
  plus(f) {
    const items = this.some();
    return f ? items.map((xs) => xs.reduce((s, t) => f(s, t))) : items.map((xs) => xs.reduce((s, t) => s + t));
  }
  map(f) {
    return new Parser((it) => {
      const result = this.parse(it);
      return result.type != "error" ? success(result.pos, f(result.res)) : result;
    });
  }
  assume(predicate, err) {
    return new Parser((it) => {
      const result = this.parse(it);
      return result.type != "error" ? predicate(result.res) ? success(result.pos, result.res) : error(it, err || "assume fail") : result;
    });
  }
  or(p) {
    return new Parser((it) => Flat.orElse(this.parse, run(p).parse)(it));
  }
  follow(p) {
    return new Parser((it) => {
      const result = this.parse(it);
      if (result.type != "error") {
        const continued = run(p).parse(result.pos);
        return continued.type != "error" ? success(continued.pos, [result.res, continued.res]) : error(result.pos, continued.err);
      }
      return error(it, result.err);
    });
  }
  follow2(p, q) {
    return this.follow(p).follow(q);
  }
  skip(p) {
    return new Parser((it) => {
      const result = this.parse(it);
      if (result.type != "error") {
        const ignored = p.parse(result.pos);
        return ignored.type != "error" ? success(ignored.pos, result.res) : error(result.pos, ignored.err);
      }
      return error(it, result.err);
    });
  }
  move(p) {
    return new Parser((it) => {
      const ignored = this.parse(it);
      if (ignored.type != "error") {
        const result = run(p).parse(ignored.pos);
        return result.type != "error" ? success(result.pos, result.res) : error(ignored.pos, result.err);
      }
      return error(it, ignored.err);
    });
  }
}

// src/parsec/collection.ts
var token = (predicate, err) => new Parser((it, c = it.curr()) => c && predicate(c) ? success(it.next(), c) : error(it, err || "token mismatch"));
var character = (c) => new Parser(Flat.pchar(c));
var includes = (...xs) => token((x) => xs.includes(x));
var string = (s) => new Parser(Flat.pstring(s));
var space = character(" ");
var spaceAster = space.asterisk();
var spacePlus = space.plus();
var loose = (p) => spaceAster.move(p);
var digit = token((c) => c.boundedIn("0", "9"));
var digits = digit.plus();
var letter = token((c) => c.boundedIn("a", "z") || c.boundedIn("A", "Z"));
var letters = letter.plus();

// src/cli.ts
var backslash = character("\\");
var lbrace = character("{");
var rbrace = character("}");
var brace_wrap = (p) => lbrace.move(p).skip(rbrace);
var lbracket = character("[");
var rbracket = character("]");
var bracket_wrap = (p) => lbracket.move(p).skip(rbracket);
var special = (s) => "\\{}_^%$".includes(s);
var literal = token((x) => !special(x));
var literals = literal.plus();
var solid = (s) => s.trim().length == 1;
var valuesymbol = literal.assume(solid);
var createTranslator = ({
  fixed = {},
  fixedInfixes = [],
  unary = {},
  unaryOptional = {},
  unaryTypefaceNames = [],
  binary = {},
  binaryInfix = {},
  binaryBlock = {},
  environment = {},
  emptyBlock,
  createBlock,
  concatBlock,
  displayBlock,
  subscriptHandler,
  supscriptHandler,
  typefaceHandler,
  finalizer,
  inlineMathHandler = (s) => s
}) => {
  const single = digit.or(letter).or(valuesymbol).or(of(() => fixed_macro));
  const value = loose(single.or(brace_wrap(of(() => text))));
  const optional = bracket_wrap(value);
  const symbol_macros = includes(...`|,>:;!()[]{}_%\\\`^~=."'`);
  const macro_name = letters.or(symbol_macros);
  const macro_head = backslash.move(macro_name);
  const fixed_macro = macro_head.assume((x) => (x in fixed)).map((s) => getFixedValue(fixed, s));
  const unary_ordinary_macro = macro_head.assume((x) => (x in unary)).follow(value).map(([name, arg1]) => unary[name](arg1));
  const unary_optional_macro = macro_head.assume((x) => !!unaryOptional[x]).follow2(optional, value).map(([[name, opt1], arg1]) => unaryOptional[name](opt1, arg1));
  const unary_macro = unary_optional_macro.or(unary_ordinary_macro);
  const binary_macro = macro_head.assume((x) => !!binary[x]).follow2(value, value).map(([[name, arg1], arg2]) => binary[name](arg1, arg2));
  const infix_macro = value.follow(macro_head.assume((x) => !!binaryInfix[x])).follow(value).map((xs) => binary[xs[0][1]](xs[0][0], xs[1]));
  const braced_letters = brace_wrap(letters);
  const begin = backslash.skip(string("begin")).move(braced_letters);
  const end = backslash.skip(string("end")).move(braced_letters);
  const environ = begin.follow(of(() => section)).follow(end).assume((xs) => xs[0][0] == xs[1]).map((xs) => environment[xs[1]](xs[0][1]));
  const supscript = character("^").move(value).map(supscriptHandler);
  const subscript = character("_").move(value).map(subscriptHandler);
  const sup_or_sub = supscript.or(subscript);
  const comment = character("%").skip(token((x) => x != `
`).asterisk()).skip(character(`
`)).map(() => "");
  const typeface2 = macro_head.assume((x) => unaryTypefaceNames.includes(x)).follow(value).map(([name, arg1]) => unary[name](arg1));
  const inline_elem = literals.or(sup_or_sub).or(environ).or(unary_macro).or(binary_macro).or(value);
  const italic_render = (s) => typefaceHandler(s, "mathit");
  const inline_cluster = typeface2.or(inline_elem.map(italic_render)).plus();
  const dollar = character("$");
  const inline_math = dollar.move(inline_cluster).skip(dollar).map(inlineMathHandler);
  const block_infix = token((x) => "+-*/<>~".includes(x)).or(macro_head.assume((x) => fixedInfixes.includes(x)).map((x) => getFixedValue(fixed, x))).map((s) => createBlock(` ${s} `));
  const block_value = loose(single.map(createBlock).or(brace_wrap(of(() => block_cluster))));
  const block_binary_macro = macro_head.assume((x) => !!binaryBlock[x]).follow2(block_value, block_value).map((xs) => binaryBlock[xs[0][0]](xs[0][1], xs[1]));
  const block_elem = loose(block_infix.or(block_value).or(sup_or_sub.map(createBlock)).or(fixed_macro.map(createBlock)).or(unary_macro.map(createBlock)).or(block_binary_macro).or(token((x) => !solid(x)).some().map((_) => emptyBlock)));
  const block_cluster = block_elem.some().map((xs) => xs.reduce(concatBlock));
  const double_dollar = string("$$");
  const block_math = double_dollar.move(block_cluster.map(displayBlock)).skip(double_dollar);
  const mathstyle = block_math.or(inline_math);
  const element = literals.or(comment).or(mathstyle).or(inline_elem);
  const double_backslash = string("\\\\");
  const section = double_backslash.or(element).plus();
  const unknown_macro = macro_head.map((x) => "\\" + x);
  const spectrum = element.or(unknown_macro);
  const text = spectrum.plus();
  const translate = (s) => ((x) => x.type != "error" ? x.res : "")(text.map(finalizer).parse(s.toIterator()));
  return translate;
};

// src/impl/unicode/block.ts
var desired_length_string = function(s, n) {
  const residue = n - s.length;
  if (residue === 0)
    return s;
  if (residue > 0) {
    const left = Math.floor(residue / 2);
    const right = residue - left;
    return " ".repeat(left) + s + " ".repeat(right);
  }
  return s.substring(0, n);
};

class Block {
  width;
  height;
  data;
  display;
  baseline;
  constructor(data, baseline = 0) {
    this.width = Math.max(...data.map((x) => x.length));
    this.height = data.length;
    this.data = data.map((x) => desired_length_string(x, this.width));
    this.display = this.data.join(`
`);
    this.baseline = baseline;
  }
  adjustHeight(n, offset) {
    const residue = n - this.height;
    if (residue == 0) {
      return this;
    }
    const topLine = Array(offset).fill("");
    const bottomLine = Array(residue - offset).fill("");
    return new Block(topLine.concat(this.data).concat(bottomLine));
  }
  append(block) {
    const isHigher = this.height > block.height;
    const isGreat = this.baseline > block.baseline;
    const [offset, baseline] = isGreat ? [this.baseline - block.baseline, this.baseline] : [block.baseline - this.baseline, block.baseline];
    const [left, right] = isHigher ? [this.data, block.adjustHeight(this.height, offset).data] : [this.adjustHeight(block.height, offset).data, block.data];
    return new Block(left.map((v, i) => v + right[i]), baseline);
  }
  add = (block) => this.append(Block.plus).append(block);
  over(block) {
    const width = Math.max(this.width, block.width) + 2;
    const fracline = "-".repeat(width);
    const data = [...this.data, fracline, ...block.data];
    return new Block(data.map((x) => desired_length_string(x, width)), this.height);
  }
  static of = (s) => new Block([s]);
  static empty = Block.of("");
  static plus = Block.of(" + ");
  static fromStrings(p, q) {
    const width = Math.max(p.length, q.length) + 2;
    const desired_p = desired_length_string(p, width);
    const desired_q = desired_length_string(q, width);
    const data = [desired_p, "-".repeat(width), desired_q];
    return new Block(data, 1);
  }
  static frac(a, b) {
    return a instanceof Block && b instanceof Block ? a.over(b) : typeof a == "string" && typeof b == "string" ? Block.fromStrings(a, b) : typeof a == "string" ? Block.frac(Block.of(a), b) : Block.frac(a, Block.of(b));
  }
}
var block_default = Block;

// src/impl/unicode/binary.ts
var oversetLookup = {};
var Binary2 = {
  frac: (x, y) => `${proper_default.paren(x)}/${proper_default.paren(y)}`,
  overset: (x, y) => oversetLookup[`${x}${y}`] || `\\overset{${x}}{${y}}`,
  binom: (n, k) => `(${n} ${k})`
};
Binary2["cfrac"] = Binary2.frac;
Binary2["dfrac"] = Binary2.frac;
Binary2["tfrac"] = Binary2.frac;
Binary2["dbinom"] = Binary2.binom;
Binary2["tbinom"] = Binary2.binom;
var BinaryBlock2 = {
  frac: block_default.frac,
  overset: (x, y) => block_default.of(Binary2.overset(x.display, y.display))
};
var BinaryInfix = {
  choose: (n, k) => Binary2.binom(n, k)
};
BinaryBlock2["cfrac"] = BinaryBlock2.frac;
BinaryBlock2["dfrac"] = BinaryBlock2.frac;
BinaryBlock2["tfrac"] = BinaryBlock2.frac;

// src/impl/unicode/environment.ts
var Environment2 = {
  matrix: (s) => separateMatrix(s, " ", " ", "; "),
  smallmatrix: (s) => separateMatrix(s, " ", " ", "; "),
  bmatrix: (s) => regularMatrix(s, "[", "]"),
  pmatrix: (s) => regularMatrix(s, "(", ")"),
  vmatrix: (s) => separateMatrix(s, "|", "|", "; "),
  Bmatrix: (s) => regularMatrix(s, "{", "}"),
  Vmatrix: (s) => separateMatrix(s, "||", "||", "; "),
  proposition: (s) => theoremStyle("proposition", s),
  lemma: (s) => theoremStyle("lemma", s),
  theorem: (s) => theoremStyle("theorem", s),
  corollary: (s) => theoremStyle("corollary", s),
  definition: (s) => theoremStyle("definition", s),
  remark: (s) => theoremStyle("remark", s),
  hypothesis: (s) => theoremStyle("hypothesis", s),
  conjecture: (s) => theoremStyle("conjecture", s),
  axiom: (s) => theoremStyle("axiom", s),
  example: (s) => theoremStyle("example", s),
  proof: (s) => theoremStyle("proof", s)
};
var doubleBackslash = "\\\\";
var matrixM = (s) => s.replace(/\s/g, "").replace(/&/g, " ");
var regularMatrix = function(matrix, leftMark, rightMark, leftOuterMark = leftMark, rightOuterMark = rightMark) {
  const xs = matrix.split(doubleBackslash);
  const s = "".concat(...xs.map((s2) => leftMark + matrixM(s2) + rightMark));
  return xs.length > 1 ? leftOuterMark + s + rightOuterMark : s;
};
var separateMatrix = function(matrix, leftOuterMark, rightOuterMark, separator) {
  const xs = matrix.split(doubleBackslash);
  return leftOuterMark + xs.map(matrixM).join(separator) + rightOuterMark;
};
var polymerize = function(s) {
  let result = s.trim().replace(/ *\r\n *| *\n *| (?= )/g, "").replace(/ *(,|\.) */g, "$1 ");
  return result;
};
var regexpDoubleLine = /\r\n\r\n|\n\n/;
var theoremStyle = function(type, content) {
  let title = fixed_default[type] + ". ";
  return title + content.split(regexpDoubleLine).map(polymerize).join(`
`);
};
var environment_default = Environment2;

// src/impl/x/fixed-banner.ts
var FixedBanner = {
  KaTeX: { category: "KaTeX", value: "KᴬTᴇX" },
  UniTeX: { category: "UniTeX", value: "UⁿᵢTᴇX" },
  Agda: { category: "UniTeX", value: "\uD835\uDC34gda" },
  Lean: { category: "UniTeX", value: "L∃∀N" },
  BibTeX: { category: "UniTeX", value: "BIBTᴇX" },
  bTeX: { category: "UniTeX", value: "\uD83C\uDF4CTᴇX" },
  typst: { category: "UniTeX", value: "\uD835\uDC61\uD835\uDC66\uD835\uDC5D\uD835\uDC60\uD835\uDC61" }
};
var fixed_banner_default = FixedBanner;

// src/impl/x/fixed-theorem.ts
var FixedTheorem = {
  proposition: { category: "UniTeX", value: unicode_table_default.render_if_exists("Proposition", "textbf") },
  lemma: { category: "UniTeX", value: unicode_table_default.render_if_exists("Lemma", "textbf") },
  theorem: { category: "UniTeX", value: unicode_table_default.render_if_exists("Theorem", "textbf") },
  corollary: { category: "UniTeX", value: unicode_table_default.render_if_exists("Corollary", "textbf") },
  definition: { category: "UniTeX", value: unicode_table_default.render_if_exists("Definition", "textbf") },
  remark: { category: "UniTeX", value: unicode_table_default.render_if_exists("Remark", "textbf") },
  hypothesis: { category: "UniTeX", value: unicode_table_default.render_if_exists("Hypothesis", "textbf") },
  conjecture: { category: "UniTeX", value: unicode_table_default.render_if_exists("Conjecture", "textbf") },
  axiom: { category: "UniTeX", value: unicode_table_default.render_if_exists("Axiom", "textbf") },
  example: { category: "UniTeX", value: unicode_table_default.render_if_exists("Example", "textbf") },
  proof: { category: "UniTeX", value: unicode_table_default.render_if_exists("proof", "textit") }
};
var fixed_theorem_default = FixedTheorem;

// src/impl/x/unicode-math.ts
var FixedUnicodeMath = {
  ncong: { category: "unicode-math", value: "≇" },
  approx: { category: "unicode-math", value: "≈" },
  napprox: { category: "unicode-math", value: "≉" },
  approxeq: { category: "unicode-math", value: "≊" },
  approxident: { category: "unicode-math", value: "≋" },
  backcong: { category: "unicode-math", value: "≌" },
  asymp: { category: "unicode-math", value: "≍" },
  Bumpeq: { category: "unicode-math", value: "≎" },
  bumpeq: { category: "unicode-math", value: "≏" },
  doteq: { category: "unicode-math", value: "≐" },
  Doteq: { category: "unicode-math", value: "≑" },
  fallingdotseq: { category: "unicode-math", value: "≒" },
  risingdotseq: { category: "unicode-math", value: "≓" },
  coloneq: { category: "unicode-math", value: "≔" },
  eqcolon: { category: "unicode-math", value: "≕" },
  eqcirc: { category: "unicode-math", value: "≖" },
  circeq: { category: "unicode-math", value: "≗" },
  arceq: { category: "unicode-math", value: "≘" },
  wedgeq: { category: "unicode-math", value: "≙" },
  veeeq: { category: "unicode-math", value: "≚" },
  stareq: { category: "unicode-math", value: "≛" },
  triangleq: { category: "unicode-math", value: "≜" },
  eqdef: { category: "unicode-math", value: "≝" },
  measeq: { category: "unicode-math", value: "≞" },
  questeq: { category: "unicode-math", value: "≟" }
};
var UnicodeMathOversetLookup = {
  "?=": FixedUnicodeMath.questeq.value,
  "m=": FixedUnicodeMath.measeq.value,
  "def=": FixedUnicodeMath.eqdef.value,
  [fixed_default.star + "="]: FixedUnicodeMath.stareq.value,
  [fixed_default.Delta + "="]: FixedUnicodeMath.triangleq.value
};

// src/impl/unicode.ts
Object.assign(fixed_default, fixed_banner_default, fixed_theorem_default, FixedUnicodeMath);
Object.assign(oversetLookup, UnicodeMathOversetLookup);
var translate = createTranslator({
  fixed: fixed_default,
  fixedInfixes: FixedInfixes,
  unary: unary_default,
  unaryOptional: UnaryOptional,
  unaryTypefaceNames: UnaryTypefaceNames,
  binary: Binary2,
  binaryInfix: BinaryInfix,
  binaryBlock: BinaryBlock2,
  environment: environment_default,
  emptyBlock: block_default.empty,
  createBlock: block_default.of,
  concatBlock: (a, b) => a.append(b),
  displayBlock: (a) => a.display,
  subscriptHandler: unicode_table_default.subrender,
  supscriptHandler: unicode_table_default.suprender,
  typefaceHandler: unicode_table_default.render_if_exists,
  finalizer: (s) => unicode_table_default.recover_placeholders(s).normalize("NFC")
});
export {
  unary_default as unary,
  translate as parse,
  fixed_default as fixed,
  Binary2 as binary
};
