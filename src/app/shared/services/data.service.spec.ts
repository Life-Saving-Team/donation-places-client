import { async, getTestBed, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Http, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { getResponse, setupConnections, setupConnectionsWithError } from '../../shared/spec-helpers/helper';
import { Response, ResponseOptions, ResponseType, Request } from '@angular/http';
import { MockConnection } from '@angular/http/testing';
import { DataService } from './data.service';
import { setupConnectionsWithNoMessageError } from '../spec-helpers/helper';
export const fakeDonors = [
    {
        _id: '59a940edbfb2961a5c82263c',
        firstName: 'Arvilla',
        lastName: 'Jacobi',
        email: 'Antoinette78@yahoo.com',
        telephone: '362-936-7361 x9143',
        bloodGroup: 'O',
        location:
        {
            type: 'Point',
            _id: '59a940edbfb2961a5c82263d',
            coordinates: [140.3284, -8.2974]
        },
        ip: '199.70.222.102',
        __v: 0
    },

    {
        _id: '59a94219be9707282cb9fd2e',
        firstName: 'Devon',
        lastName: 'King',
        email: 'Cleora.Keebler@hotmail.com',
        telephone: '833-236-9831 x570',
        bloodGroup: 'O',
        location:
        {
            type: 'Point',
            _id: '59a94219be9707282cb9fd2f',
            coordinates: [111.785, -0.3458]
        },
        ip: '243.48.84.158',
        __v: 0
    },

    {
        _id: '59a940ea01d0ad21ccc7d440',
        firstName: 'Chadrick',
        lastName: 'Gutmann',
        email: 'Desiree_Aufderhar59@hotmail.com',
        telephone: '(017) 442-4699 x946',
        bloodGroup: 'O',
        location:
        {
            type: 'Point',
            _id: '59a940ea01d0ad21ccc7d441',
            coordinates: [84.6453, -40.1547]
        },
        ip: '108.178.126.215',
        __v: 0
    },

    {
        _id: '59a942455a5cb02048b8d8fa',
        firstName: 'Ola',
        lastName: 'Murazik',
        email: 'Chaya.Lubowitz@yahoo.com',
        telephone: '1-366-170-1541',
        bloodGroup: 'O',
        location:
        {
            type: 'Point',
            _id: '59a942455a5cb02048b8d8fb',
            coordinates: [111.8305, -29.6411]
        },
        ip: '91.49.201.28',
        __v: 0
    }
]
describe('Service: DataService', () => {
    let backend: MockBackend;
    let service: DataService;
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BaseRequestOptions,
                MockBackend,
                DataService,
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                },
                {
                    deps: [
                        MockBackend,
                        BaseRequestOptions
                    ],
                    provide: Http,
                    useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    }
                },
            ]
        });
        const testbed = getTestBed();
        backend = testbed.get(MockBackend);
        service = testbed.get(DataService);
    });



  
    it('should get donor info successfully from backend', (done) => {
        setupConnections(backend, {
            body: fakeDonors[0],
            status: 200
        });
        service.getDonorInfo(fakeDonors[0]._id).subscribe((payload) => {
            expect(payload).toBeTruthy();
            expect(payload._id).toBe(fakeDonors[0]._id)
            expect(payload.firstName).toBe(fakeDonors[0].firstName)
            expect(payload.lastName).toBe(fakeDonors[0].lastName)
            expect(payload.email).toBe(fakeDonors[0].email)
            expect(payload.telephone).toBe(fakeDonors[0].telephone)
            expect(payload.bloodGroup).toBe(fakeDonors[0].bloodGroup)
            expect(payload.ip).toBe(fakeDonors[0].ip)
            done()
        });
    });

    it('should respond to error while getting donor', (done) => {
        setupConnectionsWithError(backend);
        service.getDonorInfo(fakeDonors[0]._id).subscribe(
            payload => {},
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });

    it('should update donor info successfully to backend', (done) => {
        setupConnections(backend, {
            body: { data: fakeDonors[1] },
            status: 200
        });
        service.updateDonor(fakeDonors[1]._id, fakeDonors[0]).subscribe(
            payload => {
                expect(payload).toBeTruthy()
                done()
            }
        );
    });

    it('should respond to error while updating donor', (done) => {
        setupConnectionsWithError(backend);
        service.updateDonor(fakeDonors[1]._id, fakeDonors[1]).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });

    it('should delete donor info successfully from backend', (done) => {
        setupConnections(backend, {
            body: { data: "OK" },
            status: 200
        });
        service.deleteDonor(fakeDonors[0]._id).subscribe(
            payload => {
                expect(payload).toBeTruthy()
                done()
            }
        );
    });

    it('should respond to error while adding donor', (done) => {
        setupConnectionsWithError(backend);
        service.deleteDonor(fakeDonors[0]._id).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });

    it('should respond to error without message while deleting donor', (done) => {
        setupConnectionsWithNoMessageError(backend);
        service.deleteDonor(fakeDonors[0]._id).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });
    

    it('should add donor successfully to backend', (done) => {
        setupConnections(backend, {
            body: fakeDonors[0],
            status: 200
        });
        service.addDonor(fakeDonors[0]).subscribe(
            payload => {
                expect(payload).toBeTruthy()
                expect(payload._id).toBe(fakeDonors[0]._id)
                expect(payload.firstName).toBe(fakeDonors[0].firstName)
                expect(payload.lastName).toBe(fakeDonors[0].lastName)
                expect(payload.email).toBe(fakeDonors[0].email)
                expect(payload.telephone).toBe(fakeDonors[0].telephone)
                expect(payload.bloodGroup).toBe(fakeDonors[0].bloodGroup)
                expect(payload.ip).toBe(fakeDonors[0].ip)
                done()
            }
        );
    });

    it('should respond to error while adding donor', (done) => {
        setupConnectionsWithError(backend);
        service.addDonor(fakeDonors[0]).subscribe(
            payload => {
            },
            error => {
                expect(error).toBeTruthy()
                done()
            });
    });



});