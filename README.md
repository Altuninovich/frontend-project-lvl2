# frontend-project-lvl2
[![Node.js CI](https://github.com/Altuninovich/frontend-project-lvl2/workflows/Node.js%20CI/badge.svg?branch=master&event=push)](https://github.com/Altuninovich/frontend-project-lvl2/actions)
<a href="https://codeclimate.com/github/Altuninovich/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/468693a6ff577fc31a60/maintainability" /></a>
<a href="https://codeclimate.com/github/Altuninovich/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/468693a6ff577fc31a60/test_coverage" /></a>

# Учебный проект

## Проект "Вычислитель отличий" 
## Project "Generate Difference"

Утилита для поиска отличий в конфигурационных файлах.

## Возможности утилиты:

* Поддержка форматов: json, yml, ini;
* Генерация отчета в виде plain text, json, stylish(tree);

## SETUP

```sh
$ make install
```

## RUN TESTS

```sh
$ make test
```
## Usage
Use `gendiff --help` to show help page
```
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:

  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           output usage information
```

## Examples

```
gendiff before.json after.json

{
  common: {
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
       key: value
    }
    setting6: {
      key: value
    + ops: vops
    }
  + follow: false
  + setting4: blah blah
  + setting5: {
       key5: value5
    }
  }
  group1: {
  - baz: bas
  + baz: bars
    foo: bar
  - nest: {
       key: value
    }
  + nest: str
  }
- group2: {
     abc: 12345
  }
+ group3: {
     fee: 100500
  }
}

```

```
gendiff before.json after.json --format plain

Property 'common.setting2' was removed
Property 'common.setting3' was changed from 'true' to '[complex value]'
Property 'common.setting6.ops' was added with value: vops
Property 'common.follow' was added with value: false
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was changed from 'bas' to 'bars'
Property 'group1.nest' was changed from '[complex value]' to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

### Options

Gendiff supports different output formats:
* nested (default)
* plain
* JSON

Use -f flag to set required output format.
`-f, --format [type]  output format`

### Output formats description

#### Stylish
Stylish output format is a hierarchical tree. Affected key:value pairs are marked by '+' or '-' means option was added or deleted from resulting file. If value was modified it represents two rows with '+' new value and '-' old value. Unmodified pairs displays as is.
## Пример использования

##Поиск различий между двумя плоскими json-файлами
 https://asciinema.org/a/Ioe90C9q7z71u5WfD1U5e2SJu
 
##Поиск различий между двумя плоскими yml-файлами
 https://asciinema.org/a/FgdmnTRQGyYZgHuJCZf7o4xnS
 
##Поиск различий между двумя плоскими ini-файлами
 https://asciinema.org/a/zix9EDZG0EMOAfnuC6e4zXtyz
 
##Генерация отчета stylish(tree) 
 https://asciinema.org/a/0EoOR6IkJgzguhYWPsKoGi4wJ
 
##Генерация отчета Plain text 
 https://asciinema.org/a/sfumk3tcKUxITDztLyPgwcp2s
 
##Генерация отчета json
 https://asciinema.org/a/MUJ1vyUTkDsJtLv5okaVWB1lY