const { Command } = require('commander');
const {
  createDirectory,
  createParticipantsFile,
  validateChapter,
} = require('./functions');
const { CHAPTERS } = require('./constants');

const program = new Command();

program.description(`모든 챕터의 md 파일을 생성합니다.`).parse();

const options = program.opts();
const chapterName = options.name;

CHAPTERS.forEach((chapter) => {
  createDirectory(chapter);
  createParticipantsFile(chapter);
});
