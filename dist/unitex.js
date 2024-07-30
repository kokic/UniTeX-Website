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

// src/impl/unicode/unicode-table.ts
var Unicode = {
  typeface: {},
  isLetter: (s) => s.boundedIn("a", "z") || s.boundedIn("A", "Z"),
  series: (a, b) => {
    let [start, end] = [a.codePointAt(0), b.codePointAt(0)];
    let length = end - start + 1;
    let codes = Array.from({ length }, (_, x) => x + start);
    return String.fromCodePoint(...codes);
  },
  alphabets: (...table) => {
    let map = Object.create(null);
    Unicode["letterArray"].forEach((x, i) => map[x] = table[i]);
    return map;
  },
  block: (a, b, names) => {
    let map = new Object;
    let data = Unicode.series(a, b);
    names.forEach((name, i) => name && (map[name] = data[i]));
    return map;
  },
  render_if_exists: (s, name) => Array.from(s).map((x) => Unicode.typeface[name][x] || x).join(""),
  render_if_forall: (charset, str, otherwise = (x) => x) => {
    const array = Array.from(str);
    let through = true;
    for (const element of array)
      through &&= !!charset[element];
    return through ? array.map((x) => charset[x]).join("") : otherwise(str);
  },
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
Unicode["greekUppers"] = Unicode.series("\u0391", "\u03A1") + Unicode.series("\u03A3", "\u03A9");
Unicode["greekLowers"] = Unicode.series("\u03B1", "\u03C1") + Unicode.series("\u03C3", "\u03C9");
Unicode["greeks"] = Unicode["greekUppers"] + Unicode["greekLowers"];
var series = Unicode.series;
var alphabets = Unicode.alphabets;
var typeface = function(name, alphabet) {
  Unicode.typeface[name] = alphabet;
};
typeface("mathbb", alphabets(..."\uD835\uDD38\uD835\uDD39\u2102", ...series("\uD835\uDD3B", "\uD835\uDD3E"), "\u210D", ...series("\uD835\uDD40", "\uD835\uDD44"), ..."\u2115\uD835\uDD46\u2119\u211A\u211D", ...series("\uD835\uDD4A", "\uD835\uDD50"), "\u2124", ...series("\uD835\uDD52", "\uD835\uDD6B")));
typeface("mathfrak", alphabets(...series("\uD835\uDD6C", "\uD835\uDD9F")));
typeface("mathscr", alphabets(..."\uD835\uDC9C\u212C\uD835\uDC9E\uD835\uDC9F\u2130\u2131\uD835\uDCA2\u210B\u2110\uD835\uDCA5\uD835\uDCA6\u2112\u2133", ...series("\uD835\uDCA9", "\uD835\uDCAC"), "\u211B", ...series("\uD835\uDCAE", "\uD835\uDCB9"), "\u212F", "\uD835\uDCBB", "g", ...series("\uD835\uDCBD", "\uD835\uDCC3"), "\u2134", ...series("\uD835\uDCC5", "\uD835\uDCCF")));
typeface("mathcal", Unicode.typeface["mathscr"]);
typeface("mathbf", alphabets(...series("\uD835\uDC00", "\uD835\uDC33")));
typeface("mathit", alphabets(...series("\uD835\uDC34", "\uD835\uDC54"), "h", ...series("\uD835\uDC56", "\uD835\uDC67")));
typeface("mathsf", alphabets(...series("\uD835\uDDA0", "\uD835\uDDD3")));
typeface("textbf", Unicode.typeface.mathbf);
typeface("textit", Unicode.typeface.mathit);
typeface("textsf", Unicode.typeface.mathsf);
typeface("texttt", alphabets(...series("\uD835\uDE70", "\uD835\uDEA3")));
typeface("textscr", Unicode.typeface.mathscr);
typeface("textcal", Unicode.typeface.mathcal);
typeface("sf", Unicode.typeface.mathsf);
typeface("bf", Unicode.typeface.mathbf);
typeface("bold", Unicode.typeface.mathbf);
typeface("boldsymbol", Unicode.typeface.mathbf);
typeface("bm", Unicode.typeface.mathbf);
typeface("tt", Unicode.typeface.texttt);
typeface("it", Unicode.typeface.mathit);
typeface("frak", Unicode.typeface.mathfrak);
typeface("cal", Unicode.typeface.mathcal);
typeface("Bbb", Unicode.typeface.mathbb);
Unicode.typefaceNames = Object.keys(Unicode.typeface);
Unicode.supscripts[0] = "\u2070";
Unicode.supscripts[1] = "\xB9";
Unicode.supscripts[2] = "\xB2";
Unicode.supscripts[3] = "\xB3";
Unicode.supscripts[4] = "\u2074";
Unicode.supscripts[5] = "\u2075";
Unicode.supscripts[6] = "\u2076";
Unicode.supscripts[7] = "\u2077";
Unicode.supscripts[8] = "\u2078";
Unicode.supscripts[9] = "\u2079";
Unicode.supscripts.a = "\u1D43";
Unicode.supscripts.b = "\u1D47";
Unicode.supscripts.c = "\u1D9C";
Unicode.supscripts.d = "\u1D48";
Unicode.supscripts.e = "\u1D49";
Unicode.supscripts.f = "\u1DA0";
Unicode.supscripts.g = "\u1D4D";
Unicode.supscripts.h = "\u02B0";
Unicode.supscripts.j = "\u02B2";
Unicode.supscripts.k = "\u1D4F";
Unicode.supscripts.l = "\u02E1";
Unicode.supscripts.m = "\u1D50";
Unicode.supscripts.n = "\u207F";
Unicode.supscripts.o = "\u1D52";
Unicode.supscripts.p = "\u1D56";
Unicode.supscripts.r = "\u02B3";
Unicode.supscripts.s = "\u02E2";
Unicode.supscripts.t = "\u1D57";
Unicode.supscripts.u = "\u1D58";
Unicode.supscripts.v = "\u1D5B";
Unicode.supscripts.w = "\u02B7";
Unicode.supscripts.x = "\u02E3";
Unicode.supscripts.y = "\u02B8";
Unicode.supscripts.z = "\u1DBB";
Unicode.supscripts["+"] = "\u207A";
Unicode.supscripts["-"] = "\u207B";
Unicode.supscripts["="] = "\u207C";
Unicode.supscripts["("] = "\u207D";
Unicode.supscripts[")"] = "\u207E";
Unicode.supscripts.A = "\u1D2C";
Unicode.supscripts.B = "\u1D2E";
Unicode.supscripts.D = "\u1D30";
Unicode.supscripts.E = "\u1D31";
Unicode.supscripts.G = "\u1D33";
Unicode.supscripts.H = "\u1D34";
Unicode.supscripts.I = "\u1D35";
Unicode.supscripts.J = "\u1D36";
Unicode.supscripts.K = "\u1D37";
Unicode.supscripts.L = "\u1D38";
Unicode.supscripts.M = "\u1D39";
Unicode.supscripts.N = "\u1D3A";
Unicode.supscripts["\u03B1"] = "\u1D45";
Unicode.supscripts["\u2032"] = "\u2032";
["\u2080", "\u2081", "\u2082", "\u2083", "\u2084", "\u2085", "\u2086", "\u2087", "\u2088", "\u2089"].forEach((x, i) => Unicode.subscripts[i] = x);
Unicode.subscripts.a = "\u2090";
Unicode.subscripts.e = "\u2091";
Unicode.subscripts.h = "\u2095";
Unicode.subscripts.i = "\u1D62";
Unicode.subscripts.j = "\u2C7C";
Unicode.subscripts.k = "\u2096";
Unicode.subscripts.l = "\u2097";
Unicode.subscripts.m = "\u2098";
Unicode.subscripts.n = "\u2099";
Unicode.subscripts.o = "\u2092";
Unicode.subscripts.p = "\u209A";
Unicode.subscripts.r = "\u1D63";
Unicode.subscripts.s = "\u209B";
Unicode.subscripts.t = "\u209C";
Unicode.subscripts.u = "\u1D64";
Unicode.subscripts.v = "\u1D65";
Unicode.subscripts.x = "\u2093";
Unicode.subscripts["+"] = "\u208A";
Unicode.subscripts["-"] = "\u208B";
Unicode.subscripts["="] = "\u208C";
Unicode.subscripts["("] = "\u208D";
Unicode.subscripts[")"] = "\u208E";
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
  TeX: "T\u1D07X",
  LaTeX: "L\u1D2CT\u1D07X",
  hat: "\u0302",
  tilde: "\u0303",
  bar: "\u0304",
  overline: "\u0305",
  breve: "\u0306",
  widetilde: "\u0360",
  uwidebreve: "\u035C",
  widebreve: "\u035D",
  widepreve: "\u0361",
  uvec: "\u0362",
  degree: "\xB0",
  varGamma: "\u0393",
  varDelta: "\u0394",
  varTheta: "\u0398",
  varLambda: "\u039B",
  varXi: "\u039E",
  varPi: "\u03D6",
  varSigma: "\u03A3",
  varUpsilon: "\u03A5",
  varPhi: "\u03A6",
  varPsi: "\u03A8",
  varOmega: "\u03A9",
  varepsilon: "\u03B5",
  varkappa: "\u03F0",
  vartheta: "\u03D1",
  thetasym: "\u03D1",
  varpi: "\u03D6",
  varrho: "\u03F1",
  varsigma: "\u03C2",
  varphi: "\u03C6",
  digamma: "\u03DD",
  argmax: "arg max",
  argmin: "arg min",
  injlim: "inj lim",
  liminf: "lim inf",
  limsup: "lim sup",
  projlim: "proj lim",
  cdot: "\u22C5",
  cdotp: "\u22C5",
  dots: "\u2026",
  cdots: "\u22EF",
  ldots: "\u2026",
  ddots: "\u22F1",
  vdots: "\u22EE",
  prime: "\u2032",
  Box: "\u25A1",
  S: "\xA7",
  sect: "\xA7",
  "|": "\u2225",
  lang: "\u27E8",
  rang: "\u27E9",
  vert: "\u2223",
  Vert: "\u2225",
  lVert: "\u2225",
  rVert: "\u2225",
  lceil: "\u2308",
  rceil: "\u2309",
  lfloor: "\u230A",
  rfloor: "\u230B",
  lmoustache: "\u23B0",
  rmoustache: "\u23B1",
  lgroup: "\u27EE",
  rgroup: "\u27EF",
  ulcorner: "\u250C",
  urcorner: "\u2510",
  llcorner: "\u2514",
  lrcorner: "\u2518",
  llbracket: "[[",
  rlbracket: "]]",
  lBrace: "{[",
  rBrace: "]}",
  bigotimes: "\u2A02",
  bigvee: "\u22C1",
  bigoplus: "\u2A01",
  bigwedge: "\u22C0",
  bigodot: "\u2A00",
  bigcap: "\u22C2",
  biguplus: "\u2A04",
  bigcup: "\u22C3",
  bigsqcup: "\u2A06",
  wedge: "\u2227",
  curlywedge: "\u22CF",
  barwedge: "\u22BC",
  doublebarwedge: "\u2A5E",
  vee: "\u2228",
  curlyvee: "\u22CE",
  veebar: "\u22BB",
  sqcap: "\u2293",
  sqcup: "\u2294",
  boxdot: "\u22A1",
  boxplus: "\u229E",
  boxminus: "\u229F",
  boxtimes: "\u22A0",
  oplus: "\u2295",
  ominus: "\u2296",
  otimes: "\u2297",
  oslash: "\u2298",
  uplus: "\u228E",
  divideontimes: "\u22C7",
  lhd: "\u22B2",
  unlhd: "\u22B4",
  rhd: "\u22B3",
  unrhd: "\u22B5",
  setminus: "\u2216",
  smallsetminus: "\u2216",
  forall: "\u2200",
  complement: "\u2201",
  partial: "\u2202",
  exist: "\u2203",
  exists: "\u2203",
  noexist: "\u2204",
  empty: "\u2205",
  emptyset: "\u2205",
  varnothing: "\u2300",
  nabla: "\u2207",
  ni: "\u220B",
  blacksquare: "\u220E",
  prod: "\u220F",
  coprod: "\u2210",
  sum: "\u2211",
  plus: "+",
  minus: "\u2212",
  mp: "\u2213",
  dotplus: "\u2214",
  backslash: "\u2216",
  ast: "\u2217",
  circ: "\u2218",
  bullet: "\u2219",
  infty: "\u221E",
  infin: "\u221E",
  mid: "\u2223",
  nmid: "\u2224",
  parallel: "\u2225",
  nparallel: "\u2226",
  land: "\u2227",
  lor: "\u2228",
  cap: "\u2229",
  cup: "\u222A",
  int: "\u222B",
  iint: "\u222C",
  iiint: "\u222D",
  iiiint: "\u2A0C",
  oint: "\u222E",
  oiint: "\u222F",
  oiiint: "\u2230",
  intclockwise: "\u2231",
  lcirclerightint: "\u2232",
  rcirclerightint: "\u2233",
  nsimeq: "\u2244",
  congneq: "\u2246",
  eq: "=",
  ne: "\u2260",
  neq: "\u2260",
  triangleq: "\u225C",
  doteqdot: "\u2251",
  lessapprox: "\u2A85",
  smile: "\u2323",
  eqcirc: "\u2256",
  lesseqgtr: "\u22DA",
  sqsubset: "\u228F",
  eqcolon: "\u2239",
  minuscolon: "\u2239",
  lesseqqgtr: "\u2A8B",
  sqsubseteq: "\u2291",
  Eqcolon: "\u2212\u2237",
  minuscoloncolon: "-\u2237",
  lessgtr: "\u2276",
  sqsupset: "\u2290",
  approx: "\u2248",
  eqqcolon: "\u2255",
  equalscolon: "\u2255",
  lesssim: "\u2272",
  sqsupseteq: "\u2292",
  approxcolon: "\u2248:",
  Eqqcolon: "=\u2237",
  equalscoloncolon: "=\u2237",
  ll: "\u226A",
  Subset: "\u22D0",
  approxcoloncolon: "\u2248\u2237",
  eqsim: "\u2242",
  lll: "\u22D8",
  subset: "\u2282",
  sub: "\u2282",
  approxeq: "\u224A",
  eqslantgtr: "\u2A96",
  llless: "\u22D8",
  subseteq: "\u2286",
  sube: "\u2286",
  asymp: "\u224D",
  eqslantless: "\u2A95",
  lt: "<",
  subseteqq: "\u2AC5",
  backepsilon: "\u220D",
  equiv: "\u2261",
  succ: "\u227B",
  backsim: "\u223D",
  fallingdotseq: "\u2252",
  models: "\u22A8",
  succapprox: "\u2AB8",
  backsimeq: "\u22CD",
  frown: "\u2322",
  multimap: "\u22B8",
  succcurlyeq: "\u227D",
  between: "\u226C",
  ge: "\u2265",
  origof: "\u22B6",
  succeq: "\u2AB0",
  bowtie: "\u22C8",
  geq: "\u2265",
  owns: "\u220B",
  succsim: "\u227F",
  bumpeq: "\u224F",
  geqq: "\u2267",
  Supset: "\u22D1",
  Bumpeq: "\u224E",
  geqslant: "\u2A7E",
  perp: "\u22A5",
  supset: "\u2283",
  gg: "\u226B",
  pitchfork: "\u22D4",
  supseteq: "\u2287",
  supe: "\u2287",
  colonapprox: ":\u2248",
  ggg: "\u22D9",
  prec: "\u227A",
  supseteqq: "\u2AC6",
  Colonapprox: "\u2237\u2248",
  coloncolonapprox: "\u2237\u2248",
  gggtr: "\u22D9",
  precapprox: "\u2AB7",
  thickapprox: "\u2248",
  coloneq: ":\u2212",
  colonminus: ":-",
  gt: ">",
  preccurlyeq: "\u227C",
  thicksim: "\u223C",
  Coloneq: "\u2237\u2212",
  coloncolonminus: "\u2237\u2212",
  gtrapprox: "\u2A86",
  preceq: "\u2AAF",
  trianglelefteq: "\u22B4",
  coloneqq: "\u2254",
  colonequals: "\u2254",
  gtreqless: "\u22DB",
  precsim: "\u227E",
  Coloneqq: "\u2237=",
  coloncolonequals: "\u2237=",
  gtreqqless: "\u2A8C",
  propto: "\u221D",
  trianglerighteq: "\u22B5",
  colonsim: ":\u223C",
  gtrless: "\u2277",
  risingdotseq: "\u2253",
  varpropto: "\u221D",
  Colonsim: "\u2237\u223C",
  coloncolonsim: "\u2237\u223C",
  gtrsim: "\u2273",
  shortmid: "\u2223",
  vartriangle: "\u25B3",
  cong: "\u2245",
  imageof: "\u22B7",
  shortparallel: "\u2225",
  vartriangleleft: "\u22B2",
  curlyeqprec: "\u22DE",
  in: "\u2208",
  isin: "\u2208",
  sim: "\u223C",
  vartriangleright: "\u22B3",
  curlyeqsucc: "\u22DF",
  Join: "\u22C8",
  simcolon: "\u223C:",
  vcentcolon: ":",
  ratio: ":",
  dashv: "\u22A3",
  le: "\u2264",
  simcoloncolon: "\u223C\u2237",
  vdash: "\u22A2",
  dblcolon: "\u2237",
  coloncolon: "\u2237",
  leq: "\u2264",
  simeq: "\u2243",
  vDash: "\u22A8",
  doteq: "\u2250",
  leqq: "\u2266",
  smallfrown: "\u2322",
  Vdash: "\u22A9",
  Doteq: "\u2251",
  leqslant: "\u2A7D",
  smallsmile: "\u2323",
  Vvdash: "\u22AA",
  gnapprox: "\u2A8A",
  ngeqslant: "\u2271",
  nsubseteq: "\u2288",
  precneqq: "\u2AB5",
  gneq: "\u2A88",
  ngtr: "\u226F",
  nsubseteqq: "\u2288",
  precnsim: "\u22E8",
  gneqq: "\u2269",
  nleq: "\u2270",
  nsucc: "\u2281",
  subsetneq: "\u228A",
  gnsim: "\u22E7",
  nleqq: "\u2270",
  nsucceq: "\u22E1",
  subsetneqq: "\u2ACB",
  gvertneqq: "\u2269",
  nleqslant: "\u2270",
  nsupseteq: "\u2289",
  succnapprox: "\u2ABA",
  lnapprox: "\u2A89",
  nless: "\u226E",
  nsupseteqq: "\u2289",
  succneqq: "\u2AB6",
  lneq: "\u2A87",
  ntriangleleft: "\u22EA",
  succnsim: "\u22E9",
  lneqq: "\u2268",
  notin: "\u2209",
  neg: "\xAC",
  lnot: "\xAC",
  ntrianglelefteq: "\u22EC",
  supsetneq: "\u228B",
  lnsim: "\u22E6",
  notni: "\u220C",
  ntriangleright: "\u22EB",
  supsetneqq: "\u2ACC",
  lvertneqq: "\u2268",
  ntrianglerighteq: "\u22ED",
  varsubsetneq: "\u228A",
  ncong: "\u2246",
  nprec: "\u2280",
  nvdash: "\u22AC",
  varsubsetneqq: "\u2ACB",
  npreceq: "\u22E0",
  nvDash: "\u22AD",
  varsupsetneq: "\u228B",
  nshortmid: "\u2224",
  nVDash: "\u22AF",
  varsupsetneqq: "\u2ACC",
  ngeq: "\u2271",
  nshortparallel: "\u2226",
  nVdash: "\u22AE",
  ngeqq: "\u2271",
  nsim: "\u2241",
  precnapprox: "\u2AB9",
  circlearrowleft: "\u21BA",
  leftharpoonup: "\u21BC",
  rArr: "\u21D2",
  circlearrowright: "\u21BB",
  leftleftarrows: "\u21C7",
  rarr: "\u2192",
  curvearrowleft: "\u21B6",
  leftrightarrow: "\u2194",
  restriction: "\u21BE",
  curvearrowright: "\u21B7",
  Leftrightarrow: "\u21D4",
  rightarrow: "\u2192",
  Darr: "\u21D3",
  leftrightarrows: "\u21C6",
  Rightarrow: "\u21D2",
  dArr: "\u21D3",
  leftrightharpoons: "\u21CB",
  rightarrowtail: "\u21A3",
  darr: "\u2193",
  leftrightsquigarrow: "\u21AD",
  rightharpoondown: "\u21C1",
  dashleftarrow: "\u21E0",
  Lleftarrow: "\u21DA",
  rightharpoonup: "\u21C0",
  dashrightarrow: "\u21E2",
  longleftarrow: "\u27F5",
  rightleftarrows: "\u21C4",
  downarrow: "\u2193",
  Longleftarrow: "\u27F8",
  rightleftharpoons: "\u21CC",
  Downarrow: "\u21D3",
  longleftrightarrow: "\u27F7",
  rightrightarrows: "\u21C9",
  downdownarrows: "\u21CA",
  Longleftrightarrow: "\u27FA",
  rightsquigarrow: "\u21DD",
  downharpoonleft: "\u21C3",
  longmapsto: "\u27FC",
  Rrightarrow: "\u21DB",
  downharpoonright: "\u21C2",
  longrightarrow: "\u27F6",
  Rsh: "\u21B1",
  gets: "\u2190",
  Longrightarrow: "\u27F9",
  searrow: "\u2198",
  Harr: "\u21D4",
  looparrowleft: "\u21AB",
  swarrow: "\u2199",
  hArr: "\u21D4",
  looparrowright: "\u21AC",
  to: "\u2192",
  harr: "\u2194",
  Lrarr: "\u21D4",
  twoheadleftarrow: "\u219E",
  hookleftarrow: "\u21A9",
  lrArr: "\u21D4",
  twoheadrightarrow: "\u21A0",
  hookrightarrow: "\u21AA",
  lrarr: "\u2194",
  Uarr: "\u21D1",
  iff: "\u27FA",
  Lsh: "\u21B0",
  uArr: "\u21D1",
  impliedby: "\u27F8",
  mapsto: "\u21A6",
  uarr: "\u2191",
  implies: "\u27F9",
  nearrow: "\u2197",
  uparrow: "\u2191",
  Larr: "\u21D0",
  nleftarrow: "\u219A",
  Uparrow: "\u21D1",
  lArr: "\u21D0",
  nLeftarrow: "\u21CD",
  updownarrow: "\u2195",
  larr: "\u2190",
  nleftrightarrow: "\u21AE",
  Updownarrow: "\u21D5",
  leadsto: "\u21DD",
  nLeftrightarrow: "\u21CE",
  upharpoonleft: "\u21BF",
  leftarrow: "\u2190",
  nrightarrow: "\u219B",
  upharpoonright: "\u21BE",
  Leftarrow: "\u21D0",
  nRightarrow: "\u21CF",
  upuparrows: "\u21C8",
  leftarrowtail: "\u21A2",
  nwarrow: "\u2196",
  leftharpoondown: "\u21BD",
  Rarr: "\u21D2",
  pm: "\xB1",
  plusmn: "\xB1",
  times: "\xD7",
  ltimes: "\u22C9",
  rtimes: "\u22CA",
  div: "\xF7",
  aleph: "\u2135",
  alef: "\u2135",
  alefsym: "\u2135",
  ell: "\u2113",
  wp: "\u2118",
  weierp: "\u2118",
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
  _: "_",
  "%": "%",
  "\\": "\n",
  newline: "\n",
  surd: "\u221A",
  checkmark: "\u2713",
  top: "\u22A4",
  bot: "\u22A5",
  mho: "\u2127",
  star: "\u22C6",
  bigstar: "\u2605",
  Game: "\u2141",
  because: "\u2235",
  suchthat: "\u2234"
};
var theoremEnvExtensions = {
  proposition: unicode_table_default.render_if_exists("Proposition", "textbf"),
  lemma: unicode_table_default.render_if_exists("Lemma", "textbf"),
  theorem: unicode_table_default.render_if_exists("Theorem", "textbf"),
  corollary: unicode_table_default.render_if_exists("Corollary", "textbf"),
  definition: unicode_table_default.render_if_exists("Definition", "textbf"),
  remark: unicode_table_default.render_if_exists("Remark", "textbf"),
  hypothesis: unicode_table_default.render_if_exists("Hypothesis", "textbf"),
  conjecture: unicode_table_default.render_if_exists("Conjecture", "textbf"),
  axiom: unicode_table_default.render_if_exists("Axiom", "textbf"),
  example: unicode_table_default.render_if_exists("Example", "textbf"),
  proof: unicode_table_default.render_if_exists("proof", "textit")
};
var texLikeExtensions = {
  KaTeX: "K\u1D2CT\u1D07X",
  UniTeX: "U\u207F\u1D62T\u1D07X",
  Agda: "\uD835\uDC34gda",
  Lean: "L\u2203\u2200N"
};
var combinatorialExtensions = {
  sumtop: "\u23B2",
  sumbottom: "\u23B3",
  lbraceuend: "\u23A7",
  lbracemid: "\u23A8",
  lbracelend: "\u23A9"
};
var createFixed = (options) => {
  const fixed = stableFixed;
  options.useTheoremEnvExtensions && Object.assign(fixed, theoremEnvExtensions);
  options.useTexLikeExtensions && Object.assign(fixed, texLikeExtensions);
  options.useCombinatorialExtensions && Object.assign(fixed, combinatorialExtensions);
  return fixed;
};
var Fixed = createFixed({
  useTheoremEnvExtensions: true,
  useTexLikeExtensions: true,
  useCombinatorialExtensions: true
});
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
operatorNames.forEach((x) => Fixed[x] = x);
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
greeks.forEach((x, i) => Fixed[x] = unicode_table_default.greeks[i]);
Fixed.epsilon = "\u03F5";
unicode_table_default.supscripts[Fixed.times] = unicode_table_default.supscripts.x;
unicode_table_default.subscripts[Fixed.in] = Fixed.smallin;
unicode_table_default.subscripts[Fixed.ni] = Fixed.smallni;
var fixed_default = Fixed;

