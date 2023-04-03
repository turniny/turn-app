/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'semi': ['warn', 'never'],           // 禁止尾部使用分号
    'no-extra-parens': 'warn',           // 禁止不必要的括号
    'no-func-assign': 'warn',            // 禁止对Function声明重新赋值
    'no-else-return': 'warn',            // 禁止if语句中return语句之后有else块
    'no-redeclare': 'warn',              // 禁止多次声明同一变量
    'no-return-await': 'warn',           // 禁用不必要的[return/await]
    'no-trailing-spaces': 'warn',        // 禁止一行结束后面不要有空格
    'no-delete-var': 'off',              // 允许出现delete变量的使用
    'no-shadow': 'off',                  // 允许变量声明与外层作用域的变量同名
    'dot-notation': 'warn',              // 要求尽可能地使用点号
    'eqeqeq': 'warn',                    // 要求使用 === 和 !==
    'curly': 'warn',                     // 要求所有控制语句使用一致的括号风格
    'space-before-blocks': 'warn',       // 要求在块之前使用一致的空格
    'space-in-parens': 'warn',           // 要求在圆括号内使用一致的空格
    'space-infix-ops': 'warn',           // 要求操作符周围有空格
    'space-unary-ops': 'warn',           // 要求在一元操作符前后使用一致的空格
    'switch-colon-spacing': 'warn',      // 要求在switch的冒号左右有空格
    'arrow-spacing': 'warn',             // 要求箭头函数的箭头前后使用一致的空格
  }
}
