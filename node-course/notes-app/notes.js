const fs = require('fs')

const getNotes = () => {
    return 'Your notes...'
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (duplicateNote === undefined) {
        // No duplicates found
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)    
        console.log('Note added!')
    } else {
        console.log('Note title taken!')
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const filteredNotes = notes.filter((note) => note.title != title)

    if(notes.length != filteredNotes.length) {
        saveNotes(filteredNotes)
        console.log('Note removed!')    
    } else {
        console.log('Note not found')
    }
}

const listNotes = () => {
    console.log('Your notes')
    const notes = loadNotes()

    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const matchingNote = notes.find((note) => note.title === title)

    if (matchingNote) {
        console.log(matchingNote.title)
        console.log(matchingNote.body)
    } else {
        console.log('Note not found')
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}

