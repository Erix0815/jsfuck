class code {
    constructor(txt = ""){this.text = txt}
    static compile(txt){return code.func_ctor().call(code.str(txt)).call()}
    eval(){return eval(this.text)}
    //#region primitives
    static arr(value = new code()){return new code(`[${value.text}]`)}
    not(){return new code(`!${this.text}`)}
    abs(){return new code(`+${this.text}`)}
    seal(){return new code(`(${this.text})`)}
    append(next){return new code(`${this.text}${next.text}`)}
    //#endregion
    //#region composites
    static bool(b = false){
        if (b) return code.num(0).not()  
        else return code.arr().not()
    }
    static num(x = 0){
        if (x == 0) return code.arr().abs()
        if (x == 1) return code.bool(true).abs()
        if (x < 10) return code.sum(Array(x).fill(code.bool(true)))
        return code.arr(code.sum(x.toString().split("").map(e=>code.arr(code.num(Number(e)))))).abs()
    }
    add(addend){return this.append(addend.abs())}
    static sum(codes){
        let out = codes[0]
        for (let c of codes.slice(1)){
            out = out.add(c)
        }
        return out
    }
    call(arg = new code()){return this.append(arg.seal())}
    toStr(){return this.add(code.arr())}
    member(identifier = new code()){return this.append(code.arr(identifier))}
    //#endregion
    //#region encoded-code
    static encoder
    static str(txt = ""){
        if (code.encoder == undefined) {
            code.encoder = new encoder()
            code.encoder.init()
        }
        if (txt == "") return code.arr().add(code.arr())
        return code.sum(txt.split("").map(c=>this.encoder.char(c).seal()))
    }
    //#endregion
    //#region encoder-dependend code
    ctor(){return this.member(code.str("constructor"))}
    static func_ctor(){return code.arr().member(code.str("find")).ctor()}
    //#endregion
}

class encoder {
    char(c){
        if (!(c in this.charmap)) this.charmap[c] = this.new_char(c)
        return this.charmap[c]
    }
    new_char(c){
        let options = []
        for (let g of this.generators){
            let txt = g.eval()
            if (txt.includes(c)) options.push(
                g.seal().member(code.num(txt.indexOf(c)))
            )
        }
        if (options.length == 0) options.push(
            code.str().seal().ctor().member(code.str("fromCharCode")).call(code.num(c.charCodeAt(0)))
        )
        options.sort((a,b)=>a.text.length-b.text.length)
        return options[0]
    }
    constructor(){
        this.charmap = {}
        this.generators = []
    }
    init(){
        this.generators.push(
            code.arr().member(code.arr()).toStr(), //undefi
            code.bool(true).seal().toStr(), //tru
            code.bool(false).seal().toStr(), //als
            code.arr(code.bool(false)).abs().toStr(), //N

        )
        const digits = "0123456789"
        for (let c of digits) this.generators.push(
            code.num(digits.indexOf(c)).seal().toStr()
        )
        this.generators.push(
            code.str("1e309").seal().abs().toStr(), //Iy
            code.str("11e100").seal().abs().toStr(), //.+
            code.arr().member(code.str("find")).toStr(), //cov (){}[]
        )
        this.generators.push(
            code.str().seal().member(code.str("fontcolor")).call()
        )
        this.generators.push(
            code.str("0.0000001").seal().abs().toStr(), //-
            code.bool().seal().ctor().toStr(), //B
            code.num().seal().ctor().toStr(), //mb
            code.str().seal().ctor().toStr(), //Sg
            code.arr().ctor().toStr(), //A
            code.func_ctor().toStr(), //F
        )
        const lower = "abcdefghijklmnopqrstuvwxyz"
        for (let c of lower) this.generators.push(
            code.num(lower.indexOf(c)+10).seal().member(code.str("toString")).call(code.num(lower.indexOf(c)+11))
        )
        for (let c of "[]<>") this.generators.push(
            code.func_ctor().call(code.str("return escape")).call().call(code.str(c))
        )
    }
}


let compiled = code.compile(
    `console.log("Hello, world!"); return 0;`
)
console.log(`Code: ${compiled.text}`)
console.log("Output:")
let result = eval(compiled.text)
console.log(`Return: ${result}`)
