// export interface IType{
//     type: "Noun" | "Verb" | "Adjective" | "Adverb"
// }
export interface IWord {
    type: "Noun" | "Verb" | "Adjective" | "Adverb"
    word: string
    words: IWordDefinition[]
}

export interface IWordDefinition {
    type: "Noun" | "Verb" | "Adjective" | "Adverb"
    word: string
    meaning: string
}