#!/usr/bin/node

//#region compiler

const string_generators = []
const char_map = {}

const bool = b => {
    if (b) return "!![]"
    else return "![]"
}
const int = x => {
    if (x == 0) return "+[]"
    if (x == 1) return "+!![]"
    if (x < 10) return "!+[]" + "+!+[]".repeat(x-1)
    return `+(${str(x.toString())})`
}
const char = c => {
    if (!(c in char_map)) char_map[c] = new_char(c)
    return char_map[c]
}
const new_char = c => {
    let options = []
    for (g of string_generators){
        let txt = eval(g)
        if (txt.includes(c)) options.push(`(${g})[${int(txt.indexOf(c))}]`)
    }
    if (options.length == 0) options.push(
        `${fromCharCode}(${int(c.charCodeAt(0))})`
    )
    options.sort((a,b)=>a.length-b.length)
    return options[0]
}
const str = s => {
    let out = []
    for (let c of s) out.push(`(${char(c)})`)
    return out.join("+")
}
const compile = code => {
    return `${func_ctor}(${str(code)})()`
}

//#region set up string_generators

string_generators.push (
    "[][[]]+[]",
    "[]+{}",
    `(${bool(true)})+[]`,
    `(${bool(false)})+[]`,
    "+[![]]+[]",
)
const numeric = "0123456789"
for (c of numeric) string_generators.push(`(${int(numeric.indexOf(c))})+[]`)
string_generators.push(
    `+(${str("1e309")})+[]`,
    `+(${str("11e100")})+[]`,
    `[][${str("find")}]+[]`,
    `([]+[])[${str("fontcolor")}]()`,
)
const ctor = `[${str("constructor")}]`
const str_ctor = `([]+[])${ctor}`
const func_ctor = `([][${str("find")}])${ctor}`
string_generators.push(
    `+(${str("0.0000001")})+[]`,
    `(${int(0)})${ctor}+[]`,
    `(${bool(false)})${ctor}+[]`,
    `[]${ctor}+[]`,
    `${str_ctor}+[]`,
    `${func_ctor}+[]`,
)
const lower = "abcdefghijklmnopqrstuvwxyz"
for (c of lower) string_generators.push(`(${int(lower.indexOf(c)+10)})[${str("toString")}](${int(lower.indexOf(c)+11)})`)
for (esc of "[]<>") string_generators.push(`${func_ctor}(${str("return escape")})()(${char(esc)})`)
const fromCharCode = `${str_ctor}[${str("fromCharCode")}]`

//#endregion
//#endregion

console.log(eval(compile("console.log(\"Hello, world!\"); return 0;")))
