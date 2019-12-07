import Entity from '../../../entity'

import preset from './preset'

export default Entity

export function addUser(project) {
    const entity = project.EntityManager.make('user')
    project.EntityManager.add(entity)
    return entity
}

export function loadProject(json) {
    const project = new Entity.Project(json.name)
    preset(project)
    project.load(json)
    return project
}

export function makeProject(name) {
    const project = new Entity.Project(name)
    preset(project)
    return project
}