// src/impl/unicode/unary.ts
var unchecked_accents = (unicode) => (x) => `${x}${unicode}`;
var Unary = {
  id: (x) => x,
  text: (x) => x,
  mathrm: (x) => x,
  sqrt: (x) => "\u221A" + proper_default.paren(x),
  cbrt: (x) => "\u221B" + proper_default.paren(x),
  furt: (x) => "\u221C" + proper_default.paren(x),
  grave: (x) => x + (unicode_table_default.isLetter(x) ? "\u0300" : "-grave"),
  "`": unchecked_accents("\u0300"),
  acute: (x) => x + (unicode_table_default.isLetter(x) ? "\u0301" : "-acute"),
  "\'": unchecked_accents("\u0301"),
  hat: (x) => x + (unicode_table_default.isLetter(x) ? "\u0302" : "-hat"),
  "^": unchecked_accents("\u0302"),
  tilde: (x) => x + (unicode_table_default.isLetter(x) ? "\u0303" : "-tilde"),
  "~": unchecked_accents("\u0303"),
  bar: (x) => x + (unicode_table_default.isLetter(x) ? "\u0304" : "-bar"),
  "=": unchecked_accents("\u0304"),
  overline: (x) => x + (unicode_table_default.isLetter(x) ? "\u0305" : "-underline"),
  breve: (x) => x + (unicode_table_default.isLetter(x) ? "\u0306" : "-breve"),
  u: unchecked_accents("\u0306"),
  ".": unchecked_accents("\u0307"),
  '"': unchecked_accents("\u0308"),
  r: unchecked_accents("\u030A"),
  H: unchecked_accents("\u030B"),
  v: unchecked_accents("\u030C"),
  not: unchecked_accents("\u0338"),
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
    this.display = this.data.join("\n");
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
var oversetEquationMap = {
  "?=": fixed_default.qeq,
  "m=": fixed_default.meq,
  "def=": fixed_default.defeq,
  [fixed_default["star"] + "="]: fixed_default["stareq"],
  [fixed_default["Delta"] + "="]: fixed_default["deltaeq"]
};
var Binary = {
  frac: (x, y) => `${proper_default.paren(x)}/${proper_default.paren(y)}`,
  overset: (x, y) => oversetEquationMap[`${x}${y}`] || `\\overset{${x}}{${y}}`,
  binom: (n, k) => `(${n} ${k})`,
  alias: (a, x) => (fixed_default[a] = x, "")
};
var BinaryBlock = {
  frac: block_default.frac,
  overset: (x, y) => block_default.of(Binary.overset(x.display, y.display))
};
var BinaryInfix = {
  choose: (n, k) => Binary.binom(n, k)
};
Binary["cfrac"] = Binary.frac;
Binary["dfrac"] = Binary.frac;
Binary["tfrac"] = Binary.frac;
Binary["dbinom"] = Binary.binom;
Binary["tbinom"] = Binary.binom;
BinaryBlock["cfrac"] = BinaryBlock.frac;
BinaryBlock["dfrac"] = BinaryBlock.frac;
BinaryBlock["tfrac"] = BinaryBlock.frac;
var binary_default = Binary;

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
  constructor(parse2) {
    this.parse = parse2;
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
  fixed: fixed2 = {},
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
  typefaceHandler
}) => {
  const single = digit.or(letter).or(valuesymbol).or(of(() => fixed_macro));
  const value = loose(single.or(brace_wrap(of(() => text))));
  const optional = bracket_wrap(value);
  const symbol_macros = includes(...'|,>:;!()[]{}_%\\`^~=."\'');
  const macro_name = letters.or(symbol_macros);
  const macro_head = backslash.move(macro_name);
  const fixed_macro = macro_head.assume((x) => (x in fixed2)).map((s) => fixed2[s]);
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
  const comment = character("%").skip(token((x) => x != "\n").asterisk()).skip(character("\n")).map(() => "");
  const typeface2 = macro_head.assume((x) => unaryTypefaceNames.includes(x)).follow(value).map(([name, arg1]) => unary[name](arg1));
  const inline_elem = literals.or(sup_or_sub).or(environ).or(unary_macro).or(binary_macro).or(value);
  const italic_render = (s) => typefaceHandler("mathit", s);
  const inline_cluster = typeface2.or(inline_elem.map(italic_render)).plus();
  const dollar = character("$");
  const inline_math = dollar.move(inline_cluster).skip(dollar);
  const block_infix = token((x) => "+-*/<>~".includes(x)).or(macro_head.assume((x) => fixedInfixes.includes(x)).map((x) => fixed2[x])).map((s) => createBlock(` ${s} `));
  const block_value = loose(single.map(createBlock).or(brace_wrap(of(() => block_cluster))));
  const block_binary_macro = macro_head.assume((x) => !!binaryBlock[x]).follow2(block_value, block_value).map((xs) => binaryBlock[xs[0][0]](xs[0][1], xs[1]));
  const block_elem = loose(block_infix).or(block_value).or(sup_or_sub.map(createBlock)).or(fixed_macro.map(createBlock)).or(unary_macro.map(createBlock)).or(block_binary_macro).or(token((x) => !solid(x)).some().map((_) => emptyBlock));
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
  const translate = (s) => ((x) => x.type != "error" ? x.res : "")(text.parse(s.toIterator()));
  return translate;
};

