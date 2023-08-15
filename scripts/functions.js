const path = require('path');
const { PARTICIPANT_INITIALS, CHAPTERS } = require('./constants');
const { mkdirSync, writeFileSync } = require('fs');

let dir = __dirname.split('/');
dir.pop();
dir = path.join(dir.join('/'));

const validateChapter = (chapterName) => {
  return CHAPTERS.includes(chapterName);
};

/**
 * @param {string} directoryName
 */
const createDirectory = (directoryName) => {
  try {
    mkdirSync(directoryName);

    console.log(`create directory ${directoryName}`);
  } catch (e) {
    console.error(`already exist directory ${directoryName}`);
    console.error(e);

    throw new Error(e);
  }
};

/**
 * @param {string} chapterName
 */
const createParticipantsFile = (chapterName) => {
  try {
    const files = PARTICIPANT_INITIALS.map((participantInitial) => {
      return path.join(dir, chapterName, `${participantInitial}.md`);
    });

    files.forEach((file) => {
      writeFileSync(file, `# ${chapterName.replace('-', ' ')}`);
    });

    console.log(`create files ${files.join('\n')}`);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  validateChapter,
  createDirectory,
  createParticipantsFile,
};
