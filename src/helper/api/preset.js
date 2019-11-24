export function preset(project) {
    const component = project.api.component;
    makeParameterList(component.ParameterManager);
    makeSchemaList(component.SchemaManager);
    makeResponseList(component.ResponseManager);
}

function makeParameterList(manager) {
    makeCookie(manager)
    makeHeader(manager)
    makeParameter('id', 'integer', manager);
    const page = makeParameter('page', 'integer', manager);
    page.required = false
    page.location = 'query'
    const limit = makeParameter('limit', 'integer', manager);
    limit.required = false
    limit.location = 'query'
}

function makeParameter(name, type, manager) {
    const parameter = manager.make(name);
    manager.add(parameter);

    parameter.schema.type = type;
    return parameter
}

function makeCookie(manager) {
    const cookie = manager.make('XSRF-TOKEN')
    manager.add(cookie)

    cookie.location = 'cookie'
    cookie.description = 'CSRF token for POST method'
}

function makeHeader(manager) {
    const header = manager.make('X-XSRF-TOKEN')
    manager.add(header)

    header.location = 'header'
    header.description = 'Required for every POST method!'
}

function makeSchemaList(manager) {
    const response = makeSchema('Response', 'object', manager);
    makeSchema('message', 'string', response.SchemaManager);

    const pagination = makeSchema('Pagination', 'object', manager);
    makeSchema('current_page', 'integer', pagination.SchemaManager);
    makeSchema('last_page', 'integer', pagination.SchemaManager);
    makeSchema('per_page', 'integer', pagination.SchemaManager);
    makeSchema('total', 'integer', pagination.SchemaManager);
    makeSchema('path', 'string', pagination.SchemaManager);
    makeSchema('first_page_url', 'string', pagination.SchemaManager);
    makeSchema('last_page_url', 'string', pagination.SchemaManager);
    makeSchema('prev_page_url', 'string', pagination.SchemaManager);
    makeSchema('next_page_url', 'string', pagination.SchemaManager);
}

function makeSchema(name, type, manager) {
    const schema = manager.make(name);
    schema.type = type;
    manager.add(schema);
    return schema;
}

function makeResponseList(manager) {
    makeResponse('OK', 'OK', manager);
    makeResponse('Error', 'Bad Request', manager);
    makeResponse('Error401', 'Unauthorized', manager);
    makeResponse('Error403', 'Forbidden', manager);
    makeResponse('Error404', 'Not Found', manager);
    makeResponse('Error422', 'Unprocessable Entity', manager);
    makeResponse('Error429', 'Too Many Requests', manager);
}

function makeResponse(name, description, manager) {
    const response = manager.make(name);
    manager.add(response);

    response.description = description;
    makeMediaType('Response', response.MediaTypeManager);
}

function makeMediaType(schema, manager) {
    const json = manager.make('application/json');
    manager.add(json);

    json.schema.type = 'reference';
    json.schema.reference.name = schema;
}
