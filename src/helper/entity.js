import Entity from '../../../entity';

import * as api from './api';

export default Entity;

export function addUser(project) {
    const entity = project.EntityManager.make('user');
    project.EntityManager.add(entity);
    return entity;
}

export function loadProject(json) {
    const project = new Entity.Project(json.name);
    if (!json.api) {
        api.preset(project);
    }
    project.load(json);
    if (json.api) {
        setEntity(project)
    }
    return project;
}

export function makeProject(name) {
    const project = new Entity.Project(name);
    api.preset(project);
    return project;
}


function setEntity(project) {
    project.api.component.SchemaManager.list.forEach(schema => {
        if (schema.hasEntity) {
            const found = project.EntityManager.find(schema.name)
            if (found) {
                schema.entity = found
            }
        }
    });
}
