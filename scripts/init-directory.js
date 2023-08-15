const { Command } = require('commander');
const {
  createDirectory,
  createParticipantsFile,
  validateChapter,
} = require('./functions');

const program = new Command();

program
  .description(`챕터 네임을 기준으로 디렉토리 및 .md 파일을 생성합니다.`)
  .requiredOption('-n, --name <name>', 'chapter name')
  .parse();

const options = program.opts();
const chapterName = options.name;

if (!validateChapter(chapterName)) {
  console.error('유효하지 않은 챕터명입니다.');

  console.info(`${__dirname}/constants.js 파일의 CHAPTERS 를 확인해주세요.`);
}

try {
  console.log('--------------');
  createDirectory(chapterName);
} catch (error) {
  process.exit();
}

try {
  createParticipantsFile(chapterName);
} catch (error) {
  process.exit();
}
