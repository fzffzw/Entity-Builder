export const FileType = {
    Controller: 'Controller',
    ControllerAPI: 'ControllerAPI',
    Factory: 'Factory',
    Migration: 'Migration',
    Model: 'Model',
    Policy: 'Policy',
    Request: 'Request',
    Resource: 'Resource',
    Seeder: 'Seeder',
    TestAPI: 'TestAPI',

    React: 'React',
    Vue: 'Vue',
}

export default function run(project) {
    addFileType(project.FileTypeManager)
}

function addFileType(manager) {
    const controller = manager.make(FileType.Controller)
    controller.original = true
    controller.path = 'app/Http/Controllers'
    controller.NameSpace = 'Http\\Controllers'
    controller.templateName = FileType.Controller.toLowerCase()
    controller.suffix = 'Controller'
    manager.add(controller)

    const controllerAPI = manager.make(FileType.ControllerAPI)
    controllerAPI.original = true
    controllerAPI.path = 'app/Http/Controllers/API'
    controllerAPI.NameSpace = 'Http\\Controllers\\API'
    controllerAPI.templateName = FileType.ControllerAPI.toLowerCase()
    controllerAPI.suffix = 'Controller'
    manager.add(controllerAPI)

    const factory = manager.make(FileType.Factory)
    factory.original = true
    factory.path = 'database/factories'
    factory.templateName = FileType.Factory.toLowerCase()
    factory.suffix = 'Factory'
    manager.add(factory)

    const migration = manager.make(FileType.Migration)
    migration.original = true
    migration.path = 'database/migrations'
    migration.templateName = FileType.Migration.toLowerCase()
    migration.prefix = 'Create'
    migration.suffix = 'Table'
    migration.file.prefix = '0000_00_00_000000'
    migration.file.isSnakeCase = true
    manager.add(migration)

    const model = manager.make(FileType.Model)
    model.original = true
    model.path = 'app/Models'
    model.NameSpace = 'Models'
    model.templateName = FileType.Model.toLowerCase()
    manager.add(model)

    const policy = manager.make(FileType.Policy)
    policy.original = true
    policy.path = 'app/Policies'
    policy.NameSpace = 'Policies'
    policy.templateName = FileType.Policy.toLowerCase()
    policy.suffix = 'Policy'
    manager.add(policy)

    const request = manager.make(FileType.Request)
    request.original = true
    request.path = 'app/Http/Requests'
    request.NameSpace = 'Http\\Requests'
    request.templateName = FileType.Request.toLowerCase()
    request.prefix = 'Store'
    request.suffix = 'Request'
    manager.add(request)

    const resource = manager.make(FileType.Resource)
    resource.original = true
    resource.path = 'app/Http/Resources'
    resource.NameSpace = 'Http\\Resources'
    resource.templateName = FileType.Resource.toLowerCase()
    resource.suffix = 'Resource'
    manager.add(resource)

    const seeder = manager.make(FileType.Seeder)
    seeder.original = true
    seeder.path = 'database/seeds'
    seeder.templateName = FileType.Seeder.toLowerCase()
    seeder.suffix = 'TableSeeder'
    manager.add(seeder)

    const test = manager.make(FileType.TestAPI)
    test.original = true
    test.path = 'tests/Feature/API'
    test.NameSpace = 'Tests\\Feature\\API'
    test.templateName = FileType.TestAPI.toLowerCase()
    test.suffix = 'Test'
    manager.add(test)

    const react = manager.make(FileType.React)
    react.original = true
    react.path = 'resources/views'
    react.templateName = FileType.React.toLowerCase()
    react.suffix = 'Form'
    manager.add(react)

    const vue = manager.make(FileType.Vue)
    vue.original = true
    vue.path = 'resources/views'
    vue.templateName = FileType.Vue.toLowerCase()
    vue.suffix = 'Form'
    manager.add(vue)
}
