export function addEntity(entity, api) {
    addComponent(entity, api.component);
    makeTag(entity, api.TagManager);
    makePath(entity, api.PathManager);
}

function addComponent(entity, component) {
    makeSchema(entity, component.SchemaManager);

    makeRequest(entity.name, component.RequestManager)

    makeShowResponse(entity.name, component.ResponseManager)

    makeIndexResponse(entity.name, component.ResponseManager)
}

export function makeSchema(entity, manager) {
    const found = manager.find(entity.name);
    if (found) {
        throw Error(`Schema ${entity.name} already exists!`)
    }
    const schema = manager.make(entity.name);
    manager.add(schema);

    schema.hasEntity = true;
    schema.entity = entity;
    schema.type = 'object';
}

function makeRequest(schema, manager) {
    const request = manager.make(schema);
    manager.add(request);

    const mt = makeMediaType(request.MediaTypeManager);
    mt.schema.type = 'reference';
    mt.schema.reference.name = schema;
}

function makeIndexResponse(schema, manager) {
    const index = manager.make(`${schema}Index`);
    manager.add(index);
    index.description = 'OK'

    const mt = makeMediaType(index.MediaTypeManager);
    mt.schema.type = 'composition';

    makeReference('page', 'Pagination', mt.schema.SchemaManager)

    const data = makeResponseData(mt.schema.SchemaManager)
    const array = data.SchemaManager.make('data')
    data.SchemaManager.add(array)
    array.type = 'array'
    array.reference.name = schema
}

function makeShowResponse(schema, manager) {
    const show = manager.make(schema);
    manager.add(show);
    show.description = 'OK'

    const mt = makeMediaType(show.MediaTypeManager);
    mt.schema.type = 'composition';

    makeReference('ok', 'Response', mt.schema.SchemaManager)

    const data = makeResponseData(mt.schema.SchemaManager)
    makeReference('data', schema, data.SchemaManager)
}

function makeReference(name, schema, manager) {
    const item = manager.make(name)
    manager.add(item)

    item.type = 'reference';
    item.reference.name = schema;
    return item
}

function makeResponseData(manager) {
    const data = manager.make('data')
    manager.add(data)
    data.type = 'object';
    return data
}

function makeMediaType(manager) {
    const json = manager.make('application/json');
    manager.add(json);
    return json
}

function makeTag(entity, manager) {
    const tag = manager.make(entity.name);
    manager.add(tag);
}

function makePath(entity, manager) {
    const path = manager.make(`/${entity.snakeCase}`);
    manager.add(path);

    makeIndex(path, entity.name);
    makePost(path, entity.name);

    const ppp = manager.make(`/${entity.snakeCase}/{id}`);
    manager.add(ppp);

    makeShow(ppp, entity.name);
    makePatch(ppp, entity.name);
    makeDelete(ppp, entity.name);
}

function makeOperation(method, schema, manager) {
    const operation = manager.make(method);
    manager.add(operation);

    const tag = operation.TagManager.make(schema)
    operation.TagManager.add(tag)

    return operation
}

function makeIndex(path, schema) {
    const method = makeOperation('get', schema, path.OperationManager);

    const page = method.ParameterManager.make('page');
    method.ParameterManager.add(page);

    const limit = method.ParameterManager.make('limit');
    method.ParameterManager.add(limit);

    makeStatus(`${schema}Index`, '200', method);
}

function makePost(path, schema) {
    const method = makeOperation('post', schema, path.OperationManager);
    method.requestBody.name = schema;

    makeStatus(schema, '200', method);
    makeStatus('Error422', '422', method);
}

function makeShow(path, schema) {
    const method = makeOperation('get', schema, path.OperationManager);

    const parameter = method.ParameterManager.make('id');
    method.ParameterManager.add(parameter);

    makeStatus(schema, '200', method);
    makeStatus('Error404', '404', method);
}

function makePatch(path, schema) {
    const method = makeOperation('patch', schema, path.OperationManager);
    method.requestBody.name = schema;

    const parameter = method.ParameterManager.make('id');
    method.ParameterManager.add(parameter);

    makeStatus(schema, '200', method);
    makeStatus('Error404', '404', method);
    makeStatus('Error422', '422', method);
}

function makeDelete(path, schema) {
    const method = makeOperation('delete', schema, path.OperationManager);

    const parameter = method.ParameterManager.make('id');
    method.ParameterManager.add(parameter);

    makeStatus('OK', '200', method);
    makeStatus('Error404', '404', method);
}

function makeStatus(schema, code, method) {
    const status = method.StatusManager.make(code);
    method.StatusManager.add(status);
    status.data.name = schema;
}