// src/impl/unicode/environment.ts
var Environment = {
  matrix: (s) => separateMatrix(s, " ", " ", "; "),
  smallmatrix: (s) => separateMatrix(s, " ", " ", "; "),
  bmatrix: (s) => regularMatrix(s, "[", "]"),
  pmatrix: (s) => regularMatrix(s, "(", ")"),
  vmatrix: (s) => separateMatrix(s, "|", "|", "; "),
  Bmatrix: (s) => regularMatrix(s, "{", "}"),
  Vmatrix: (s) => separateMatrix(s, "||", "||", "; "),
  proposition: (s) => theorem_style("proposition", s),
  lemma: (s) => theorem_style("lemma", s),
  theorem: (s) => theorem_style("theorem", s),
  corollary: (s) => theorem_style("corollary", s),
  definition: (s) => theorem_style("definition", s),
  remark: (s) => theorem_style("remark", s),
  hypothesis: (s) => theorem_style("hypothesis", s),
  conjecture: (s) => theorem_style("conjecture", s),
  axiom: (s) => theorem_style("axiom", s),
  example: (s) => theorem_style("example", s),
  proof: (s) => theorem_style("proof", s)
};
var doubleBackslash = "\\\\";
var matrixM = (s) => s.replace(/\s/g, "").replace(/&/g, " ");
var regularMatrix = function(matrix, leftSymbol, rightSymbol, leftGlobalSymbol = leftSymbol, rightGlobalSymbol = rightSymbol) {
  const xs = matrix.split(doubleBackslash);
  const s = "".concat(...xs.map((s2) => leftSymbol + matrixM(s2) + rightSymbol));
  return xs.length > 1 ? leftGlobalSymbol + s + rightGlobalSymbol : s;
};
var separateMatrix = function(matrix, leftGlobalSymbol, rightGlobalSymbol, separator) {
  const xs = matrix.split(doubleBackslash);
  return leftGlobalSymbol + xs.map(matrixM).join(separator) + rightGlobalSymbol;
};
var polymerize_tex = function(s) {
  let result = s.trim().replace(/ *\r\n *| *\n *| (?= )/g, "").replace(/ *(,|\.) */g, "$1 ");
  return result;
};
var regexpDoubleLine = /\r\n\r\n|\n\n/;
var theorem_style = function(type, content) {
  let title = fixed_default[type] + ". ";
  return title + content.split(regexpDoubleLine).map(polymerize_tex).join("\n");
};
var environment_default = Environment;

// src/impl/unicode.ts
var translate = createTranslator({
  fixed: fixed_default,
  fixedInfixes: FixedInfixes,
  unary: unary_default,
  unaryOptional: UnaryOptional,
  unaryTypefaceNames: UnaryTypefaceNames,
  binary: binary_default,
  binaryInfix: BinaryInfix,
  binaryBlock: BinaryBlock,
  environment: environment_default,
  emptyBlock: block_default.empty,
  createBlock: block_default.of,
  concatBlock: (a, b) => a.append(b),
  displayBlock: (a) => a.display,
  subscriptHandler: unicode_table_default.subrender,
  supscriptHandler: unicode_table_default.suprender,
  typefaceHandler: unicode_table_default.render_if_exists
});

// unitex.ts
var UniTeX = {
  parse: translate,
  fixed: fixed_default,
  unary: unary_default,
  binary: binary_default
};
export {
  UniTeX
};
