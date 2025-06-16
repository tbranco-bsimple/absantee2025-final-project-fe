import { TestBed } from '@angular/core/testing';
import { HolidayPeriodDetailsResolver } from './holiday-period-details.resolver';
import { CollaboratorApiService } from '../../collaborators/collaborator-api.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { HolidayPeriod } from '../holiday-period';
import { of } from 'rxjs';

describe('HolidayPeriodDetailsResolver', () => {
    let resolver: HolidayPeriodDetailsResolver;
    let mockCollaboratorApiService: jasmine.SpyObj<CollaboratorApiService>;

    const mockHoliday: HolidayPeriod = {
        id: '1',
        periodDate: {
            initDate: '2025-08-01',
            finalDate: '2025-08-15'
        }
    };

    beforeEach(() => {
        mockCollaboratorApiService = jasmine.createSpyObj('CollaboratorApiService', ['getCollaboratorHolidayById']);

        TestBed.configureTestingModule({
            providers: [
                HolidayPeriodDetailsResolver,
                { provide: CollaboratorApiService, useValue: mockCollaboratorApiService }
            ]
        });

        resolver = TestBed.inject(HolidayPeriodDetailsResolver);
    });

    it('should be created', () => {
        expect(resolver).toBeTruthy();
    });

    it('should resolve a holiday period with correct route params', (done) => {
        const routeSnapshot = {
            paramMap: {
                get: (key: string) => key === 'holidayId' ? '1' : null
            },
            parent: {
                paramMap: {
                    get: (key: string) => key === 'id' ? '10' : null
                }
            }
        } as unknown as ActivatedRouteSnapshot;

        mockCollaboratorApiService.getCollaboratorHolidayById.and.returnValue(of(mockHoliday));

        resolver.resolve(routeSnapshot).subscribe(result => {
            expect(result).toEqual(mockHoliday);
            expect(mockCollaboratorApiService.getCollaboratorHolidayById).toHaveBeenCalledWith('10', '1');
            done();
        });
    });

    it('should resolve a holiday period with correct route params', (done) => {
        const routeSnapshot = {
            paramMap: {
                get: (key: string) => key === 'holidayId' ? '1' : null
            },
            parent: {
                paramMap: {
                    get: (key: string) => key === 'id' ? '10' : null
                }
            }
        } as unknown as ActivatedRouteSnapshot;

        mockCollaboratorApiService.getCollaboratorHolidayById.and.returnValue(of(mockHoliday));

        resolver.resolve(routeSnapshot).subscribe(result => {
            expect(result).toEqual(mockHoliday);
            expect(mockCollaboratorApiService.getCollaboratorHolidayById).toHaveBeenCalledWith('10', '1');
            done();
        });
    });

    it('should throw an error if collaborator id is missing', () => {
        const routeSnapshot = {
            paramMap: {
                get: (key: string) => key === 'holidayId' ? '1' : null
            },
            parent: {
                paramMap: {
                    get: (key: string) => null
                }
            }
        } as unknown as ActivatedRouteSnapshot;

        expect(() => resolver.resolve(routeSnapshot)).toThrowError('Collab ID is missing in route');
    });

    it('should throw an error if holidayId is missing', () => {
        const routeSnapshot = {
            paramMap: {
                get: (key: string) => null
            },
            parent: {
                paramMap: {
                    get: (key: string) => key === 'id' ? '10' : null
                }
            }
        } as unknown as ActivatedRouteSnapshot;

        expect(() => resolver.resolve(routeSnapshot)).toThrowError('HolidayPeriod ID is missing in route');
    });

    it('should throw an error if both collaborator id and holidayId are missing', () => {
        const routeSnapshot = {
            paramMap: {
                get: (key: string) => null
            },
            parent: {
                paramMap: {
                    get: (key: string) => null
                }
            }
        } as unknown as ActivatedRouteSnapshot;

        expect(() => resolver.resolve(routeSnapshot)).toThrowError('Collab ID is missing in route');
    });


});
