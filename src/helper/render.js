import nunjucks from 'nunjucks'

export default function render(project, entity, file) {
    const data = {
        project,
        entity,
        file,
        data: process(project, entity, file),
        model: entity.FileManager.findByType('Model'),
        request: entity.FileManager.findByType('Request'),
    }
    const template = project.TemplateManager.find(file.FileType.template)
    const result = nunjucks.renderString(template, data)
    // console.log(result)
    return result
}

function process(project, entity, file) {
    const data = {}
    if (file.FileType.script) {
        const script = new Function('return ' + file.FileType.script)()
        script(project, entity, file, data)
    }
    return data
}
