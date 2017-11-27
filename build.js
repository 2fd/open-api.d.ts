const remark = require('remark');
const fs = require('fs');
const uppercamelcase = require('uppercamelcase');
const camelcase = require('camelcase');
const wordWarp = require('word-wrap');
const raw = fs.readFileSync('./src/3.0.0.md')

function getInterfaceName (toke) {
    return 'I' + uppercamelcase(getInnerText(toke))
}

function getCodeType(typeToke) {

    typeToke.children = typeToke.children.filter(c => !(c.type === 'text' && c.value.trim() === ''))

    if (!typeToke || !typeToke.children.length || typeToke.children.length === 0) {
        return null
    }

    switch (true) {
        case (
            typeToke.children.length === 1 &&
            typeToke.children[0].type === 'text' &&
            typeToke.children[0].value.trim() === 'Any'
        ):
            return 'any';

        case (
            typeToke.children.length === 1 &&
            typeToke.children[0].type === 'inlineCode'
        ):
            return typeToke.children[0].value;

        case (
            typeToke.children.length === 1 &&
            typeToke.children[0].type === 'linkReference' &&
            typeToke.children[0].children.length === 1
        ):
            return `Array<${getCodeType(typeToke.children[0])}>`;

        case (
            typeToke.children.length === 1 &&
            typeToke.children[0].type === 'link' &&
            typeToke.children[0].children.length === 1 &&
            typeToke.children[0].children[0].value === '{expression}'
        ):
            return 'RunTimeExpression';

        case (
            typeToke.children.length === 1 &&
            typeToke.children[0].type === 'link'
        ):
            return getInterfaceName(typeToke.children[0]);

        case (
            typeToke.children[0].type === 'text' &&
            typeToke.children[0].value === '[' &&
            typeToke.children[typeToke.children.length -1].value === ']'
        ):
            return `Array<${getCodeType({ children: typeToke.children.slice(1, -1)})}>`;

        case (
            typeToke.children[0].type === 'text' &&
            typeToke.children[0].value.slice(0,3) === 'Map'
        ):
            const mapKeyToken = typeToke.children[1].type === 'linkReference' ? 
                { children: [typeToke.children[1].children[0]] } :
                { children: [typeToke.children[1]] };

            const mapValueToken = typeToke.children[1].type === 'linkReference' ?
                { children: typeToke.children[1].children.slice(2) } :
                { children: typeToke.children.slice(2, -1) };

            if (
                mapValueToken.children[0].type === 'text' &&
                mapValueToken.children[0].value.trim() === ','
            ) {
                mapValueToken.children = mapValueToken.children.slice(1)
            } else if (
                mapValueToken.children[0].type === 'text' &&
                mapValueToken.children[0].value.trim()[0] === ','
            ) {
                mapValueToken.children[0].value =
                    mapValueToken.children[0].value.trim().slice(1).trim()
            }

            return `{ [name: ${getCodeType(mapKeyToken)}]: ${getCodeType(mapValueToken)} }`;
    
        default:
            const groupTokens = typeToke.children
                .reduce((result, currentToke) => {
                    if (currentToke.type === 'text' && currentToke.value.trim() === '|') {
                        result.push({ children: [] })
                    } else {
                        result[result.length -1].children.push(currentToke)
                    }
                    return result
                }, [{children: []}])

            if (groupTokens.length > 1) {
                return groupTokens.map(t => getCodeType(t))
                    .join(' | ')
            } else {
                console.log(typeToke)
                console.log(groupTokens[0].children)
                return null
            }
                
    }
    if (typeToke.children.length === 0) {
        return
    }
}

function getTableInfo(tableToke) {
    const fieldsName = tableToke.children[0].children.map(cell => camelcase(getInnerText(cell)))
    return tableToke.children.slice(1).map((row) => {
        return row.children.reduce((result, cell, i) => {
            switch (fieldsName[i]) {
                case 'description':
                    const description = getInnerText(cell);
                    result.isRequired = description.slice(0, '**REQUIRED**. '.length) === '**REQUIRED**. ';
                    result.description = result.isRequired ? description.slice('**REQUIRED**. '.length) : description;
                    break;
                    
                case 'type':
                    result.type = getCodeType(cell)
                    break;
                    
                case 'fieldPattern':
                    result.fieldPattern = camelcase(getInnerText(cell).replace(/\W+/g, '-'))
                    break;
            
                default:
                    result[fieldsName[i]] = getInnerText(cell)
                    break;
            }
            return result
        }, {})
    });
}

