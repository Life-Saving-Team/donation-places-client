import { SnackBarService } from '../shared/services/snackbar.service';
import { SharedModule } from '../shared/shared.module';
import { PostingComponent } from './posting.component';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostingModule } from './posting.module';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { DataService } from '../shared/services/data.service';
import 'rxjs/add/observable/of'
import 'rxjs/add/observable/throw'
export const fakeDonors = [
    {
        _id: '59a940edbfb2961a5c82263c',
        firstName: 'Arvilla',
        lastName: 'Jacobi',
        email: 'Antoinette78@yahoo.com',
        telephone: '362-936-7361 x9143',
        bloodGroup: 'O',
        longitude: 30,
        latitude: 60,
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
        longitude: 84,
        latitude: 30,
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
        longitude: 40,
        latitude: 41,
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
        longitude: 50,
        latitude: 20,
        ip: '91.49.201.28',
        __v: 0
    }
]
describe('Posting Component', () => {

    let comp: PostingComponent;
    let fixture: ComponentFixture<PostingComponent>;
    let de: DebugElement;
    let el: HTMLElement;
    let sb: SnackBarService
    let userService: UserService


    let dataServiceStub = {
        getDonorInfo(id) {
            return Observable.of(fakeDonors[0])
        }
    }
    let activatedRouteStub = {
        snapshot: {
            url: [{ path: '32' }]
        }
    }
    let dataService: DataService
    let activatedRoute
    let SnackBarServiceStub = {
        emitSuccessSnackBar(message) {

        }
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, PostingModule, SharedModule],
            declarations: [],
            providers: [
                { provide: ActivatedRoute, useValue: activatedRouteStub },
                { provide: UserService, useValue: {} },
                // DataService,
                { provide: DataService, useValue: dataServiceStub },
                { provide: SnackBarService, useValue: SnackBarServiceStub },
            ],
        });
        fixture = TestBed.createComponent(PostingComponent);
        comp = fixture.componentInstance;

        dataService = fixture.debugElement.injector.get(DataService);
        userService = fixture.debugElement.injector.get(UserService);
        activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
        sb = fixture.debugElement.injector.get(SnackBarService);
    });

    describe('Loading Data initially', () => {
        describe('Secneario: id is located in url', () => {
            it("should load if id is located in url", () => {
                expect(comp).toBeTruthy()
            })

            it("should have isEdit property as true", () => {
                expect(comp.isEdit).toBe(true)
            })
            describe('Secneario: data service responeded successfully ', () => {
                it("should save user id in User Service", () => {
                    expect(userService.userId).toEqual('32')
                })
                describe('User Service user data', () => {
                    it("should save user firstName in User Service", () => {
                        expect(userService.userData.firstName).toEqual(fakeDonors[0].firstName)
                    })
                    it("should save user lastName in User Service", () => {
                        expect(userService.userData.lastName).toEqual(fakeDonors[0].lastName)
                    })
                    it("should save user email in User Service", () => {
                        expect(userService.userData.email).toEqual(fakeDonors[0].email)
                    })
                    it("should save user phone number in User Service", () => {
                        expect(userService.userData.telephone).toEqual(fakeDonors[0].telephone)
                    })
                    it("should save user ip in User Service", () => {
                        expect(userService.userData.ip).toEqual(fakeDonors[0].ip)
                    })
                    it("should save user bloodGroup in User Service", () => {
                        expect(userService.userData.bloodGroup).toEqual(fakeDonors[0].bloodGroup)
                    })
                    it("should save user longitude in User Service", () => {
                        expect(userService.userData.longitude).toEqual(fakeDonors[0].longitude)
                    })
                    it("should save user latitude in User Service", () => {
                        expect(userService.userData.latitude).toEqual(fakeDonors[0].latitude)
                    })
                })


                describe('form user data', () => {
                    it("should save user firstName in form", () => {
                        expect(comp.form.value.firstName).toEqual(fakeDonors[0].firstName)
                    })
                    it("should save user lastName in form", () => {
                        expect(comp.form.value.lastName).toEqual(fakeDonors[0].lastName)
                    })
                    it("should save user email in form", () => {
                        expect(comp.form.value.email).toEqual(fakeDonors[0].email)
                    })
                    it("should save user phone number in form", () => {
                        expect(comp.form.value.telephone).toEqual(fakeDonors[0].telephone)
                    })
                    it("should save user bloodGroup in form", () => {
                        expect(comp.form.value.bloodGroup).toEqual(fakeDonors[0].bloodGroup)
                    })
                    it("should save user longitude in form", () => {
                        expect(comp.form.value.longitude).toEqual(fakeDonors[0].longitude)
                    })
                    it("should save user latitude in form", () => {
                        expect(comp.form.value.latitude).toEqual(fakeDonors[0].latitude)
                    })
                })

            })
        })

        // describe('Secneario: id is not located in url but already saved in User Service', () => {
        //     beforeAll(() => {
        //         userService.userId = '565656565'
        //         userService.userData = fakeDonors[2]
        //     })
        //     it("should load", () => {
        //         expect(comp).toBeTruthy()
        //     })

        //     it("should have isEdit property as true", () => {
        //         expect(comp.isEdit).toBe(true)
        //     })
        //     describe('form user data', () => {
        //         it("should save user firstName in form", () => {
        //             expect(comp.form.value.firstName).toEqual(fakeDonors[2].firstName)
        //         })
        //         it("should save user lastName in form", () => {
        //             expect(comp.form.value.lastName).toEqual(fakeDonors[2].lastName)
        //         })
        //         it("should save user email in form", () => {
        //             expect(comp.form.value.email).toEqual(fakeDonors[2].email)
        //         })
        //         it("should save user phone number in form", () => {
        //             expect(comp.form.value.telephone).toEqual(fakeDonors[2].telephone)
        //         })
        //         it("should save user bloodGroup in form", () => {
        //             expect(comp.form.value.bloodGroup).toEqual(fakeDonors[2].bloodGroup)
        //         })
        //         it("should save user longitude in form", () => {
        //             expect(userService.userData.longitude).toEqual(fakeDonors[2].longitude)
        //         })
        //         it("should save user latitude in form", () => {
        //             expect(userService.userData.latitude).toEqual(fakeDonors[2].latitude)
        //         })
        //     })
        // })



    })



    describe('Deleting Donor', () => {

        it("should perform action if id is available", () => {
            userService.clearData = () => {
                userService.userId = null
                userService.userData = null
            }
            dataService.deleteDonor = (userServiceId) => Observable.of("ok")
            userService.userId = 1
            comp.onRemove()
            expect(userService.userId).toBeFalsy()
        })


        it("should respond to error from data service", () => {
            userService.clearData = () => {
                userService.userId = null
                userService.userData = null
            }
            dataService.deleteDonor = (userServiceId) => Observable.throw("Error")
            userService.userId = 1
            comp.onRemove()
            expect(userService.userId).toBe(1)
        })



    })



    describe('Submitting Form', () => {
        describe("Scenario: posting new", () => {
            beforeEach(() => {
                userService.userId = '123'
            })
            describe('Scenario: Success', () => {
                beforeEach(() => {
                    dataService.updateDonor = (userServiceId, data) => Observable.of(fakeDonors[0])
                    dataService.addDonor = (data) => Observable.of(fakeDonors[0])
                    comp.onSubmit(fakeDonors[0])
                })
                it("should successfully post", () => {
                    expect(comp).toBeTruthy()
                })
            })


            describe('Scenario: Error', () => {
                beforeEach(() => {
                    dataService.updateDonor = (userServiceId, data) => Observable.throw('Error')
                    dataService.addDonor = (data) => Observable.throw('Error')
                    comp.onSubmit(fakeDonors[0])
                })
                it("should respond to error", () => {
                    expect(comp).toBeTruthy()
                })
            })
        })

        describe("Scenario: updaing existing", () => {
            beforeEach(() => {
                userService.userId = null
            })
            describe('Scenario: Success', () => {
                beforeEach(() => {
                    dataService.updateDonor = (userServiceId, data) => Observable.of(fakeDonors[0])
                    dataService.addDonor = (data) => Observable.of(fakeDonors[0])
                    comp.onSubmit(fakeDonors[0])
                })
                it("should successfully post", () => {
                    expect(comp).toBeTruthy()
                })
            })


            describe('Scenario: Error', () => {
                beforeEach(() => {
                    dataService.updateDonor = (userServiceId, data) => Observable.throw('Error')
                    dataService.addDonor = (data) => Observable.throw('Error')
                    comp.onSubmit(fakeDonors[0])
                })
                it("should respond to error", () => {
                    expect(comp).toBeTruthy()
                })
            })
        })





    })





    // describe('Secneario: data service responeded with an error ', () => {
    //     it("should respond to error by emiting alert", () => {
    //         sb.emitErrorSnackBar = () => {}
    //         expect(userService.userId).toBeFalsy()
    //     })

    //     it("should not save user id in User Service", () => {
    //         expect(userService.userId).toBeFalsy()
    //     })

    //     it("should not save user data in User Service", () => {
    //         expect(userService.userData).toBeFalsy()
    //     })


    //     it("should get navigated to another route", () => {
    //         // expect(window.URL).
    //     })

    // })




})
