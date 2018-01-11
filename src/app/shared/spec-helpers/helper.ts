

import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';

export const getResponse = (data) => ({
    body: { data: data },
    status: 200
})

export const successResponse = () => ({
    status: 200
})

export const setupConnections = (backend: MockBackend, options: any) => {
    backend.connections.subscribe((connection: MockConnection) => {
        connection.mockRespond(new Response(new ResponseOptions(options)));
    });
}

export const setupConnectionsWithError = (backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError(new Error('some error'))
    });
}

export const setupConnectionsWithNoMessageError = (backend: MockBackend) => {
    backend.connections.subscribe((connection: MockConnection) => {
        connection.mockError()
    });
}

