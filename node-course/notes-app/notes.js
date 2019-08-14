const fs = require('fs')

const getNotes = function() {
    return 'Your notes...'
}

const addNote = function(title, body) {
    const notes = loadNotes()

    // Loop through notes array and check if we have
    // any with the same title.
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title
    })

    if (duplicateNotes.length === 0) {
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

const saveNotes = function(notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function() {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const removeNote = function(title) {
    const notes = loadNotes()

    const filteredNotes = notes.filter(function (note) {
        return note.title != title
    })

    if(notes.length != filteredNotes.length) {
        saveNotes(filteredNotes)
        console.log('Note removed!')    
    } else {
        console.log('Note not found')
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}

