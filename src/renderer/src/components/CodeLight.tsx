import "./styles/code_light.css"
import {ReactNode} from "react";


interface Props {
  text: string;
}


const regex = /[\s\n\r\t]|<\/?.+?>|#+\s|>+\s|`+|[\-+*]\s|\d+\.\s|\||[-:]+|!?\[.+]\(.+\)|./gm

const h = /#+\s/gm
const quote = />+\s/gm
const code = /`/gm
const pre = /`+/gm
const ul = /[\-+*]+\s/gm
const ol = /\d+\.\s/gm
const tab = /\|/gm
const hr = /[-:]+/gm
const link = /\[.+]\(.+\)/gm
const img = /!\[.+]\(.+\)/gm

const tag = /<\/?.+?>/gm

const enum Typ {
  KW,
  P
}

const colors = [
  {
    typ: Typ.KW,
    val: `#FF8800`
  },
  {
    typ: Typ.P,
    val: `#D9D9D9`
  },

]


const kw = /(#+\s|>+\s|[\-:]+|\||[\-+*]+\s|\d+\.\s)/gm

interface Lexeme {
  typ: Typ;
  val: string;
}

export default function CodeLight(props: Props) {
  console.log("_________________________________-")
  const text = props.text;

  const matches = [...text.matchAll(regex)];

  const tokens: string[] = []
  for (const i of matches) {
    tokens.push(i[0]);
  }
  const lexemes: Lexeme[] = []
  console.log(`tokens ${tokens}`)
  for (const token of tokens) {
    console.log(`token ${token} ${kw.test(token)}`)
    if (kw.test(token)) {
      console.log("kw")
      lexemes.push({
        typ: Typ.KW,
        val: token,
      })

    } else {
      console.log("other")
      lexemes.push({
        typ: Typ.P,
        val: token
      })

    }
  }
  const r =
    lexemes.map(el=>{
      return {...el,
        color: colors.find(el1=>el1.typ==el.typ)?.val??"white"
      }
    })
  console.log("lexemes")
  for (const i of r){
    console.log(JSON.stringify(i))
  }
  return (
    <>
      {lexemes.map((el, key) => {
        if (el.val !== "\n") {
          return <span style={{
            color: colors.find(el1 => el1.typ == el.typ)?.val ?? "white"
          }} key={key}>{el.val}</span>
        } else {
          return <br key={key}/>
        }
      })}
    </>
  )

}
