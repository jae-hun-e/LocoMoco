module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 100],
    'type-case': [2, 'always', 'lowerCase'], // type 소문자로만
    'type-empty': [2, 'never'], // type 생략 불가
    'type-enum': [
      // 아래의 type 만 사용 가능
      2,
      'always',
      ['init', 'feat', 'fix', 'refactor', 'style', 'chore', 'remove', 'docs', 'modify', 'merge'],
    ],
    'subject-case': [0],
    'subject-empty': [2, 'never'], // subject 생략 불가
  },
};
