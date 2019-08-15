const chalk = require('chalk')
const yargs = require('yargs')
const noteUtils = require('./notes.js')

yargs.version('1.1.0')

// Add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note text',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        noteUtils.addNote(argv.title, argv.body)
    }
})

// Remove
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    buider: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        noteUtils.removeNote(argv.title)
    } 
})

// List
yargs.command({
    command: 'list',
    describe: 'Lists the notes',
    handler() {
        noteUtils.listNotes()
    } 
})

// Read
yargs.command({
    command: 'read',
    describe: 'Read a certain note',
    buider: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        noteUtils.readNote(argv.title)
    }
})

yargs.parse()