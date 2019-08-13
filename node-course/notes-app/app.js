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
    handler: function (argv) {
        noteUtils.addNote(argv.title, argv.body)
    }
})

// Remove
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removing a note!')
    }
})

// List
yargs.command({
    command: 'list',
    describe: 'Lists the notes',
    handler: function () {
        console.log('Listing the notes!')
    }
})

// Read
yargs.command({
    command: 'read',
    describe: 'Read a certain note',
    handler: function () {
        console.log('Reading a note!')
    }
})

yargs.parse()