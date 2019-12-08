import nunjucks from 'nunjucks'
import Template from './template'

export default function render(project, entity, file) {
    const data = {
        project,
        entity,
        file,
        data: process(project, entity, file),
        model: entity.FileManager.findByType('Model'),
        request: entity.FileManager.findByType('Request'),
    }
    const template = getTemplate(file)
    const result = nunjucks.renderString(template, data)
    // console.log(result)
    return result
}

function getTemplate(file) {
    if (file.FileType.template) {
        return file.FileType.template
    }
    return Template[file.FileType.templateName]
}

function process(project, entity, file) {
    const data = {}
    if (file.FileType.script) {
        const script = new Function('return ' + file.FileType.script)()
        script(project, entity, file, data)
    }
    return data
}
