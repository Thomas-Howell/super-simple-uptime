/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UptimeControler } from './controllers/uptime.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MonitorController } from './controllers/monitor.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AlertsController } from './controllers/alerts.js';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "MonitorDto": {
        "dataType": "refObject",
        "properties": {
            "domain": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Express.Multer.File": {
        "dataType": "refObject",
        "properties": {
            "fieldname": {"dataType":"string","required":true},
            "originalname": {"dataType":"string","required":true},
            "encoding": {"dataType":"string","required":true},
            "mimetype": {"dataType":"string","required":true},
            "size": {"dataType":"double","required":true},
            "stream": {"dataType":"buffer","required":true},
            "destination": {"dataType":"string","required":true},
            "filename": {"dataType":"string","required":true},
            "path": {"dataType":"string","required":true},
            "buffer": {"dataType":"buffer","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AlertDtoTypeType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["EMAIL"]},{"dataType":"enum","enums":["SMS"]},{"dataType":"enum","enums":["WEBHOOK"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AlertDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "domain": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "type": {"ref":"AlertDtoTypeType","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUptimeControler_getRawUptime: Record<string, TsoaRoute.ParameterSchema> = {
                domain: {"in":"path","name":"domain","required":true,"dataType":"string"},
        };
        app.get('/uptime/:domain/raw',
            ...(fetchMiddlewares<RequestHandler>(UptimeControler)),
            ...(fetchMiddlewares<RequestHandler>(UptimeControler.prototype.getRawUptime)),

            async function UptimeControler_getRawUptime(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUptimeControler_getRawUptime, request, response });

                const controller = new UptimeControler();

              await templateService.apiHandler({
                methodName: 'getRawUptime',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUptimeControler_getUptime: Record<string, TsoaRoute.ParameterSchema> = {
                domain: {"in":"path","name":"domain","required":true,"dataType":"string"},
        };
        app.get('/uptime/:domain',
            ...(fetchMiddlewares<RequestHandler>(UptimeControler)),
            ...(fetchMiddlewares<RequestHandler>(UptimeControler.prototype.getUptime)),

            async function UptimeControler_getUptime(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUptimeControler_getUptime, request, response });

                const controller = new UptimeControler();

              await templateService.apiHandler({
                methodName: 'getUptime',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUptimeControler_deleteUptime: Record<string, TsoaRoute.ParameterSchema> = {
                domain: {"in":"path","name":"domain","required":true,"dataType":"string"},
        };
        app.delete('/uptime/:domain',
            ...(fetchMiddlewares<RequestHandler>(UptimeControler)),
            ...(fetchMiddlewares<RequestHandler>(UptimeControler.prototype.deleteUptime)),

            async function UptimeControler_deleteUptime(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUptimeControler_deleteUptime, request, response });

                const controller = new UptimeControler();

              await templateService.apiHandler({
                methodName: 'deleteUptime',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMonitorController_getAllMonitors: Record<string, TsoaRoute.ParameterSchema> = {
                domain: {"in":"path","name":"domain","required":true,"dataType":"string"},
        };
        app.get('/monitors/:domain',
            ...(fetchMiddlewares<RequestHandler>(MonitorController)),
            ...(fetchMiddlewares<RequestHandler>(MonitorController.prototype.getAllMonitors)),

            async function MonitorController_getAllMonitors(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMonitorController_getAllMonitors, request, response });

                const controller = new MonitorController();

              await templateService.apiHandler({
                methodName: 'getAllMonitors',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMonitorController_createMonitor: Record<string, TsoaRoute.ParameterSchema> = {
                monitor: {"in":"body","name":"monitor","required":true,"ref":"MonitorDto"},
        };
        app.post('/monitors',
            ...(fetchMiddlewares<RequestHandler>(MonitorController)),
            ...(fetchMiddlewares<RequestHandler>(MonitorController.prototype.createMonitor)),

            async function MonitorController_createMonitor(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMonitorController_createMonitor, request, response });

                const controller = new MonitorController();

              await templateService.apiHandler({
                methodName: 'createMonitor',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMonitorController_importMonitors: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"any"},
        };
        app.post('/monitors/import',
            ...(fetchMiddlewares<RequestHandler>(MonitorController)),
            ...(fetchMiddlewares<RequestHandler>(MonitorController.prototype.importMonitors)),

            async function MonitorController_importMonitors(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMonitorController_importMonitors, request, response });

                const controller = new MonitorController();

              await templateService.apiHandler({
                methodName: 'importMonitors',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMonitorController_importMonitorsFromFile: Record<string, TsoaRoute.ParameterSchema> = {
                file: {"in":"body","name":"file","required":true,"ref":"Express.Multer.File"},
        };
        app.post('/monitors/import/file',
            ...(fetchMiddlewares<RequestHandler>(MonitorController)),
            ...(fetchMiddlewares<RequestHandler>(MonitorController.prototype.importMonitorsFromFile)),

            async function MonitorController_importMonitorsFromFile(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMonitorController_importMonitorsFromFile, request, response });

                const controller = new MonitorController();

              await templateService.apiHandler({
                methodName: 'importMonitorsFromFile',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMonitorController_updateMonitor: Record<string, TsoaRoute.ParameterSchema> = {
                domain: {"in":"path","name":"domain","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"domain":{"dataType":"string","required":true}}},
        };
        app.patch('/monitors/:domain',
            ...(fetchMiddlewares<RequestHandler>(MonitorController)),
            ...(fetchMiddlewares<RequestHandler>(MonitorController.prototype.updateMonitor)),

            async function MonitorController_updateMonitor(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMonitorController_updateMonitor, request, response });

                const controller = new MonitorController();

              await templateService.apiHandler({
                methodName: 'updateMonitor',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMonitorController_deleteMonitor: Record<string, TsoaRoute.ParameterSchema> = {
                domain: {"in":"path","name":"domain","required":true,"dataType":"string"},
        };
        app.delete('/monitors/:domain',
            ...(fetchMiddlewares<RequestHandler>(MonitorController)),
            ...(fetchMiddlewares<RequestHandler>(MonitorController.prototype.deleteMonitor)),

            async function MonitorController_deleteMonitor(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMonitorController_deleteMonitor, request, response });

                const controller = new MonitorController();

              await templateService.apiHandler({
                methodName: 'deleteMonitor',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAlertsController_create: Record<string, TsoaRoute.ParameterSchema> = {
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"target":{"dataType":"string","required":true},"type":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["EMAIL"]},{"dataType":"enum","enums":["SMS"]},{"dataType":"enum","enums":["WEBHOOK"]}],"required":true},"domain":{"dataType":"string","required":true}}},
                res: {"in":"res","name":"201","required":true,"dataType":"void"},
        };
        app.post('/alerts',
            ...(fetchMiddlewares<RequestHandler>(AlertsController)),
            ...(fetchMiddlewares<RequestHandler>(AlertsController.prototype.create)),

            async function AlertsController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAlertsController_create, request, response });

                const controller = new AlertsController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAlertsController_getByDomain: Record<string, TsoaRoute.ParameterSchema> = {
                domain: {"in":"path","name":"domain","required":true,"dataType":"string"},
        };
        app.get('/alerts/:domain',
            ...(fetchMiddlewares<RequestHandler>(AlertsController)),
            ...(fetchMiddlewares<RequestHandler>(AlertsController.prototype.getByDomain)),

            async function AlertsController_getByDomain(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAlertsController_getByDomain, request, response });

                const controller = new AlertsController();

              await templateService.apiHandler({
                methodName: 'getByDomain',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAlertsController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/alerts/id/:id',
            ...(fetchMiddlewares<RequestHandler>(AlertsController)),
            ...(fetchMiddlewares<RequestHandler>(AlertsController.prototype.getById)),

            async function AlertsController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAlertsController_getById, request, response });

                const controller = new AlertsController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAlertsController_update: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                body: {"in":"body","name":"body","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"target":{"dataType":"string","required":true},"domain":{"dataType":"string"},"type":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["EMAIL"]},{"dataType":"enum","enums":["SMS"]},{"dataType":"enum","enums":["WEBHOOK"]}]}}},
        };
        app.patch('/alerts/:id',
            ...(fetchMiddlewares<RequestHandler>(AlertsController)),
            ...(fetchMiddlewares<RequestHandler>(AlertsController.prototype.update)),

            async function AlertsController_update(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAlertsController_update, request, response });

                const controller = new AlertsController();

              await templateService.apiHandler({
                methodName: 'update',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAlertsController_delete: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                res: {"in":"res","name":"204","required":true,"dataType":"void"},
        };
        app.delete('/alerts/:id',
            ...(fetchMiddlewares<RequestHandler>(AlertsController)),
            ...(fetchMiddlewares<RequestHandler>(AlertsController.prototype.delete)),

            async function AlertsController_delete(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAlertsController_delete, request, response });

                const controller = new AlertsController();

              await templateService.apiHandler({
                methodName: 'delete',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
