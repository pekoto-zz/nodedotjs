const chalk = require('chalk')
const yargs = require('yargs')
const getNotes = require('./notes.js')

yargs.version('1.1.0')

// Add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    handler: function () {
        console.log('Adding a new note!')
    }
}).argv

// Remove
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    handler: function () {
        console.log('Removing a note!')
    }
}).argv

// List
yargs.command({
    command: 'list',
    describe: 'Lists the notes',
    handler: function () {
        console.log('Listing the notes!')
    }
}).argv

// Read
yargs.command({
    command: 'read',
    describe: 'Read a certain note',
    handler: function () {
        console.log('Reading a note!')
    }
}).argv