function getInnerText (token) {
    try {
        return (token.children || [token])
            .map(t => {
                switch (t.type) {
                    case 'text':
                        return t.value
                    case 'strong':
                        return `**${getInnerText(t)}**`;
                    case 'listItem':
                        return ` + ${getInnerText(t)}\n`;
                    case 'code':
                        return `\`\`\`${t.lang}\n${t.value.split('\n').map(l => '  ' + l).join('\n')}\n\`\`\``;
                    case 'link':
                        return `[${getInnerText(t)}](${t.url}${t.title ? ' ' + t.title : ''})`
                    case 'inlineCode':
                        return `\`${t.value}\``
                
                    default:
                        return t.children ? getInnerText(t) : '';
                }
            })
            .join('');
    } catch (err) {
        throw new Error(`Unexpected content for token ${JSON.stringify(token.type)}: ${err.message}`)
    }
}

const objects = [
    '/**',
    wordWarp(
        'Runtime expressions allow defining values based on information that will only be available within the HTTP message in an actual API call.\n' +
        'https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#runtime-expressions',
        { indent: ' * ', width: 80 }
    ),
    ' */',
    'export type RunTimeExpression = string;',
];

const standard = remark().parse(raw);

for (let i = 0; i < standard.children.length; i++){
    const token = standard.children[i];
    if (!(token.type === 'heading' && token.depth === 4)) {
        continue;
    }

    // get name
    const name = getInnerText(token);
    if (!name.endsWith('Object')) {
        continue;
    }

    const nameInterface = getInterfaceName(token)

    // get data
    let descriptions = [];
    let examples = [];
    let fixedFields = [];
    let patternedFields = [];
    let descriptionSection = true;
    let useExtension = false;
    let examplesSection = false;
    
    while (
        standard.children[i + 1] &&
        !(standard.children[i + 1].type === 'heading' && standard.children[i + 1].depth <= 4)
    ) {
        const nextSection = getInnerText(standard.children[i + 1]);
        switch (nextSection) {
            case 'Fixed Fields':
                // get fixed fields
                descriptionSection = false;
                const fixedFieldsTitleToken = standard.children[++i];
                fixedFields = getTableInfo(standard.children[++i]);
                break;
            
            case 'Patterned Fields':
                // get fields
                descriptionSection = false;
                const patternedFieldsTitleToken = standard.children[++i];
                patternedFields = getTableInfo(standard.children[++i]);
                break;
            
            case 'This object MAY be extended with [Specification Extensions](#specificationExtensions).':
                ++i;
                descriptionSection = false;
                useExtension = true;
                break;
            
            case name + ' Example:':
                ++i;
                descriptionSection = false;
                examplesSection = true;
                break;

            default:
                ++i
                if (standard.children[i].type === 'code') {
                    descriptionSection = false;
                    examplesSection = true;
                } 
                
                if (descriptionSection) {
                    descriptions.push(getInnerText(standard.children[i]))
                } else if (examplesSection) {
                    examples.push(getInnerText(standard.children[i]).replace('*/', '*\\/'))
                }
        }
    }
    
    const example = examples.length ? examples.join(`\n\n`) : null
    const description = descriptions.join('\n')

    if (patternedFields.length && useExtension) {
        patternedFields = patternedFields.map(patternedField => {
            patternedField.fieldPattern = patternedField.fieldPattern + 'AndExtension';
            patternedField.type = patternedField.type + ' | any';
            patternedField.description = [
                patternedField.description,
                'Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. Can have any valid JSON format value.'
            ].join('\n');
            return patternedField;
        });
    } else if (!patternedFields.length && useExtension) {
        patternedFields.push({
            fieldPattern: 'extension',
            type: 'any',
            isRequired: false,
            description: 'Allows extensions to the OpenAPI Schema. The field name MUST begin with `x-`, for example, `x-internal-id`. The value can be `null`, a primitive, an array or an object. Can have any valid JSON format value.'
        })
    }

    const object = [
        '',
        '/**',
        wordWarp(description, { indent: ' * ', width: 80 }),
        example ? ' * @example:\n' + example :  ' * ',
        ' */',
        `export interface ${nameInterface} {`,
        ...patternedFields.map(p => {
            return [
                '',
                '  /**',
                wordWarp(p.description, { indent: '   * ', width: 80 }),
                '   */',
                '  [' + p.fieldPattern + ': string]: ' + p.type + ';',
            ].join('\n');
        }),
        ...fixedFields.map(p => {
            return [
                '',
                '  /**',
                wordWarp(p.description, { indent: '   * ', width: 80 }),
                '   */',
                '  ' + p.fieldName + (p.isRequired ? '' : '?') + ': ' + p.type + ';',
            ].join('\n');
        }),
        '}'
    ].join('\n');

    objects.push(object);
}

const data = objects.join('\n') + '\n';
fs.writeFileSync('index.d.ts', data, 'utf8');
